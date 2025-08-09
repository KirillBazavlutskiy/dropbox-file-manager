import type { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './description.module.scss';

type DescriptionProps = {
	children: string | ReactNode;
	size?:
		| 'p1'
		| 'p1_secondary'
		| 'p2'
		| 'p2_secondary'
		| 'p3'
		| 'p3_secondary'
		| 'p3_tertiary'
		| 'p4'
		| 'p5'
		| 'p6'
		| 'p6_secondary';
	className?: string;
};

const selectClassnames = ({ size }: { size?: DescriptionProps['size'] }) =>
	classNames(styles.description, {
		[styles.p1]: size === 'p1',
		[styles.p1_secondary]: size === 'p1_secondary',
		[styles.p2]: size === 'p2',
		[styles.p2_secondary]: size === 'p2_secondary',
		[styles.p3]: size === 'p3',
		[styles.p3_secondary]: size === 'p3_secondary',
		[styles.p3_tertiary]: size === 'p3_tertiary',
		[styles.p4]: size === 'p4',
		[styles.p5]: size === 'p5',
		[styles.p6]: size === 'p6',
		[styles.p6_secondary]: size === 'p6_secondary',
	});

export function Description({
	children,
	className,
	size = 'p2',
}: DescriptionProps) {
	const descriptionClassname = selectClassnames({ size });

	return (
		<p className={classNames(descriptionClassname, className)}>{children}</p>
	);
}
