"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@sanity/client";

// Define the shape of the data we're fetching
interface Product {
  _id: string;
  title: string;
  price: string;
  image: string;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2021-08-31",
});

const TrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]); // State type is Product[]
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch the last 4 products sorted by the most recent date
        const query = `*[_type == "product"] | order(_createdAt desc)[0..3] { 
          _id, 
          title, 
          price, 
          "image": image.asset->url 
        }`;

        const data: Product[] = await client.fetch(query);
        console.log("Fetched products:", data); // Log the fetched data for debugging

        setProducts(data);
      } catch (err) {
        setError("Error fetching trending products from Sanity");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="text-[#151875] text-3xl font-bold text-center mb-8">
        Trending Products
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <Link key={product._id} href={`/product/${product._id}`}>
            <div className="bg-white shadow-lg p-4 w-full sm:w-[280px] md:w-[300px] h-[450px] cursor-pointer hover:shadow-xl transition-all duration-300">
              {/* Product Image */}
              <div className="relative w-full h-80 bg-gray-200 overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={`Image of ${product.title}`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-[16px] font-semibold text-[#151875] mb-2">
                  {product.title}
                </h3>
                <p className="text-[#151875] font-bold">
                  {product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
