"use client";

import { Stat } from "@/components/ui/stat";
import { LayoutDashboard, ShoppingCart, Users } from "lucide-react";

export default function Home() {
	return (
		<main className="flex  flex-wrap gap-2  p-12">
			<h1 className="text-xl font-bold w-full mb-6">
				Welcome to Tiles Management
			</h1>
			<Stat
				title="Total Products"
				description="Total number of products"
				Icon={LayoutDashboard}
				path="products"
			/>
			<Stat
				title="Total Sales"
				description="Total number of sales"
				Icon={ShoppingCart}
				path="sales"
			/>
			<Stat
				title="Total Customers"
				description="Total number of customers"
				Icon={Users}
				path="customers"
			/>
			<Stat
				title="Total Admins"
				description="Total number of admins"
				Icon={Users}
				path="admins"
			/>
		</main>
	);
}
