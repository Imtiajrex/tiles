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
	const [progress, setProgress] = React.useState<number | number[]>(0);
	const [uploading, setUploading] = React.useState(false);
	const [localFile, setLocalFile] = useState<string | string[]>("");
	const [images, setImages] = useState<string[]>([]);
	const selectImage = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.multiple = multiple;
		input.onchange = (e) => {
			const files = (e.target as HTMLInputElement).files;
			if (!files) return;
			if (multiple) {
				setLocalFile(
					Array.from(files).map((file) => URL.createObjectURL(file))
				);
				//get blob and upload
				setUploading(true);
				Array.from(files).forEach((file, index) => {
					manageFileUpload(
						file,
						{
							onComplete: (url) => {
								setLocalFile((prev) => {
									const newLocalFile = [...prev];
									newLocalFile.splice(index, 1);
									return newLocalFile;
								});
								setImages((prev) => {
									const newImages = [...prev];
									newImages[index] = url;

									return newImages;
								});
							},
							onFail: (err) => {
								setUploading(false);
								console.log(err);
							},
							onProgress: (progress) => {
								setProgress((prev) => {
									if (typeof prev === "number") return prev;
									const newProgress = [...prev];
									newProgress[index] = progress;
									return newProgress;
								});
							},
						},
						path
					);
				});
			} else {
				const file = files[0];
				setLocalFile(URL.createObjectURL(file));
				//get blob and upload
				manageFileUpload(
					file,
					{
						onComplete: (url) => {
							setUploading(false);
							setLocalFile(undefined);
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
			}
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
		if (
			images.length > 0 &&
			(!multiple || (multiple && localFile.length == 0))
		) {
			onChange(images);
		}
	}, [images, localFile]);

	React.useEffect(() => {
		if (
			!multiple ||
			!value ||
			!Array.isArray(value) ||
			!localFile ||
			!Array.isArray(localFile)
		)
			return;
		if (value.length == localFile.length) {
			setUploading(false);
			setProgress([]);
		}
	}, [value]);
	const removeImage = (index?: number) => {
		if (!multiple) {
			onChange(null);
			setLocalFile("");
			if (value) {
				deleteImage(value);
			}
		} else {
			if (!images || !Array.isArray(images)) return;
			setLocalFile((prev) => {
				if (!Array.isArray(prev)) return prev;
				const newLocalFile = [...prev];
				newLocalFile.splice(index, 1);
				return newLocalFile;
			});
			const newImages = [...images];
			newImages.splice(index, 1);
			onChange(newImages);
		}
	};
	console.log(localFile, value);
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
			{value &&
				multiple &&
				Array.isArray(value) &&
				value.map((url, index) => (
					<div className="relative" key={url}>
						<img
							src={url}
							alt=""
							className=" w-44 h-32 border-2 border-neutral-700 object-cover rounded-lg"
						/>
						<a
							className="bg-red-500 hover:bg-red700 p-2 rounded-lg absolute top-2 right-2"
							onClick={(e) => {
								e.stopPropagation();
								removeImage(index);
							}}
						>
							<X className="w-3 h-3" />
						</a>
					</div>
				))}
			{multiple &&
				localFile &&
				Array.isArray(localFile) &&
				localFile.map((url, index) => (
					<div className="relative" key={url}>
						<img
							src={url}
							alt=""
							className=" w-44 h-32 border-2 border-neutral-700 object-cover rounded-lg"
						/>
						<a
							className="bg-red-500 hover:bg-red700 p-2 rounded-lg absolute top-2 right-2"
							onClick={(e) => {
								e.stopPropagation();
								removeImage(index);
							}}
						>
							<X className="w-3 h-3" />
						</a>

						{uploading && (
							<div className="flex rounded-full overflow-hidden w-full h-full absolute top-0 left-0">
								<CircleDashed className="animate-spin w-full h-full" />
							</div>
						)}
					</div>
				))}
			<Upload className="w-8 h-8 " />
			<span className="text-md font-bold">{label}</span>
			<span className="text-sm text-gray-600">{info}</span>
		</button>
	);
}
