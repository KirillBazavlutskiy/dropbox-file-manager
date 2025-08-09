import { useTranslation } from 'react-i18next';
import { Title } from '@/components/ui/title';
import styles from './header.module.scss';

export const Header = () => {
	const { t } = useTranslation('header');

	return (
		<div className={styles.wrapper}>
			<header className={styles.container}>
				<Title className={styles.title} tag="h1" size="h2">
					{t('title')}
				</Title>
			</header>
		</div>
	);
};
