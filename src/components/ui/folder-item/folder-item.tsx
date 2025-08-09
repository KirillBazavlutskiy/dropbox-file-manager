import { DEFAULT_ICON_SIZE } from '@/utils/constant.ts';
import { type files } from 'dropbox';
import { Description } from '@/components/ui/description';
import { IconButton } from '@/components/ui/icon-button';
import { useDropzone } from 'react-dropzone';
import { CiFileOn } from 'react-icons/ci';
import { FaDownload, FaRegFolderOpen } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './folder-item.module.scss';

// Define the props for the FolderItem component.
type FolderItemProps = {
	entity: files.ListFolderResult['entries'][0]; // The file or folder entity from Dropbox.
	onDownload: (path: string) => void; // Function to handle file download.
	onDownloadFolder: (path: string) => void; // Function to handle folder download.
	onDelete: (path: string, isFolder: boolean) => void; // Function to handle entity deletion.
	uploadFiles: (files: File[], targetFolder: string) => void; // Function to upload files into this folder.
};

/**
 * A component that renders a single item (file or folder) from a Dropbox directory listing.
 * It handles display, user interactions like deletion, download, and drag-and-drop uploads for folders.
 */
export const FolderItem = ({
	entity,
	onDelete,
	onDownload,
	uploadFiles,
	onDownloadFolder,
}: FolderItemProps) => {
	// Check if the current entity is a folder.
	const isFolder = entity['.tag'] === 'folder';

	const { getRootProps, isDragActive } = useDropzone({
		onDrop: (acceptedFiles, _, event) => {
			// Stop the event from propagating to parent dropzones.
			if ('stopPropagation' in event) {
				event.stopPropagation();
			}
			if (entity.path_lower) {
				uploadFiles(acceptedFiles, entity.path_lower);
			}
		},
		noClick: true, // Disable opening the file dialog on click.
		noKeyboard: true, // Disable keyboard interaction.
		disabled: !isFolder, // Only enable dropzone for folders.
	});

	const handleDelete = () => {
		if (entity.path_lower) {
			onDelete(entity.path_lower, isFolder);
		}
	};

	const handleDownload = () => {
		if (entity.path_lower) {
			onDownload(entity.path_lower);
		}
	};

	const handleDownloadFolder = () => {
		if (entity.path_lower) {
			onDownloadFolder(entity.path_lower);
		}
	};

	// Conditionally apply dropzone props only if the item is a folder.
	const rootProps = isFolder ? getRootProps() : {};

	// Render different UI based on whether the entity is a file or a folder.
	switch (entity['.tag']) {
		case 'folder': {
			return (
				<li
					{...rootProps}
					className={classNames(styles.container, {
						// Apply a specific style when a file is being dragged over the folder.
						[styles.dropActive]: isFolder && isDragActive,
					})}
				>
					<div className={styles.info}>
						<FaRegFolderOpen size={DEFAULT_ICON_SIZE} />
						{/* Link to navigate into the folder. */}
						<Link className={styles.link} to={`/files${entity.path_lower}`}>
							<Description size="p2">{entity.name}</Description>
						</Link>
					</div>
					<div className={styles.tools}>
						{/* Action buttons for folder operations. */}
						<IconButton onClick={handleDownloadFolder}>
							<FaDownload size={DEFAULT_ICON_SIZE} />
						</IconButton>
						<IconButton onClick={handleDelete}>
							<FaRegTrashCan size={DEFAULT_ICON_SIZE} />
						</IconButton>
					</div>
				</li>
			);
		}
		case 'file': {
			return (
				<li className={styles.container}>
					<div className={styles.info}>
						<CiFileOn size={DEFAULT_ICON_SIZE} />
						<Description className={styles.title} size="p2">
							{entity.name}
						</Description>
					</div>
					<div className={styles.tools}>
						{/* Action buttons for file operations. */}
						<IconButton onClick={handleDownload}>
							<FaDownload size={DEFAULT_ICON_SIZE} />
						</IconButton>
						<IconButton onClick={handleDelete}>
							<FaRegTrashCan size={DEFAULT_ICON_SIZE} />
						</IconButton>
					</div>
				</li>
			);
		}
	}
};
