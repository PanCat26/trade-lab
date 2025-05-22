import styles from './layout.module.css';
import NavigationBar from '../components/positions/NavigationBar';

export default function PositionsLayout({ children }) {
    return (
        <div className={styles['positions-container']}>
            <NavigationBar />
                <div className={styles['scrollable-container']}>
                    {children}
                </div>
            <div className={styles['button-container']}></div>
        </div>
    );
}