/* eslint-disable @next/next/no-img-element */
"use client";
import manageFileUpload, { deleteImage } from "@/lib/upload";
import { CircleDashed, Upload, X } from "lucide-react";
import React, { useState } from "react";

export default function Uploader({
	label,
	info,
	value,
	onChange,
	path,
	multiple = false,
}: {
	label?: string;
	info?: string;
	value?: string;
	onChange?: any;
	path: string;
	multiple?: boolean;
}) {
	const [progress, setProgress] = React.useState<number>(0);
	const [uploading, setUploading] = React.useState(false);
	const [localFile, setLocalFile] = useState<string>("");
	const [images, setImages] = useState<string[]>([]);
	const selectImage = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.multiple = multiple;
		input.onchange = (e) => {
			const files = (e.target as HTMLInputElement).files;
			if (!files) return;
			const file = files[0];
			setLocalFile(URL.createObjectURL(file));
			//get blob and upload
			manageFileUpload(
				file,
				{
					onComplete: (url) => {
						setUploading(false);
						setLocalFile("");
						onChange(url);
					},
					onFail: (err) => {
						setUploading(false);
						console.log(err);
					},
					onStart: () => {
						setUploading(true);
						console.log("start");
					},
					onProgress: (progress) => {
						setProgress(progress);
					},
				},
				path
			);
		};
		input.click();
	};
	React.useEffect(() => {
		console.log(
			"images",
			images,
			"localFile",
			localFile,
			"value",
			value,
			"multiple",
			multiple
		);
		if (images.length > 0) {
			onChange(images);
		}
	}, [images, localFile]);

	React.useEffect(() => {
		if (!multiple || !value || !localFile) return;
		if (value.length == localFile.length) {
			setUploading(false);
			setProgress(0);
		}
	}, [value]);
	const removeImage = (index?: number) => {
		onChange(null);
		setLocalFile("");
		if (value) {
			deleteImage(value);
		}
	};
	return (
		<button
			type="button"
			className=" flex flex-col items-center justify-center gap-2 w-full rounded-lg border-2 border-neutral-900 bg-neutral-100 hover:bg-primary-50 duration-200  py-6 px-4"
			onClick={selectImage}
		>
			{!value && localFile && !multiple && typeof localFile == "string" && (
				<div className="relative">
					<img
						src={localFile}
						alt=""
						className=" w-44 h-32 border-2 border-neutral-700 object-cover rounded-lg"
					/>

					{uploading && (
						<div className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
							<div
								className="flex flex-col justify-center overflow-hidden bg-blue-500 text-xs text-white text-center"
								role="progressbar"
								style={{
									width: `${progress}%`,
								}}
							>
								{progress}%
							</div>
						</div>
					)}
				</div>
			)}
			{value && typeof value == "string" && (
				<div className="relative">
					<img
						src={value}
						alt=""
						className=" w-44 h-32 border-2 border-neutral-700 object-cover rounded-lg"
					/>
					<a
						className="bg-red-500 hover:bg-red700 p-2 rounded-lg absolute top-2 right-2"
						onClick={(e) => {
							e.stopPropagation();
							removeImage();
						}}
					>
						<X className="w-3 h-3" />
					</a>
				</div>
			)}
			<Upload className="w-8 h-8 " />
			<span className="text-md font-bold">{label}</span>
			<span className="text-sm text-gray-600">{info}</span>
		</button>
	);
}
