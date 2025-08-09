import { type ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './section.module.scss';

type SectionProps = {
	children: ReactNode;
	className?: string;
	containerMod?: string;
	isLoading?: boolean;
};

type ContainerProps = {
	children: ReactNode;
	className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
	return (
		<div className={classNames(styles.container, className)}>{children}</div>
	);
};

const Section = forwardRef<HTMLElement, SectionProps>(
	({ children, isLoading, className, containerMod }: SectionProps, ref) => {
		return (
			<section ref={ref} className={classNames(styles.section, className)}>
				<Container className={containerMod}>
					{isLoading ? (
						<div className={styles.loader}>Loading...</div>
					) : (
						children
					)}
				</Container>
			</section>
		);
	},
);

export { Section, Container };
