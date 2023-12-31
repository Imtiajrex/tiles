"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { firestore } from "@/lib/firebase";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	increment,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
	const { cart, setCart } = useCart();
	const products = cart?.products ?? [];
	const totalPrice = products.reduce(
		(acc, curr) => acc + curr.price * curr.quantity,
		0
	);
	const [data, setData] = React.useState({
		name: "",
		email: "",
		address: "",
		phone: "",
	});
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!data.name || !data.email || !data.address) {
			toast({
				title: "Please fill all the fields",
			});
			return;
		}
		const formatDate = Intl.DateTimeFormat("en-US").format(new Date());
		setIsLoading(true);
		const saleRef = await addDoc(collection(firestore, "sales"), {
			products,
			totalPrice,
			customerName: data.name,
			customerEmail: data.email,
			customerAddress: data.address,
			customerPhone: data.phone,
			timestamp: serverTimestamp(),
			date: formatDate,
			...data,
		});
		const user = await getDocs(
			query(
				collection(firestore, "customers"),
				where("email", "==", data.email)
			)
		);
		if (user.size == 0) {
			await addDoc(collection(firestore, "customers"), {
				name: data.name,
				email: data.email,
				address: data.address,
				phone: data.phone,
			});
		} else {
			const userRef = doc(firestore, "customers", user.docs[0].id);
			await setDoc(
				userRef,
				{
					name: data.name,
					address: data.address,
					phone: data.phone,
					email: data.email,
				},
				{
					merge: true,
				}
			);
		}
		const productToUpdate = {} as Record<string, number>;
		products.forEach((product) => {
			productToUpdate[product.id] = productToUpdate[product.id] ?? 0;
			productToUpdate[product.id] += product.quantity;
		});
		const productUpdaterPromises = Object.entries(productToUpdate).map(
			async ([id, quantity]) => {
				const productRef = doc(firestore, "products", id);
				const data = await getDoc(productRef);
				const stock = data.data()?.stock;
				await setDoc(
					productRef,
					{
						stock: stock - quantity,
					},
					{
						merge: true,
					}
				);
			}
		);
		await Promise.all(productUpdaterPromises);
		setCart({
			products: [],
		});

		toast({
			title: "Order placed successfully",
		});
		setIsLoading(false);
		router.push("/invoice/" + saleRef.id);
	};
	return (
		<div className="w-full flex flex-col  justify-center gap-4">
			<h1 className="text-xl font-bold mb-2">Checkout</h1>
			<form
				className="w-full flex flex-col gap-2 items-center justify-center"
				onSubmit={handleSubmit}
			>
				<div className="flex items-center w-full gap-4">
					<span className="text-lg font-medium">
						Products ({products.length})
					</span>
					<span className="text-lg font-medium">-</span>
					<span className="text-lg font-medium">{totalPrice} ৳</span>
				</div>
				<Input
					className="w-full "
					label="Name"
					value={data.name}
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
				<Input
					className="w-full "
					label="Email"
					value={data.email}
					onChange={(e) => setData({ ...data, email: e.target.value })}
				/>
				<Input
					className="w-full "
					label="Phone"
					value={data.phone}
					onChange={(e) => setData({ ...data, phone: e.target.value })}
				/>
				<Input
					className="w-full "
					label="Address"
					value={data.address}
					onChange={(e) => setData({ ...data, address: e.target.value })}
				/>
				<Button type="submit" className="mt-4 w-full" isLoading={isLoading}>
					Buy Now
				</Button>
			</form>
		</div>
	);
}
