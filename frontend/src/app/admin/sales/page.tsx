"use client";
import Crud from "@/components/crud";
import { z } from "zod";
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12 w-full">
			<Crud
				title="Sales"
				inputs={[
					{
						id: "name",
						label: "Name",
					},
				]}
				schema={z.object({})}
				path={"sales"}
				headers={[]}
			/>
		</main>
	);
}
