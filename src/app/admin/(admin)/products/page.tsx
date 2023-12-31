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
						id: "image",
						label: "Image",
						type: "image",
					},
					{
						id: "name",
						label: "Name",
					},
					{
						id: "category",
						label: "Category",
					},
					{
						id: "company",
						label: "Company",
					},
					{
						id: "code",
						label: "Code",
					},
					{
						id: "grade",
						label: "Grade",
					},
					{
						id: "stock",
						label: "Stock",
					},
					{
						id: "price",
						label: "Price (৳)",
					},
				]}
				schema={z.object({
					image: z.any().optional(),
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
					stock: z.preprocess(
						(val: any) => parseInt(val),
						z.number({
							required_error: "Stock is required",
						})
					),
					company: z
						.string({
							required_error: "Company is required",
						})
						.min(3)
						.max(255),
					code: z
						.string({
							required_error: "Code is required",
						})
						.min(3)
						.max(255),
					grade: z
						.string({
							required_error: "Grade is required",
						})
						.min(3)
						.max(255),
					price: z.preprocess(
						(val: any) => parseInt(val),
						z.number({
							required_error: "Price is required",
						})
					),
				})}
				path={"products"}
				headers={[
					{
						name: "Image",
						key: "image",
						customRender: (data: any) => {
							return (
								<img
									className="w-10 h-10 rounded-full border"
									src={data.image}
									alt=""
								/>
							);
						},
					},
					{
						name: "Name",
						key: "name",
					},
					{
						name: "Category",
						key: "category",
					},
					{
						name: "Stock",
						key: "stock",
					},
					{
						name: "Company",
						key: "company",
					},
					{
						name: "Code",
						key: "code",
					},
					{
						name: "Grade",
						key: "grade",
					},
					{
						name: "Price (৳)",
						key: "price",
					},
				]}
			/>
		</main>
	);
}
