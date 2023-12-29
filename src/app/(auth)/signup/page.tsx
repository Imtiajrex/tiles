import AuthPage from "@/components/auth/AuthPage";

export default function Page() {
	return (
		<AuthPage
			title="Signup"
			description="Signup for an account"
			altLinkText="Login"
			login={false}
		/>
	);
}
