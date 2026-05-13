// "use client";

// import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'
// import Image from 'next/image';

// import Swal from 'sweetalert2';

// import { useRouter } from 'next/navigation';



// export function CartDrawer() {
//     const { isOpen, closeDrawer, mode } = useCartDrawer();
//     const { cart, updateQty, removeItem } = useCart();

//     const router = useRouter();
//     const subtotal = cart.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//     );
//     const handleCheckout = () => {
//         // 1 Cart empty check
//         if (cart.length === 0) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Your cart is empty"
//             });
//             closeDrawer();
//             return;
//         }

    
//         closeDrawer();
//         router.push("/checkout");
//     }


//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     {/* Backdrop */}
//                     <motion.div
//                         initial={{
//                             opacity: 0,
//                         }}
//                         animate={{
//                             opacity: 1,
//                         }}
//                         exit={{
//                             opacity: 0,
//                         }}
//                         onClick={closeDrawer}
//                         className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
//                     />

//                     {/* Drawer */}
//                     <motion.div
//                         initial={{
//                             x: '100%',
//                         }}
//                         animate={{
//                             x: 0,
//                         }}
//                         exit={{
//                             x: '100%',
//                         }}
//                         transition={{
//                             type: 'spring',
//                             damping: 25,
//                             stiffness: 200,
//                         }}
//                         className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
//                     >
//                         {/*=================== Header ===================*/}
//                         <div className="flex items-center justify-between p-4 border-b border-gray-100">
//                             <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
//                                 <ShoppingBag className="h-5 w-5" />
//                                 {mode === "SHOP" ? "Shopping Cart" : "Store Pickup"}
//                             </h2>
//                             <button
//                                 onClick={closeDrawer}
//                                 className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50 cursor-pointer"
//                             >
//                                 <X className="h-6 w-6" />
//                             </button>
//                         </div>

//                         {mode === "SHOP" ? (
//                             <div className="flex flex-col h-full">
//                                 {/*================ Product List =================*/}
//                                 <div className="flex-1 overflow-y-auto p-4 space-y-6">
//                                     {cart.length === 0 ? (
//                                         <p className="text-center text-gray-500">Your cart is empty</p>
//                                     ) : (
//                                         cart.map((item) => (
//                                             <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-4">
//                                                 {/* Image */}
//                                                 <div className="flex-shrink-0 w-24 h-32 bg-gray-100 overflow-hidden">
//                                                     <Image
                                                        
//                                                         src={getImageUrl(item.image)}
//                                                         alt={item.name}
//                                                         width={96}
//                                                         height={128}
//                                                         className="object-cover w-full h-full"
//                                                         unoptimized
//                                                     />
//                                                 </div>

//                                                 {/* Details */}
//                                                 <div className="flex-1 flex flex-col">
//                                                     <div className="flex justify-between items-start mb-2">
//                                                         <div>
//                                                             <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
//                                                             <p className="text-xs text-gray-500 mt-1">SKU: {item.sku}</p>
//                                                         </div>

//                                                         <button
//                                                             onClick={() =>
//                                                                 removeItem(item.productId, item.color, item.size)
//                                                             }
//                                                             className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
//                                                         >
//                                                             <Trash2 className="h-4 w-4" />
//                                                         </button>
//                                                     </div>


//                                                     {/* Variants */}
//                                                     <div className="text-xs text-gray-600 space-y-1 mb-3">
//                                                         <p>
//                                                             Color: <span className="font-medium text-gray-900">{item.color}</span>
//                                                         </p>
//                                                         <p>
//                                                             Size: <span className="font-medium text-gray-900">{item.size}</span>
//                                                         </p>
//                                                     </div>

//                                                     {/* Quantity & Price */}
//                                                     <div className="flex items-center justify-between mt-auto gap-2 md:gap-0">
//                                                         <div className="flex items-center border border-gray-300">
//                                                             <button
//                                                                 onClick={() =>
//                                                                     updateQty(
//                                                                         item.productId,
//                                                                         item.color,
//                                                                         item.size,
//                                                                         item.quantity - 1
//                                                                     )
//                                                                 }
//                                                                 className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
//                                                             >
//                                                                 <Minus size={12} />
//                                                             </button>

//                                                             <input
//                                                                 type="text"
//                                                                 value={item.quantity}
//                                                                 readOnly
//                                                                 className="w-10 h-8 text-center border-x border-gray-300 text-sm text-gray-900 focus:outline-none"
//                                                             />

//                                                             <button
//                                                                 onClick={() => {
//                                                                     if (item.quantity >= item.stock) {
//                                                                         Swal.fire({
//                                                                             icon: "warning",
//                                                                             title: "Stock limit reached",
//                                                                             text: `Only ${item.stock} item(s) available`,
//                                                                         });
//                                                                         return;
//                                                                     }
//                                                                     updateQty(
//                                                                         item.productId,
//                                                                         item.color,
//                                                                         item.size,
//                                                                         item.quantity + 1
//                                                                     )
//                                                                 }
//                                                                 }
//                                                                 className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
//                                                             >
//                                                                 <Plus size={12} />
//                                                             </button>
//                                                         </div>

//                                                         <p className="text-sm md:text-lg font-semibold text-gray-900">
//                                                             {(item.price * item.quantity).toFixed(2)}TK
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>


//                                 {/*================ Cart Summary =================*/}
//                                 <div className="border-t border-gray-100 p-6 bg-gray-50 flex-shrink-0 space-y-4">
//                                     <div className="space-y-2">
//                                         <div className="flex justify-between text-sm text-gray-600">
//                                             <p>Subtotal</p>
//                                             <p>{subtotal.toFixed(2)}TK</p>
//                                         </div>
//                                         {/* <div className="flex justify-between text-sm text-gray-600">
//                                             <p>Shipping</p>
//                                             <p className="text-black font-medium">Free</p>
//                                         </div> */}
//                                         <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
//                                             <p>Total</p>
//                                             <p>{subtotal.toFixed(2)}TK</p>
//                                         </div>
//                                     </div>


//                                     <p className="text-xs text-gray-500 text-center">Taxes calculated at checkout</p>

//                                     <div className="space-y-2">
//                                         <button onClick={handleCheckout} className="w-full flex items-center justify-center px-3 py-2 md:px-6 md:py-4 border border-transparent text-sm md:text-base font-bold rounded-none text-white bg-black transition-all shadow-md hover:shadow-lg uppercase tracking-wide md:tracking-wider cursor-pointer">
//                                             Proceed to Checkout
//                                             <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
//                                         </button>
                                       

//                                         <button
//                                             onClick={closeDrawer}
//                                             className="w-full text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
//                                         >
//                                             Continue Shopping
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="p-6 text-center text-gray-500">
//                                 <p>No Records Found</p>
//                             </div>
//                         )}

//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     )
// }