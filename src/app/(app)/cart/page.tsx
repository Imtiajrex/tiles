"use client";
import { Product } from "@/components/home/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
	const { cart, setCart } = useCart();
	const products = cart?.products ?? [];
	const router = useRouter();
	const totalPrice = products.reduce(
		(acc, curr) => acc + curr.price * curr.quantity,
		0
	);
	return (
		<div className="w-full items-center justify-center gap-2">
			<h1 className="text-xl font-bold mb-6">Cart</h1>
			{products.length == 0 && (
				<h1 className="text-4xl font-semibold">No products</h1>
			)}
			{products.length > 0 && (
				<>
					<div className="flex flex-wrap gap-4 w-full">
						{products.map((product, index) => (
							<Product product={product}>
								<p className="text-sm text-neutral-600">
									Quantity: {product.quantity}
								</p>
								<Button
									onClick={() => {
										setCart({
											products: products.filter((p, idx) => idx != index),
										});
									}}
									size={"sm"}
									variant={"destructive"}
								>
									Remove from cart
								</Button>
							</Product>
						))}
					</div>
					<Button
						onClick={() => {
							router.push("/check");
						}}
						className="mt-4 w-full"
					>
						Checkout ({totalPrice} ৳)
					</Button>
				</>
			)}
		</div>
	);
}
