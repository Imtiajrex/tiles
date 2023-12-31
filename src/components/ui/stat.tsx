import { firestore } from "@/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import React, { useEffect } from "react";

export const Stat = ({
	title,
	description,
	Icon,
	path,
}: {
	title: string;
	description: string;
	Icon: any;
	path: string;
}) => {
	const [count, setCount] = React.useState(0);
	useEffect(() => {
		getCountFromServer(collection(firestore, path)).then((count) => {
			setCount(count.data().count);
		});
	}, []);
	return (
		<div className="flex flex-col gap-2  border p-3 rounded-lg shadow-md sm:max-w-[200px] max-w-[125px] h-32 w-full cursor-pointer hover:shadow-lg transition-all duration-200 ease-in-out">
			<div className="flex items-center justify-between">
				<div className="w-12 h-12 bg-primary-100/50 rounded-lg flex items-center justify-center">
					<Icon className="text-primary-500 w-8 h-8" />
				</div>
				<div>
					<p className="text-xl font-bold">{count}</p>
				</div>
			</div>
			<div className="flex flex-col">
				<h1 className="text-sm font-bold">{title}</h1>
				<p className="text-xs text-gray-600">{description}</p>
			</div>
		</div>
	);
};
