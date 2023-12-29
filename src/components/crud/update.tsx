import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
export type InputType = {
	id: string;
	label: string;
	defaultValue?: string;
	className?: string;
	type?: string;
};
export type ValidateFunction = (values: Record<string, any>) => Promise<any>;
export type UpdateProps = {
	data?: Record<string, any>;
	onUpdate: (values: Record<string, string>) => Promise<void>;
	onValidate?: ValidateFunction;
	inputs: Record<string, any>;
	title: string;
	description?: string;
	isOpen: boolean;
	onClose: () => void;
};
export function Update(props: UpdateProps) {
	const title = props.data ? "Edit " + props.title : "Add " + props.title;
	const [values, setValues] = React.useState<Record<string, any>>({
		...props.data,
	});
	const [isSaving, setIsSaving] = React.useState(false);
	const [error, setError] = React.useState<Record<string, string>>({});
	useEffect(() => {
		setValues({ ...props.data });
	}, [props.data]);
	const handleValidation = async () => {
		if (props.onValidate) {
			const { errors } = await props.onValidate(values);
			if (Object.keys(errors).length > 0) {
				setError(errors);
				console.log(errors);
				return false;
			}
		}
		return true;
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValid = await handleValidation();
		if (!isValid) return;
		setIsSaving(true);
		await props.onUpdate(values);
		setIsSaving(false);
		props.onClose();
	};
	useEffect(() => {
		if (!props.isOpen) {
			setValues({});
			setError({});
		}
	}, [props.isOpen]);
	return (
		<Dialog open={props.isOpen} onOpenChange={props.onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{props.description && (
						<DialogDescription>{props.description}</DialogDescription>
					)}
				</DialogHeader>
				<form className="grid gap-4 py-4" onSubmit={handleSubmit}>
					{props.inputs.map((input: InputType) => (
						<Input
							key={input.id}
							label={input.label}
							defaultValue={input.defaultValue}
							className={input.className}
							type={input.type}
							value={values[input.id]}
							onChange={(e) =>
								setValues((prev) => ({
									...prev,
									[input.id]: e.target.value,
								}))
							}
							error={error[input.id]}
						/>
					))}
					<DialogFooter>
						<Button type="submit" isLoading={isSaving}>
							Save changes
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
