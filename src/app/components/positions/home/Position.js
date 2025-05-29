'use client'

import { useState } from 'react';
import styles from './Position.module.css';

export default function Position({ position }) {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggleDetails = () => setShowDetails((prev) => !prev);

    return (
        <div className={styles.position}>
            <div className={styles.titleRow}>
                <div className={styles.titleText} onClick={handleToggleDetails}>
                    <span className={styles.ticker}>{position.ticker}</span>
                    <div className={styles.security} title={position.security}>{position.security}</div>
                </div>
                <button className={styles.deleteButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#0"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>
            {showDetails && (
                <div className={styles.details}>
                    {/* Details content goes here */}
                    wfvwfvfwf
                </div>
            )}
        </div>
    );
}