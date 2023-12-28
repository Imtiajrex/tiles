"use client";
import Crud from "@/components/crud";
import { z } from "zod";
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12 w-full">
			<Crud
				title="Products"
				inputs={[
					{
						id: "name",
						label: "Name",
					},
					{
						id: "category",
						label: "Category",
					},
					{
						id: "type",
						label: "Type",
					},
					{
						id: "stock",
						label: "Stock",
					},
				]}
				schema={z.object({
					name: z
						.string({
							required_error: "Name is required",
						})
						.min(3)
						.max(255),
					category: z
						.string({
							required_error: "Category is required",
						})
						.min(3)
						.max(255),
					type: z
						.string({
							required_error: "Type is required",
						})
						.min(3)
						.max(255),
					stock: z.preprocess(
						(val: any) => parseInt(val),
						z.number({
							required_error: "Stock is required",
						})
					),
				})}
				path={"products"}
				headers={[
					{
						name: "Name",
						key: "name",
					},
					{
						name: "Category",
						key: "category",
					},
					{
						name: "Type",
						key: "type",
					},
					{
						name: "Stock",
						key: "stock",
					},
				]}
			/>
		</main>
	);
}
