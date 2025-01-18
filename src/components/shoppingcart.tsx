"use client";

// import React, { useState } from "react";
// import { CircleCheckBig } from "lucide-react";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([
//     { id: 1, name: "Ut diam consequat", price: 50.0, quantity: 1 },
//     { id: 2, name: "Ut diam consequat", price: 75.0, quantity: 1 },
//   ]);

//   const handleAdd = (id: number) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const handleRemove = (id: number) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const handleDelete = (id: number) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <header className="bg-white">
//         <div className="w-full py-9 bg-[#F6F5FF]">
//           <div className="mx-auto container px-4">
//             <h1 className="text-2xl font-bold text-[#1D3178]">Shopping Cart</h1>
//             <nav className="text-sm text-gray-600 mb-2">
//               <ol className="list-reset flex">
//                 <li>
//                   <a href="/" className="text-gray-900 hover:underline">
//                     Home . Pages .
//                   </a>
//                 </li>
//                 <li>
//                   <span className="mx-2">/</span>
//                 </li>
//                 <li className="text-pink-500 font-semibold">Shopping Cart</li>
//               </ol>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-6">
//         <div className="flex flex-col lg:flex-row lg:space-x-6">
//           {/* Left Section: Cart Items */}
//           <div className="bg-white p-6 rounded-lg w-full lg:w-2/3 mb-6 lg:mb-0">
//             <h2 className="text-lg font-semibold mb-6">Your Cart</h2>

//             <div className="grid grid-cols-2 sm:grid-cols-4 font-bold text-[#1D3178] border-b pb-2 mb-4">
//               <div>Product</div>
//               <div>Price</div>
//               <div className="hidden sm:block">Quantity</div>
//               <div>Total</div>
//             </div>

//             {/* Cart Items */}
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="grid grid-cols-2 sm:grid-cols-4 items-center border-b pb-4"
//                 >
//                   <div className="flex items-center">
//                     <div className="relative w-16 h-16">
//                       <img
//                         src="/t1.png"
//                         alt="Product"
//                         className="w-full h-full rounded-lg"
//                       />
//                       <button
//                         className="absolute top-0 right-0 bg-black rounded-full text-sm p-1 shadow-lg text-white"
//                         aria-label="Remove"
//                         onClick={() => handleDelete(item.id)}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-md font-semibold text-gray-900">
//                         {item.name}
//                       </h3>
//                       <p className="text-gray-500 text-sm">Color Brown</p>
//                       <p className="text-gray-500 text-sm">Size XL</p>
//                     </div>
//                   </div>

//                   <div className="text-[#15245E] font-medium">
//                     ${item.price.toFixed(2)}
//                   </div>

//                   <div className="flex items-center space-x-4 hidden sm:flex">
//                     <button
//                       className="text-sm px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                       onClick={() => handleRemove(item.id)}
//                     >
//                       -
//                     </button>
//                     <span className="font-medium">{item.quantity}</span>
//                     <button
//                       className="text-sm px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                       onClick={() => handleAdd(item.id)}
//                     >
//                       +
//                     </button>
//                   </div>

//                   <div className="text-[#15245E] font-medium">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-6 flex justify-between items-center">
//               <button
//                 className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
//                 onClick={() => setCartItems([])}
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>

