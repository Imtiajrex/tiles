"use client";
import { ProductType } from "@/contexts/CartContext";
import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CircleDotDashed } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
	const { id } = useParams();

	type SalesType = {
		id: string;
		customerName: string;
		customerEmail: string;
		customerPhone: string;
		customerAddress: string;
		products: ProductType[];
		totalPrice: number;
		date: string;
	};
	const [data, setData] = React.useState<SalesType | null>(null);
	const [loading, setLoading] = React.useState(true);
	useEffect(() => {
		async function getData() {
			setLoading(true);
			const snap = await getDoc(doc(firestore, `sales/${id}`));
			setData(snap.data() as SalesType);
			setLoading(false);
		}
		getData();
	}, []);

	return (
		<div className="w-full flex flex-col gap-4">
			{loading && <CircleDotDashed className="w-6 h-6 animate-spin" />}
			{!loading && !data && (
				<div className="w-full h-full flex justify-center items-center">
					No Data Found
				</div>
			)}
			{!loading && data && (
				<>
					<div className="flex justify-between mb-4">
						<div className="flex flex-col gap-1">
							<span className="text-sm">Invoice ID</span>
							<span className="text-lg">#{id}</span>
						</div>
					</div>
					<div className="flex-flex-col w-full bg-white border rounded-lg p-4">
						<div className="flex justify-between">
							<div className="flex flex-col gap-1">
								<span className="text-sm">Customer Name</span>
								<span className="text-lg">{data?.customerName}</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm">Customer Email</span>
								<span className="text-lg">{data?.customerEmail}</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm">Customer Phone</span>
								<span className="text-lg">{data?.customerPhone}</span>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex flex-col gap-1">
								<span className="text-sm">Customer Address</span>
								<span className="text-lg">{data?.customerAddress}</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm">Date</span>
								<span className="text-lg">
									{data?.date || new Date().toDateString()}
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-sm">Products</span>
						{data?.products.map((product) => {
							return (
								<div className="flex  gap-2 items-center  w-full p-2 justify-between rounded-lg bg-white border">
									<div className="flex flex-col ">
										<span className="text-lg">{product.name}</span>
										<span className="text-sm">
											Quantity: {product?.quantity}
										</span>
									</div>
									<span className="text-sm">
										Price: {product?.price * (product?.quantity || 1)} ৳
									</span>
								</div>
							);
						})}
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-sm">Total Price</span>
						<span className="text-lg">{data?.totalPrice} ৳</span>
					</div>
				</>
			)}
		</div>
	);
}
