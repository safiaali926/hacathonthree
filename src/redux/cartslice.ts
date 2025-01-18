// // "use client"
// // import {createSlice, PayloadAction} from "@reduxjs/toolkit"

// // interface CartItem {
// //     _id:number,
// //     title:string,
// //     price:number,
// //     image:string

// // }


// // const cartSlice = createSlice({
// //     name: "Cart",
// //     initialState: [] as CartItem[],
// //     reducers: {
// //       add(state, action: PayloadAction<CartItem>) {
// //         state.push(action.payload);
// //       },
// //       remove(state, action: PayloadAction<number>) {
// //         return state.filter((item) => item._id !== action.payload);
// //       },
// //     },
// //   });
  
// //   export const { add, remove } = cartSlice.actions;
// //   export default cartSlice.reducer;

// "use client";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   _id: number;
//   title: string;
//   price: number;
//   image: string;
//   quantity: number; // Add quantity to CartItem
// }

// const cartSlice = createSlice({
//   name: "Cart",
//   initialState: [] as CartItem[],
//   reducers: {
//     add(state, action: PayloadAction<CartItem>) {
//       const existingItem = state.find(item => item._id === action.payload._id);
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity; // Increment quantity if item exists
//       } else {
//         state.push(action.payload); // Add new item if it doesn't exist
//       }
//     },
//     remove(state, action: PayloadAction<number>) {
//       return state.filter((item) => item._id !== action.payload); // Remove item by ID
//     },
//     addQuantity(state, action: PayloadAction<number>) {
//       const item = state.find((item) => item._id === action.payload);
//       if (item) {
//         item.quantity += 1; // Increment quantity by 1
//       }
//     },
//     removeQuantity(state, action: PayloadAction<number>) {
//       const item = state.find((item) => item._id === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1; // Decrement quantity if greater than 1
//       }
//     },
//   },
// });

// export const { add, remove, addQuantity, removeQuantity } = cartSlice.actions;
// export default cartSlice.reducer;
