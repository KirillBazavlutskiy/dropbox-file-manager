import { Section } from '@/components/layout/section';
import { FolderItem } from '@/components/ui/folder-item';
import { IconButton } from '@/components/ui/icon-button';
import { Loader } from '@/components/ui/loader';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useFilesManager } from './use-files-manager.ts';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_ICON_SIZE } from '@/utils/constant.ts';
import classNames from 'classnames';
import styles from './files-manager.module.scss';

export const FilesManager = () => {
	const navigate = useNavigate();

	const {
		isLoading,
		files,
		downloadFile,
		downloadFolder,
		deleteFile,
		uploadFiles,
	} = useFilesManager();

	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		onDrop: (acceptedFiles) => uploadFiles(acceptedFiles),
		noClick: true,
	});

	const goBack = () => {
		navigate(-1);
	};

	const goForward = () => {
		navigate(1);
	};

	return (
		<Section className={styles.container} containerMod={styles.inner}>
			<div
				{...getRootProps()}
				className={classNames(styles.dropzone, {
					[styles.disabled]: isLoading,
					[styles.dragActive]: isDragActive,
				})}
			>
				<input {...getInputProps()} />

				<ul className={styles.list}>
					{files.map((file) => (
						<FolderItem
							key={file.name}
							entity={file}
							onDelete={deleteFile}
							onDownload={downloadFile}
							onDownloadFolder={downloadFolder}
							uploadFiles={uploadFiles}
						/>
					))}
				</ul>
				<div className={styles.bottomButtons}>
					<div className={styles.navigation}>
						<IconButton variant="secondary" onClick={goBack}>
							<MdNavigateBefore size={DEFAULT_ICON_SIZE} />
						</IconButton>
						<IconButton variant="secondary" onClick={goForward}>
							<MdNavigateNext size={DEFAULT_ICON_SIZE} />
						</IconButton>
					</div>
					<IconButton variant="secondary" onClick={open}>
						<FaUpload size={DEFAULT_ICON_SIZE} />
					</IconButton>
				</div>
			</div>
			<Loader show={isLoading} />
		</Section>
	);
};
