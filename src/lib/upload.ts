import { collection, doc, getFirestore } from "firebase/firestore";
import {
	ref,
	uploadBytesResumable,
	getStorage,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
const manageFileUpload = (
	fileBlob: Blob,
	{
		onStart,
		onProgress,
		onComplete,
		onFail,
	}: {
		onStart?: () => void;
		onProgress?: (progress: number) => void;
		onComplete?: (downloadURL: string, path: string) => void;
		onFail?: (error: any) => void;
	},
	path?: string
) => {
	const storage = getStorage();
	const firestore = getFirestore();
	const imgName = doc(collection(firestore, "any")).id;
	const filePath = path + `/${imgName}.jpg`;
	const storageRef = ref(storage, filePath);

	// Create file metadata including the content type
	const metadata = {
		contentType: "image/jpeg",
	};

	// Trigger file upload start event
	onStart && onStart();
	const uploadTask = uploadBytesResumable(storageRef, fileBlob, metadata);

	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

			// Monitor uploading progress
			onProgress && onProgress(Math.fround(progress));
		},
		(error) => {
			// Something went wrong - dispatch onFail event with error  response
			onFail && onFail(error);
		},
		() => {
			// Upload completed successfully, now we can get the download URL

			getDownloadURL(storageRef)
				.then((downloadURL) => {
					// dispatch on complete event
					onComplete && onComplete(downloadURL, filePath);
				})
				.catch((error) => {
					console.log(error.message);
				});
		}
	);
	return uploadTask;
};

export default manageFileUpload;
export const deleteImage = (url: string) => {
	const path = getRefFromURL(url);
	const storage = getStorage();
	const storageRef = ref(storage, path);
	return deleteObject(storageRef);
};
export const getRefFromURL = (uri: string) => {
	var url_token = uri.split("?");
	var url = url_token[0].split("/");
	const path = url[url.length - 1];
	var filePath = path.replace(/%2F/g, "/");
	return filePath;
};
