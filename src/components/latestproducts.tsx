"use client";

import { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";

// Sanity Client Configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "your_dataset",
  useCdn: true,
  apiVersion: "2021-08-31",
});

// Define Product Type
interface Product {
  _id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  sale: boolean;
}

const LatestProduct = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[]>([]);
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("new arrival");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const newArrivalQuery = `*[_type == "product"] | order(_createdAt desc) [30..36] {
          _id,
          title,
          price,
          originalPrice,
          "image": image.asset->url,
          sale
        }`;

        const bestSellerQuery = `*[_type == "product" ] | order(salesCount desc) [0..5] {
          _id,
          title,
          price,
          originalPrice,
          "image": image.asset->url,
          sale
        }`;

        const featuredQuery = `*[_type == "product" ] | order(_createdAt desc) [26..31] {
          _id,
          title,
          price,
          originalPrice,
          "image": image.asset->url,
          sale
        }`;

        const onSaleQuery = `*[_type == "product" && sale == true] | order(_createdAt desc) [0..5] {
          _id,
          title,
          price,
          originalPrice,
          "image": image.asset->url,
          sale
        }`;

        const [newArrivalData, bestSellerData, featuredData, onSaleData] = await Promise.all([
          client.fetch(newArrivalQuery),
          client.fetch(bestSellerQuery),
          client.fetch(featuredQuery),
          client.fetch(onSaleQuery),
        ]);

        setNewArrivalProducts(newArrivalData);
        setBestSellerProducts(bestSellerData);
        setFeaturedProducts(featuredData);
        setOnSaleProducts(onSaleData);
      } catch (err) {
        setError("Error fetching products.");
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
      <div className="text-[#151875] text-3xl font-bold text-center mb-8">Latest Products</div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white flex justify-center space-x-8">
          <TabsTrigger value="new arrival" className="hover:text-pink-500 hover:underline text-[#151875]">
            New Arrival
          </TabsTrigger>
          <TabsTrigger value="best seller" className="hover:text-pink-500 hover:underline text-[#151875]">
            Best Seller
          </TabsTrigger>
          <TabsTrigger value="featured" className="hover:text-pink-500 hover:underline text-[#151875]">
            Featured
          </TabsTrigger>
          <TabsTrigger value="on sale" className="hover:text-pink-500 hover:underline text-[#151875]">
            On Sale
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new arrival">
          <ProductGrid products={newArrivalProducts} />
        </TabsContent>
        <TabsContent value="best seller">
          <ProductGrid products={bestSellerProducts} />
        </TabsContent>
        <TabsContent value="featured">
          <ProductGrid products={featuredProducts} />
        </TabsContent>
        <TabsContent value="on sale">
          <ProductGrid products={onSaleProducts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-9">
    {products.map((product) => (
      <div key={product._id} className="relative group">
        {/* Image Container */}
        <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="contain"
            className="transition-transform transform group-hover:scale-105"
          />
          {product.sale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-sm">
              Sale
            </div>

          )}
           <div className="absolute bottom-2 left-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <Heart className="w-5 h-5 text-sky-500" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
  <Link href={`/product/${product._id}`}>
    <ShoppingCart className="w-5 h-5 text-blue-800" />
  </Link>
</button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <ZoomIn className="w-5 h-5 text-sky-500" />
                    </button>
                  </div>
        </div>

        {/* Product Details */}
        <div className="mt-4">
          <Link href={`/product/${product._id}`} className="text-[#151875] font-semibold">
            {product.title}
          </Link>
          <div className="text-sm text-gray-600">
            {product.price}
            {product.originalPrice && (
              <span className="line-through text-red-500 pl-2">{product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default LatestProduct;
