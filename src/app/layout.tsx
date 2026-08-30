import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "@/lib/firebase";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Tiles Management",
	description: "Manage tiles for the home page of the website.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={cn(inter.className, "bg-neutral-50")}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
