"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@sanity/client";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";

// Sanity Client Configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2021-08-31",
});

// Define Product Type
interface Product {
  _id: string;
  title: string;
  code: string;
  price: string;
  image: string;
}

function ProductDisplay() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] | order(_createdAt desc) [18..21] {
          _id,
          title,
          "code": productCode,
          price,
          "image": image.asset->url
        }`;

        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-9">
      {/* Featured Products Title */}
      <div className="text-[#151875] text-3xl font-bold text-center mb-8">
        Featured Products
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {products.map((product) => (
          <div
            key={product._id}
            className="group relative bg-white overflow-hidden shadow-md hover:bg-gray-100 transition-all"
          >
            {/* Product Image */}
            <div className="relative w-full h-80">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
              {/* Icons */}
              <div className="absolute top-2 left-2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  aria-label="Add to Wishlist"
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Heart className="w-6 h-6 text-sky-500" />
                </button>
                <Link
                    href={`/product/${product._id}`}><button
                  aria-label="Add to Cart"
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <ShoppingCart className="w-6 h-6 text-blue-800" />
                </button></Link>
                <button
                  aria-label="Zoom In"
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <ZoomIn className="w-6 h-6 text-sky-500" />
                </button>
              </div>
              {/* View Details */}
              <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all">
                <div className="bg-green-500 text-white p-2 rounded-sm text-center">
                  <Link
                    href={`/product/${product._id}`}
                    className="text-sm font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 group-hover:bg-blue-800 group-hover:text-white transition-all flex flex-col items-center">
              <h3 className="text-lg font-semibold text-pink-500 group-hover:text-white text-center">
                {product.title}
              </h3>

              {/* Decorative Lines */}
              <div className="flex space-x-2 my-3">
                <div className="w-5 h-1 bg-red-500 rounded-lg"></div>
                <div className="w-5 h-1 bg-blue-500 rounded-lg hover:bg-yellow-500 transition-all"></div>
                <div className="w-5 h-1 bg-green-500 rounded-lg"></div>
              </div>

              <p className="text-sm text-gray-600 group-hover:text-white text-center">
                {product.code}
                <br />
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDisplay;
