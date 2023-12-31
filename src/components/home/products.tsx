"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType, useCart } from "@/contexts/CartContext";
import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { CircleDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useToast } from "../ui/use-toast";

export default function Products() {
	const [products, setProducts] = React.useState<ProductType[]>([]);
	const [search, setSearch] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	React.useEffect(() => {
		(async () => {
			setIsLoading(true);
			const products = await getDocs(collection(firestore, "products"));
			setProducts(products.docs.map((doc) => doc.data()) as any);
			setIsLoading(false);
		})();
	}, []);
	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(search.toLowerCase()) ||
			product.code.toLowerCase().includes(search.toLowerCase()) ||
			product.category.toLowerCase().includes(search.toLowerCase()) ||
			product.company.toLowerCase().includes(search.toLowerCase()) ||
			product.grade.toLowerCase().includes(search.toLowerCase())
	);
	return (
		<>
			{isLoading && <CircleDashed className="w-12 h-12 animate-spin" />}
			{!isLoading && products.length == 0 && (
				<h1 className="text-4xl font-semibold">No products</h1>
			)}
			{!isLoading && products.length > 0 && (
				<div className="flex flex-wrap gap-4 w-full">
					<Input
						placeholder="Search"
						className="w-full "
						label="Search for a product"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					{filteredProducts.length == 0 && (
						<h1 className="text-4xl font-semibold">No products found</h1>
					)}
					{filteredProducts.map((product) => (
						<Product product={product}>
							<ProductAdder product={product} />
						</Product>
					))}
				</div>
			)}
		</>
	);
}

export const Product = ({
	product,
	children,
}: {
	product: ProductType;
	children?: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col gap-2 items-center justify-center max-w-xs w-full min-h-60 py-8 bg-white border rounded-lg px-4">
			{product.image && (
				<img
					src={product.image}
					className="w-full h-32 rounded-lg object-contain"
				/>
			)}
			<div className="flex flex-col gap-1 items-center justify-center">
				<h1 className="text-2xl font-semibold">{product.name}</h1>
				<p className="text-lg font-semibold">{product.price} ৳</p>
			</div>
			<div className="flex flex-wrap gap-2 p-2 px-8 items-center justify-center">
				<p className="badge">Company: {product.company}</p>
				<p className="badge">Category: {product.category}</p>
				<p className="badge">Code: {product.code}</p>
				<p className="badge">Grade: {product.grade}</p>

				<p className="badge">Stock: {product.stock}</p>
			</div>
			{children}
		</div>
	);
};

const ProductAdder = ({ product }: { product: ProductType }) => {
	const { cart, setCart } = useCart();
	const [quantity, setQuantity] = React.useState(1);
	const { toast } = useToast();
	const router = useRouter();
	return (
		<>
			<div className="flex items-center gap-2">
				<Button size={"sm"} onClick={() => setQuantity(quantity - 1)}>
					-
				</Button>
				<Input
					value={quantity}
					onChange={(e) => setQuantity(parseInt(e.target.value))}
					type="number"
					className="w-24 text-center"
				/>
				<Button size={"sm"} onClick={() => setQuantity(quantity + 1)}>
					+
				</Button>
			</div>
			<div className="flex items-center gap-2">
				<Button
					size={"sm"}
					variant={"outline"}
					onClick={() => {
						setCart({
							products: [...(cart?.products || []), { ...product, quantity }],
						});
						toast({
							title: "Added to cart",
							description: `${product.name} added to cart`,
						});
						setQuantity(1);
					}}
				>
					Add To Cart
				</Button>
				<Button
					size={"sm"}
					onClick={() => {
						setCart({
							products: [...(cart?.products || []), { ...product, quantity }],
						});
						toast({
							title: "Added to cart",
							description: `${product.name} added to cart`,
						});
						setQuantity(1);
						router.push("/cart");
					}}
				>
					Buy Now
				</Button>
			</div>
		</>
	);
};
