"use client";
import React from "react";

type UserType = {
	name: string;
	email: string;
	id: string;
	role: string;
};
const UserContext = React.createContext({
	user: null as UserType | null,
	setUser: (user: UserType | null) => {},
});
export const useUser = () => React.useContext(UserContext);
export default function UserContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = React.useState<UserType | null>(null);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
