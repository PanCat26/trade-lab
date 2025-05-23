'use client';

import styles from './NavigationBar.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavigationBar() {
    const pathname = usePathname();

    return (
        <nav className={styles['navigation-bar']}>
            <Link href='/positions/home' className={`${styles['navigation-button']} ${pathname === '/positions/home' ? styles['active'] : ''}`}>Home</Link>
            <Link href='/positions/advanced' className={`${styles['navigation-button']} ${pathname === '/positions/advanced' ? styles['active'] : ''}`}>Advanced</Link>
        </nav>
    );
}