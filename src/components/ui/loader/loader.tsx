import { useRef } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import styles from './loader.module.scss';

const transitionClassnames = {
	enter: styles.enter,
	enterActive: styles.enterActive,
	exit: styles.exit,
	exitActive: styles.exitActive,
};

type LoaderProps = {
	show: boolean;
};

export const Loader = ({ show }: LoaderProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	return (
		<CSSTransition
			nodeRef={containerRef}
			in={show}
			timeout={300}
			classNames={transitionClassnames}
			unmountOnExit
		>
			<div className={styles.container} ref={containerRef}>
				<div className={styles.icon}>
					<AiOutlineLoading3Quarters className={styles.spinner} />
				</div>
			</div>
		</CSSTransition>
	);
};
