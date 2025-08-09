import type { JSX, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './title.module.scss';

type TitleProps = {
	children: string | ReactNode;
	tag?: keyof JSX.IntrinsicElements;
	size?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h3_secondary'
		| 'h4'
		| 'h4_secondary'
		| 'h5'
		| 'h5_secondary'
		| 'h6'
		| 'h6_secondary';
	className?: string;
};

const selectClassnames = ({ size }: { size?: TitleProps['size'] }) =>
	classNames(styles.title, {
		[styles.h1Size]: size === 'h1',
		[styles.h2Size]: size === 'h2',
		[styles.h3Size]: size === 'h3',
		[styles.h3SecondarySize]: size === 'h3_secondary',
		[styles.h4Size]: size === 'h4',
		[styles.h4SecondarySize]: size === 'h4_secondary',
		[styles.h5Size]: size === 'h5',
		[styles.h5SecondarySize]: size === 'h5_secondary',
		[styles.h6Size]: size === 'h6',
		[styles.h6SecondarySize]: size === 'h6_secondary',
	});

export function Title({
	className,
	children,
	tag = 'div',
	size = 'h2',
}: TitleProps) {
	const Tag = tag;
	const titleClassname = selectClassnames({ size });

	return (
		<Tag className={classNames(titleClassname, className)}>{children}</Tag>
	);
}
