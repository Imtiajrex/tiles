"use client";
import { cn } from "@/lib/utils";

import { Home, LayoutDashboard, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
	const routes = [
		{ label: "Dashboard", href: "/admin", icon: Home },
		{ label: "Products", href: "/admin/products", icon: LayoutDashboard },
		{ label: "Sales", href: "/admin/sales", icon: ShoppingCart },
		{ label: "Customers", href: "/admin/customers", icon: Users },
		{ label: "Admins", href: "/admin/admins", icon: Users },
	];
	const pathname = usePathname();
	const router = useRouter();
	const logout = async () => {
		await signOut(auth);
		router.push("/admin/login");
	};
	return (
		<div
			className={cn(
				"pb-12 border-r max-w-[220px] w-full flex flex-col",
				className
			)}
		>
			<div className="space-y-4 py-4 flex flex-col flex-1">
				<div className="px-3 py-2 flex-1">
					<h2 className="mb-6 px-4 text-lg font-semibold tracking-tight">
						Tiles Management
					</h2>
					<div className="space-y-1">
						{routes.map((route) => {
							const isActive = pathname === route.href;
							return (
								<Link
									href={route.href}
									key={route.href}
									className={cn(
										"w-full text-sm font-medium flex gap-2 items-center px-4 py-2 rounded-md hover:bg-gray-100 transition-colors ",
										isActive && "bg-neutral-300 hover:bg-neutral-200"
									)}
								>
									<route.icon className="w-4 h-4" />
									{route.label}
								</Link>
							);
						})}
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-2 rounded-lg w-full p-2">
				<Button
					variant={"outline"}
					size={"sm"}
					className="w-full"
					onClick={logout}
				>
					Logout
				</Button>
			</div>
		</div>
	);
}
