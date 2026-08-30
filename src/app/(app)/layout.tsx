"use client";
import Header from "@/components/home/header";
import CartContextProvider from "@/contexts/CartContext";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex min-h-screen flex-col items-center max-w-screen-lg  gap-4 p-24 mx-auto self-center">
			<CartContextProvider>
				<Header />
				{children}
			</CartContextProvider>
		</main>
	);
}
