"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@sanity/client";

// Define the product structure
interface Product {
  _id: string;
  title: string;
  price: string;
  image: string;
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "your_dataset",
  useCdn: true,
  apiVersion: "2021-08-31",
});

const CircleItems = () => {
  const [categories, setCategories] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `*[_type == "product" && id in ["15", "5", "35", "13"]]{ 
          _id, 
          title, 
          price, 
          "image": image.asset->url 
        }`;
        const data: Product[] = await client.fetch(query);
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="m-9">
      {/* Featured Products Title */}
      <div className="text-[#151875] text-3xl font-bold text-center mb-8">
        Top Categories
      </div>

      {/* Circle Items Grid */}
      <div className="flex justify-center items-center m-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9">
          {categories.map((category) => (
            <div key={category._id} className="relative group">
              <div
                className="w-48 h-48 rounded-full bg-gray-100 border-l-4 border-b-4 border-transparent group-hover:border-[#9877E7] shadow-md group-hover:shadow-2xl transition-all duration-300"
                style={{
                  backgroundImage: `url('${category.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={`/product/${category._id}`} // Link to the dynamic product page
                    className="px-3 py-1 bg-green-500 text-white rounded-sm hover:bg-green-600"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[20px] text-[#151875]">{category.title}</h3>
                <p className="text-[#151875] mb-4">${category.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircleItems;
