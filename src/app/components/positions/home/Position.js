'use client'

import { useState } from 'react';
import styles from './Position.module.css';

export default function Position({ position, onFieldChange, onDelete }) {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggleDetails = () => setShowDetails((prev) => !prev);

    const handleChange = (field, value) => {
        if (onFieldChange) {
            onFieldChange(field, value, position);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(position);
        }
    };

    return (
        <div className={styles.position}>
            <div className={styles.titleRow}>
                <div className={styles.titleText} onClick={handleToggleDetails}>
                    <span className={styles.ticker}>{position.ticker}</span>
                    <div className={styles.security} title={position.security}>{position.security}</div>
                </div>
                <button className={styles.deleteButton} onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#0"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>
            {showDetails && (
                <div className={styles.data}>
                    <div className={styles.detailsHeader}>Details</div>
                    <div className={styles.detailsRow}>
                        <span>Position type</span>
                        <select className={styles.input} value={position.type} onChange={e => handleChange('type', e.target.value)}>
                            <option value="Long">Long</option>
                            <option value="Short">Short</option>
                        </select>
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Position size</span>
                        <input className={styles.input} type="number" value={position.size} onChange={e => handleChange('size', e.target.value === '' ? null : Number(e.target.value))} />
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Entry price</span>
                        <input className={styles.input} type="number" value={position.entryPrice} onChange={e => handleChange('entryPrice', e.target.value === '' ? null : Number(e.target.value))} />
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Exit price</span>
                        <input className={styles.input} type="number" value={position.exitPrice} onChange={e => handleChange('exitPrice', e.target.value === '' ? null : Number(e.target.value))} />
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Stop loss</span>
                        <input className={styles.input} type="number" value={position.stopLoss} onChange={e => handleChange('stopLoss', e.target.value === '' ? null : Number(e.target.value))} />
                    </div>
                </div>
            )}
        </div>
    );
}