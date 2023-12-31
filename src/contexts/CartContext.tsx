"use client";
import React from "react";

export type ProductType = {
	image?: string;
	name: string;
	price: number;
	category: string;
	company: string;
	code: string;
	grade: string;
	stock: number;
	id: string;
	quantity?: number;
};
type CartType = {
	products: (ProductType & {
		quantity: number;
	})[];
};
const CartContext = React.createContext({
	cart: null as CartType | null,
	setCart: (cart: CartType | null) => {},
});
export const useCart = () => React.useContext(CartContext);
export default function CartContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [cart, setCart] = React.useState<CartType | null>({
		products: [],
	});
	return (
		<CartContext.Provider value={{ cart, setCart }}>
			{children}
		</CartContext.Provider>
	);
}
