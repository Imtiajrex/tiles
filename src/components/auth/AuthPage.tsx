"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import AuthForm from "./AuthForm";

export default function AuthPage({
	title,
	description,
	login = false,
	altLinkText,
}: {
	title: string;
	description: string;
	login?: boolean;
	altLinkText: string;
}) {
	const router = useRouter();
	return (
		<div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<a
				href="/"
				className="absolute left-4 top-4 p-2 text-lg font-medium md:left-8 md:top-8"
			>
				Tiles Management
			</a>
			<Button
				onClick={() => {
					router.push(!login ? "/login" : "/signup");
				}}
				variant="ghost"
				className="absolute right-4 top-4 md:right-8 md:top-8"
			>
				{altLinkText}
			</Button>
			<div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
				<div
					className="absolute inset-0 bg-cover"
					style={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
					}}
				/>
				<a
					href="/"
					className="relative z-20 flex items-center text-lg font-medium"
				>
					{" "}
					Tiles Management{" "}
				</a>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;This library has saved me countless hours of work and
							helped me deliver stunning designs to my clients faster than ever
							before. Highly recommended!&rdquo;
						</p>
						<footer className="text-sm">Sofia Davis</footer>
					</blockquote>
				</div>
			</div>
			<div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[350px] lg:p-8">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
					<p className="text-muted-foreground text-sm">{description}</p>
				</div>
				<AuthForm login={login} emailButtonText="Continue" />
				<p className="text-muted-foreground px-8 text-center text-sm">
					By clicking continue, you agree to our{" "}
					<a
						href="/terms"
						className="hover:text-primary underline underline-offset-4"
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						href="/privacy"
						className="hover:text-primary underline underline-offset-4"
					>
						Privacy Policy
					</a>
					.
				</p>
			</div>
		</div>
	);
}
