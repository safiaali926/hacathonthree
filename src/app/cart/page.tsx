// import Cart from "@/components/shoppingcart"


// export default function Shoppingcart() {
//     return (
//       <>
//       <Cart/>
//       </>)}

import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/components/shoppingcart"), { ssr: false });

export default function Page() {
  return <Cart />;
}
