"use client";
import Crud from "@/components/crud";
import { z } from "zod";
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12 w-full">
			<Crud
				title="Customers"
				inputs={[]}
				create={false}
				edit={false}
				schema={z.object({})}
				path={"customers"}
				headers={[
					{
						key: "name",
						name: "Name",
					},
					{
						key: "email",
						name: "Email",
					},
					{
						key: "phone",
						name: "Phone",
					},
					{
						key: "address",
						name: "Address",
					},
				]}
			/>
		</main>
	);
}
