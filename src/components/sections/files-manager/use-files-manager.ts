import type { files } from 'dropbox';
import { dropboxService } from '@/components/services/dropbox-service.ts';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Custom hook for managing file operations in the UI.
 * It handles state, fetches data, and provides methods for file interactions.
 */
export const useFilesManager = () => {
	const { t: tErrors } = useTranslation('errors');
	const { t: tMessages } = useTranslation('messages');

	const navigate = useNavigate();
	const params = useParams();

	const [isLoading, setLoading] = useState<boolean>(false);
	const [files, setFiles] = useState<files.ListFolderResult['entries']>([]);

	/**
	 * Fetches the list of files and folders for the current path from Dropbox.
	 */
	const fetchFiles = async () => {
		try {
			setLoading(true);
			// Determine the current path from the URL parameters.
			const currentPath = params['*'] ? `/${params['*']}` : '';
			const entries = await dropboxService.getFolderContent(currentPath);
			setFiles(entries);
		} catch (error) {
			// Navigate to the root directory if there's an error.
			navigate('/');
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Generates a temporary link for a file and opens it in a new tab.
	 * @param path The full path of the file to download.
	 */
	const downloadFile = async (path: string) => {
		try {
			setLoading(true);
			const downloadLink = await dropboxService.getDownloadLink(path);
			if (downloadLink) {
				window.open(downloadLink, '_blank');
			}
		} catch (error) {
			toast(tErrors('download'), { type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Downloads an entire folder as a ZIP archive.
	 * @param path The full path of the folder to download.
	 */
	const downloadFolder = async (path: string) => {
		setLoading(true);
		try {
			await dropboxService.downloadFolderAsZip(path);
		} catch (error) {
			toast(tErrors('download'), { type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Deletes a file or folder and refreshes the file list upon success.
	 * @param path The full path of the entity to delete.
	 */
	const deleteFile = async (path: string) => {
		try {
			setLoading(true);
			const result = await dropboxService.deleteEntity(path);

			if (result) {
				toast(tMessages('deleted'), { type: 'info' });
				// Refresh the file list to reflect the deletion.
				await fetchFiles();
			}
		} catch (error) {
			toast(tErrors('delete'), { type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	/**
	 * A helper function to upload a single file.
	 * @param file The File object to upload.
	 * @param targetFolder Optional destination folder.
	 * @returns The metadata of the uploaded file.
	 */
	const uploadSingleFile = async (file: File, targetFolder?: string) => {
		// Construct the full upload path.
		const basePath = targetFolder || (params['*'] ? `/${params['*']}` : '');
		const fullPath = `${basePath}/${file.name}`;

		const result = await dropboxService.uploadFile(fullPath, file);

		if (!result) {
			// Throw an error if the upload fails.
			throw new Error('Upload failed');
		}

		return result;
	};

	/**
	 * Handles the upload of multiple files concurrently.
	 * @param files An array of File objects to upload.
	 * @param targetFolder Optional destination folder for all files.
	 */
	const uploadFiles = async (files: File[], targetFolder?: string) => {
		if (!files || files.length === 0) {
			return;
		}

		setLoading(true);

		try {
			// Create an array of upload promises.
			const uploadPromises = files.map((file) =>
				uploadSingleFile(file, targetFolder),
			);
			// Wait for all uploads to complete.
			await Promise.all(uploadPromises);
			toast(tMessages('uploaded'), { type: 'success' });
			// Refresh file list if uploading to the current folder.
			if (!targetFolder) await fetchFiles();
		} catch (error) {
			toast(tErrors('upload'), { type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	// Effect hook to fetch files whenever the URL parameters change.
	useEffect(() => {
		fetchFiles();
	}, [params]);

	// Return the state and methods to be used by the component.
	return {
		isLoading,
		files,
		downloadFile,
		downloadFolder,
		deleteFile,
		uploadFiles,
	};
};
