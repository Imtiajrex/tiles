import AuthPage from "@/components/auth/AuthPage";

export default function Page() {
	return (
		<AuthPage
			title="Login"
			description="Login to your account"
			altLinkText="Signup"
			login={true}
		/>
	);
}
