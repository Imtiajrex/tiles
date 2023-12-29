"use client";
import { Edit, Plus, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import DataTable, { HeaderType } from "./datatable";
import DeleteConfirmation from "./delete-confirmation";
import { InputType, Update, UpdateProps, ValidateFunction } from "./update";
import { z } from "zod";
import { api } from "@/lib/api";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

type CrudProps = {
	title: string;
	inputs: UpdateProps["inputs"];
	schema?: z.ZodObject<any, any>;
	path: string;
	headers: HeaderType[];
};
export default function Crud({
	title,
	inputs,
	schema,
	path,
	headers,
}: CrudProps) {
	const [deletableData, setDeletableData] =
		React.useState<Record<string, string>>();
	const [editableData, setEditableData] =
		React.useState<Record<string, string>>();
	const [isAdderOpen, setIsAdderOpen] = React.useState(false);
	const [isFetching, setIsFetching] = React.useState(true);
	const [data, setData] = React.useState<Record<string, string>[]>([]);
	const { toast } = useToast();
	const deleteData = async () => {
		try {
			await deleteDoc(doc(firestore, `${path}/${deletableData?.id}`));

			toast({
				title: "Deleted Successfully!",
				description: "The data has been deleted successfully!",
			});
			fetchData();
			return {
				success: true,
			};
		} catch (e) {
			console.log(e);
			return {
				error: e,
				success: false,
			};
		}
	};
	const updateData = async (values: any) => {
		const data = {
			keys: [],
			values: [],
		} as any;
		Object.entries(values).forEach(([key, value]) => {
			if (value) {
				data.keys.push(key);
				data.values.push(value);
			}
		});
		if (editableData) {
			try {
				await updateDoc(doc(firestore, `${path}/${editableData.id}`), {
					...data,
				});
			} catch (e) {
				console.log(e);
			} finally {
				fetchData();
			}
		} else {
			try {
				await addDoc(collection(firestore, path), {
					...data,
				});
			} catch (e) {
				console.log(e);
			} finally {
				fetchData();
			}
		}
		toast({
			title: "Saved Successfully!",
			description: "The data has been saved successfully!",
		});
	};
	const fetchData = async () => {
		setIsFetching(true);
		try {
			const res = await getDocs(collection(firestore, path));
			const data = res.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			setData(data);
		} catch (e) {
			console.log(e);
		} finally {
			setIsFetching(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	const onValidate: ValidateFunction = async (values) => {
		if (!schema) return { errors: {} };
		const errors: Record<string, string> = {};
		try {
			await schema.parseAsync(values);
		} catch (error) {
			if (error instanceof z.ZodError) {
				error.errors.forEach((err) => {
					errors[err.path[0]] = err.message;
				});
			}
		}
		return { errors };
	};

	return (
		<div className="bg-white rounded-xl border w-full p-4 pt-8">
			<Update
				title={title}
				inputs={inputs}
				onUpdate={updateData}
				onClose={() => {
					setEditableData(undefined);
				}}
				isOpen={!!editableData}
				data={editableData}
				onValidate={onValidate}
			/>
			<Update
				title={title}
				inputs={inputs}
				onUpdate={updateData}
				onClose={() => {
					setIsAdderOpen(false);
				}}
				isOpen={isAdderOpen}
				onValidate={onValidate}
			/>
			<DeleteConfirmation
				setDeletableData={setDeletableData}
				deletableData={deletableData}
				onAction={deleteData}
			/>
			<div className="flex items-center gap-2">
				<h1 className="text-xl font-bold">{title}</h1>
				<Button
					size={"sm"}
					className="gap-2"
					onClick={() => {
						setIsAdderOpen(true);
					}}
				>
					Add {title}
					<Plus className="w-4 h-4" />
				</Button>
			</div>
			<DataTable
				headers={[
					...headers,
					{
						name: "Actions",
						key: "actions",
						customRender: (data) => (
							<div className="flex gap-2">
								<Button
									size="sm"
									variant={"outline"}
									onClick={() => {
										setEditableData(data);
									}}
								>
									<Edit className="w-4 h-4" />
								</Button>
								<Button
									size="sm"
									variant={"outline"}
									onClick={() => {
										setDeletableData(data);
									}}
								>
									<Trash className="w-4 h-4" />
								</Button>
							</div>
						),
					},
				]}
				data={data}
				isLoading={isFetching}
			/>
		</div>
	);
}
