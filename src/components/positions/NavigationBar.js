'use client';

import styles from './NavigationBar.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavigationBar() {
    const pathname = usePathname();

    return (
        <nav className={styles.navigationBar}>
            <Link href='/positions/home' className={`${styles.navigationButton} ${pathname === '/positions/home' ? styles.activeNavigationButton : ''}`}>Home</Link>
            <Link href='/positions/advanced' className={`${styles.navigationButton} ${pathname === '/positions/advanced' ? styles.activeNavigationButton : ''}`}>Advanced</Link>
        </nav>
    );
}