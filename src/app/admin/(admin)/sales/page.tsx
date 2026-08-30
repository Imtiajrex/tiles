"use client";
import Crud from "@/components/crud";
import { Button } from "@/components/ui/button";
import { z } from "zod";
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12 w-full">
			<Crud
				title="Sales"
				inputs={[]}
				create={false}
				edit={false}
				schema={z.object({})}
				path={"sales"}
				headers={[
					{
						key: "customerName",
						name: "Customer Name",
					},
					{
						key: "products",
						name: "Products",
						customRender: (data: any) => {
							const products = data.products;
							return (
								<div className="flex flex-col gap-2 ">
									{products.map((product: any) => {
										return (
											<div className="flex flex-col gap-1 p-2 rounded-lg bg-green-200 text-sm">
												<span>{product.name}</span>
												<span>Quantity:{product.quantity}</span>
											</div>
										);
									})}
								</div>
							);
						},
					},
					{
						key: "date",
						name: "Date",
					},
					{
						key: "totalPrice",
						name: "Total (৳)",
					},
				]}
				actions={(data: any) => {
					return (
						<Button
							size={"sm"}
							onClick={() => {
								window.open(`/invoice/${data.id}`);
							}}
						>
							View Invoice
						</Button>
					);
				}}
			/>
		</main>
	);
}
