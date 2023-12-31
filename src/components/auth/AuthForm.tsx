"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { CircleDashed } from "lucide-react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore } from "@/lib/firebase";
import { useToast } from "../ui/use-toast";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function AuthForm({
	className,
	emailButtonText,
	login = false,
}: {
	className?: string;
	emailButtonText: string;
	login?: boolean;
}) {
	const [data, setData] = React.useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const { toast } = useToast();
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (login)
				await signInWithEmailAndPassword(auth, data.email, data.password);
			else
				await createUserWithEmailAndPassword(auth, data.email, data.password);

			const user = await getDocs(
				query(collection(firestore, "admins"), where("email", "==", data.email))
			);
			if (user.size == 0) {
				toast({
					title: "Error",
					description: "You are not an admin",
				});
				setIsLoading(false);
				return;
			}
			router.push("/admin");
			setIsLoading(false);
			toast({
				title: "Success",
				description: "You have successfully logged in",
			});
		} catch (e: any) {
			toast({
				title: "Error",
				description: e.message,
			});
			setIsLoading(false);
		}
		setIsLoading(false);
	};
	return (
		<div className={cn("grid gap-6", className)}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							name="email"
							disabled={isLoading}
							value={data.email}
							onChange={(e) => {
								setData({
									...data,
									email: e.currentTarget.value,
								});
							}}
						/>
					</div>
					{data.email && (
						<div className="grid gap-1">
							<Input
								id="password"
								placeholder="Password"
								type="password"
								name="password"
								disabled={isLoading}
								value={data.password}
								onChange={(e) => {
									setData({
										...data,
										password: e.currentTarget.value,
									});
								}}
							/>
						</div>
					)}
					<Button disabled={isLoading || !data.email || !data.password}>
						{isLoading && (
							<CircleDashed className="mr-2 h-4 w-4 animate-spin" />
						)}
						{emailButtonText} with Email
					</Button>
				</div>
			</form>
		</div>
	);
}
