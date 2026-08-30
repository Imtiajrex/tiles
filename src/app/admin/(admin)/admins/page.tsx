"use client";
import Crud from "@/components/crud";
import { z } from "zod";
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12 w-full">
			<Crud
				title="Admins"
				path={"admins"}
				headers={[
					{
						key: "name",
						name: "Name",
					},
					{
						key: "email",
						name: "Email",
					},
				]}
				inputs={[
					{
						id: "name",
						label: "Name",
					},
					{
						id: "email",
						label: "Email",
					},
				]}
				schema={z.object({
					name: z
						.string({
							required_error: "Name is required",
						})
						.min(3)
						.max(255),
					email: z
						.string({
							required_error: "Email is required",
						})
						.email(),
				})}
			/>
		</main>
	);
}
