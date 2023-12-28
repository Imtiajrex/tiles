import { cn } from "@/lib/utils";

import { Home, LayoutDashboard, ShoppingCart } from "lucide-react";
import Link from "next/link";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
	const routes = [
		{ label: "Dashboard", href: "/admin/", icon: Home },
		{ label: "Products", href: "/admin/products", icon: LayoutDashboard },
		{ label: "Sales", href: "/admin/sales", icon: ShoppingCart },
	];
	return (
		<div className={cn("pb-12 border-r max-w-[220px] w-full", className)}>
			<div className="space-y-4 py-4">
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Tiles Management
					</h2>
					<div className="space-y-1">
						{routes.map((route) => (
							<Link
								href={route.href}
								key={route.href}
								className="w-full text-sm font-medium flex gap-2 items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800/30 transition-colors"
							>
								<route.icon className="w-4 h-4" />
								{route.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
