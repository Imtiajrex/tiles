"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

export default function Header() {
	const router = useRouter();
	const { cart } = useCart();
	const products = cart?.products.length;
	return (
		<div className="flex items-center justify-between w-full">
			<Link className="text-lg font-semibold" href="/">
				Tile Management
			</Link>
			<div className="flex items-center gap-2 justify-end">
				<Button
					variant={"link"}
					onClick={() => {
						router.push("/cart");
					}}
				>
					Cart ({products})
				</Button>
				<Button
					variant={"link"}
					onClick={() => {
						router.push("/admin/login");
					}}
				>
					Admin
				</Button>
			</div>
		</div>
	);
}