//           {/* Right Section: Cart Total */}
//           <div className="w-full lg:w-1/3">
//             <div>
//               <h2 className="text-lg font-semibold mb-4 text-center text-[#15245E]">
//                 Cart Totals
//               </h2>
//               <div className="bg-[#F4F4FC] shadow p-6 rounded-lg">
//                 <div className="flex justify-between text-[#15245E] font-medium mb-4">
//                   <span>Subtotals:</span>
//                   <span>${calculateTotal().toFixed(2)}</span>
//                 </div>
//                 <hr className="my-4" />
//                 <div className="flex justify-between text-[#15245E] font-medium mb-4">
//                   <span>Totals:</span>
//                   <span>${calculateTotal().toFixed(2)}</span>
//                 </div>
//                 <hr className="my-4" />
//                 <div className="flex text-gray-500">
//                   <span className="text-sm text-green-500">
//                     <CircleCheckBig />
//                   </span>
//                   Shipping & taxes calculated at checkout
//                 </div>
//                 <div className="mt-6 space-y-4">
//                   <button className="w-full px-6 py-2 bg-green-500 text-white rounded-sm hover:bg-green-600">
//                     Proceed to Checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation"; // Use this for App Router in Next.js 13+
import { createClient } from "@sanity/client";
import product from "@/sanity/schemaTypes/product";

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "your_dataset",
  useCdn: true,
  apiVersion: "2021-08-31",
});

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Sync cart state with localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart)); // Load cart from localStorage
    }
  }, []);

  // Add item to cart
  const handleAdd = (id: string) => {
    const updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart (decrease quantity)
  const handleRemove = (id: string) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item completely from the cart
  const handleDelete = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate the total of cart items
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white">
        <div className="w-full py-9 bg-[#F6F5FF]">
          <div className="mx-auto container px-4">
            <h1 className="text-2xl font-bold text-[#1D3178]">Shopping Cart</h1>
            <nav className="text-sm text-gray-600 mb-2">
              <ol className="list-reset flex">
                <li>
                  <a href="/" className="text-gray-900 hover:underline">
                    Home . Pages .
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-pink-500 font-semibold">Shopping Cart</li>
              </ol>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="bg-white p-6 rounded-lg w-full lg:w-2/3 mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold mb-6">Your Cart</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 font-bold text-[#1D3178] border-b pb-2 mb-4">
              <div>Product</div>
              <div>Price</div>
              <div className="hidden sm:block">Quantity</div>
              <div>Total</div>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="grid grid-cols-2 sm:grid-cols-4 items-center border-b pb-4">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16">
                      <img src={item.image} alt="Product" className="w-full h-full rounded-lg" />
                      <button
                        className="absolute top-0 right-0 bg-white rounded-full p-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5 text-red-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="ml-4">{item.title}</div>
                  </div>
                  <div className="text-gray-600">${item.price}</div>
                  <div className="hidden sm:block">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-600 px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => handleAdd(item.id)}
                        className="text-gray-600 px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-600">${item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg w-full lg:w-1/3">
            <h2 className="text-lg font-semibold mb-6">Cart Summary</h2>
            <div className="flex justify-between mb-4">
              <span className="font-bold text-[#151875]">Total</span>
              <span className="text-xl">${calculateTotal()}</span>
            </div>
            <div className="mt-8">
              <button className="w-full py-3 bg-[#151875] text-white rounded-md hover:bg-pink-500">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



// "use client"
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store"; // Adjust path as needed
// import { addQuantity, removeQuantity, remove } from "@/redux/cartslice"; // Ensure proper import

// export default function Cart() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart);

//   const handleAddQuantity = (id: number) => {
//     dispatch(addQuantity(id));
//   };

//   const handleRemoveQuantity = (id: number) => {
//     dispatch(removeQuantity(id));
//   };

//   const handleRemove = (id: number) => {
//     dispatch(remove(id));
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div className="min-h-screen">
//       <main className="container mx-auto px-4 py-6">
//         <div className="flex flex-col lg:flex-row lg:space-x-6">
//           {/* Left Section: Cart Items */}
//           <div className="bg-white p-6 rounded-lg w-full lg:w-2/3 mb-6 lg:mb-0">
//             <h2 className="text-lg font-semibold mb-6">Your Cart</h2>

//             {/* Cart Items */}
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div key={item._id} className="grid grid-cols-2 sm:grid-cols-4 items-center border-b pb-4">
//                   <div className="flex items-center">
//                     <div className="relative w-16 h-16">
//                       <img
//                         src={item.image || "/default-image.png"} // Replace with actual item image
//                         alt="Product"
//                         className="w-full h-full rounded-lg"
//                       />
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-md font-semibold text-gray-900">{item.title}</h3>
//                     </div>
//                   </div>

//                   <div className="text-[#15245E] font-medium">${item.price.toFixed(2)}</div>

//                   <div className="flex items-center space-x-4  sm:flex">
//                     <button
//                       className="text-sm px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                       onClick={() => handleRemoveQuantity(item._id)}
//                     >
//                       -
//                     </button>
//                     <span className="font-medium">{item.quantity}</span>
//                     <button
//                       className="text-sm px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                       onClick={() => handleAddQuantity(item._id)}
//                     >
//                       +
//                     </button>
//                   </div>

//                   <div className="text-[#15245E] font-medium">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </div>

//                   <button
//                     className="text-red-500"
//                     onClick={() => handleRemove(item._id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Section: Cart Total */}
//           <div className="w-full lg:w-1/3">
//             <div>
//               <h2 className="text-lg font-semibold mb-4 text-center text-[#15245E]">Cart Totals</h2>
//               <div className="bg-[#F4F4FC] shadow p-6 rounded-lg">
//                 <div className="flex justify-between text-[#15245E] font-medium mb-4">
//                   <span>Subtotals:</span>
//                   <span>${calculateTotal().toFixed(2)}</span>
//                 </div>
//                 <hr className="my-4" />
//                 <div className="flex justify-between text-[#15245E] font-medium mb-4">
//                   <span>Totals:</span>
//                   <span>${calculateTotal().toFixed(2)}</span>
//                 </div>
//                 <hr className="my-4" />
//                 <div className="flex text-gray-500">
//                   <span className="text-sm text-green-500">
//                     {/* Add appropriate icon */}
//                   </span>
//                   Shipping & taxes calculated at checkout
//                 </div>
//                 <div className="mt-6 space-y-4">
//                   <button className="w-full px-6 py-2 bg-green-500 text-white rounded-sm hover:bg-green-600">
//                     Proceed to Checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
