import { Sidebar } from "@/components/layout/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex w-full flex-1 ">
			<Sidebar />

			<div className="w-full">{children}</div>
		</div>
	);
}
