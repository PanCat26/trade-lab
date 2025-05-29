import styles from './layout.module.css';
import NavigationBar from '../components/positions/NavigationBar';

export default function PositionsLayout({ children }) {
    return (
        <div className={styles.positionsContainer}>
            <NavigationBar />
            <div id="scrollableContainer" className={styles.scrollableContainer}>
                {children}
            </div>
            <div className={styles.buttonContainer}></div>
        </div>
    );
}