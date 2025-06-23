import styles from './layout.module.css';

export default function Layout({ children }) {
    return (
        <>        
            <header className={styles.header}>
                <button className={styles.logo}>TradeLab</button>
            </header>
            <main className={styles.main}>
                <nav className={styles.sidebar}>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 0 24 24" width="68px" fill="#e6e6e6"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                    </button>
                </nav>
                {children}
            </main>
        </>
    );
}