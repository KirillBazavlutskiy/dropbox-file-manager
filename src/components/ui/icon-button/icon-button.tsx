import classNames from 'classnames';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './icon-button.module.scss';

type IconButtonProps = {
	variant?: 'primary' | 'secondary';
} & DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export const IconButton = ({
	variant = 'primary',
	children,
	className,
	...props
}: IconButtonProps) => {
	return (
		<button
			className={classNames(styles.button, styles[variant], className)}
			type="button"
			{...props}
		>
			{children}
		</button>
	);
};
