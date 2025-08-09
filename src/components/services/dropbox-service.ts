import dbx from '@/lib/dropbox';
import type { Dropbox as DropboxType, files } from 'dropbox';

// A service class to encapsulate the logic for interacting with the Dropbox API.
class DropboxService {
	private dbx: DropboxType;

	constructor(dbx: DropboxType) {
		this.dbx = dbx;
	}

	/**
	 * Gets the content of a specified folder.
	 * @param path The path to the folder in Dropbox.
	 * @returns A promise that resolves with an array of file and folder entries.
	 */
	public async getFolderContent(
		path: string,
	): Promise<files.ListFolderResult['entries']> {
		try {
			// For the root folder, Dropbox expects an empty string instead of '/'.
			const response = await this.dbx.filesListFolder({
				path: path === '/' ? '' : path,
			});
			return response.result.entries;
		} catch (error) {
			console.error('DropboxService -> getFolderContent: ', error);
			throw error;
		}
	}

	/**
	 * Uploads a file to a specified path.
	 * @param path The destination path for the upload.
	 * @param file The file to upload.
	 * @returns A promise with the metadata of the uploaded file.
	 */
	public async uploadFile(
		path: string,
		file: File,
	): Promise<files.FileMetadata | undefined> {
		try {
			const response = await this.dbx.filesUpload({
				path: path,
				contents: file,
				mode: { '.tag': 'add' }, // Specify the file addition mode.
				autorename: true, // Automatically rename if there is a name conflict.
				mute: false, // Send a notification to the user about the new file.
			});
			return response.result;
		} catch (error) {
			console.error('DropboxService -> uploadFile: ', error);
			throw error;
		}
	}

	/**
	 * Deletes a file or folder at a specified path.
	 * @param path The path to the entity to be deleted.
	 * @returns A promise with the result of the delete operation.
	 */
	public async deleteEntity(
		path: string,
	): Promise<files.DeleteResult | undefined> {
		try {
			const response = await this.dbx.filesDeleteV2({ path });
			return response.result;
		} catch (error) {
			console.error('DropboxService -> deleteEntity: ', error);
			throw error;
		}
	}

	/**
	 * Gets a temporary link to download a file.
	 * @param path The path to the file.
	 * @returns A promise with a string containing the download link.
	 */
	public async getDownloadLink(path: string): Promise<string | undefined> {
		try {
			const response = await this.dbx.filesGetTemporaryLink({ path });
			return response.result.link;
		} catch (error) {
			console.error('DropboxService -> getDownloadLink: ', error);
			throw error;
		}
	}

	/**
	 * Downloads a folder as a ZIP archive.
	 * @param path The path to the folder to download.
	 */
	public async downloadFolderAsZip(path: string): Promise<void> {
		try {
			const response = await this.dbx.filesDownloadZip({ path });

			// Get the binary file data from the response.
			const fileBlob = (response.result as any).fileBlob;

			// Create a temporary URL to download the file in the browser.
			const url = window.URL.createObjectURL(fileBlob);
			const link = document.createElement('a');
			link.href = url;

			// Set the name of the downloaded archive.
			const folderName = path.split('/').pop() || 'archive';
			link.setAttribute('download', `${folderName}.zip`);

			// Initiate the file download.
			document.body.appendChild(link);
			link.click();

			// Clean up the created objects after download.
			link.parentNode?.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('DropboxService -> downloadFolderAsZip: ', error);
			throw error;
		}
	}
}

export const dropboxService = new DropboxService(dbx);
