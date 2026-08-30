import { Sidebar } from "@/components/layout/sidebar";
import UserContextProvider from "@/contexts/UserContext";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<UserContextProvider>
			<div className="flex w-full flex-1 ">
				<Sidebar />
				<div className="w-full">{children}</div>
			</div>
		</UserContextProvider>
	);
}
