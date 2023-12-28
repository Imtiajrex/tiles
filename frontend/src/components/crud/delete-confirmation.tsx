import React from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

export default function DeleteConfirmation({
	deletableData,
	setDeletableData,
	onAction,
}: {
	deletableData?: Record<string, string>;
	setDeletableData: React.Dispatch<
		React.SetStateAction<Record<string, string> | undefined>
	>;
	onAction: () => Promise<any>;
}) {
	const [actionRunning, setActionRunning] = React.useState(false);
	const onClose = () => {
		setDeletableData(undefined);
	};
	const handleAction = async () => {
		setActionRunning(true);
		await onAction();

		setActionRunning(false);
		onClose();
	};
	return (
		<AlertDialog open={!!deletableData} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button onClick={handleAction} isLoading={actionRunning}>
						Continue
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
