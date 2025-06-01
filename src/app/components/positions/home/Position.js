'use client'

import { useState } from 'react';
import styles from './Position.module.css';

export default function Position({ position, onUpdate, onDelete }) {
    const [showDetails, setShowDetails] = useState(false);
    const [pendingUpdate, setPendingUpdate] = useState({});

    const handleToggleDetails = () => {
        setShowDetails(prev => {
            if (prev) setPendingUpdate({});
            return !prev;
        });
    };

    const handleChange = (field, value) => {
        // Allow undefined for all fields except size, type, entryPrice
        if (["size", "type", "entryPrice"].includes(field) && value === undefined) {
            return;
        }
        setPendingUpdate(previousFields => ({ ...previousFields, [field]: value }));
    };

    const handleUpdate = () => {
        onUpdate({ ...position, ...pendingUpdate }, position);
        setPendingUpdate({});
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
                    <span className={styles.ticker}>
                        {position.ticker}
                        <span
                            className={`${styles.riskIndicator} ${
                                position.risk === 'low'
                                    ? styles.riskIndicatorLow
                                    : position.risk === 'medium'
                                    ? styles.riskIndicatorMedium
                                    : position.risk === 'high'
                                    ? styles.riskIndicatorHigh
                                    : ''
                            }`}
                            title={ position.risk ? `${position.risk.charAt(0).toUpperCase() + position.risk.slice(1)} risk` : '' }
                        />
                    </span>
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
                        <select className={styles.input} value={pendingUpdate.type ?? position.type} onChange={e => handleChange('type', e.target.value)}>
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                        </select>
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Position size</span>
                        <input className={styles.input} type="number" value={pendingUpdate.size ?? position.size ?? ''} onChange={e => handleChange('size', e.target.value === '' ? undefined : Number(e.target.value))} />
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Entry price</span>
                        <input className={styles.input} type="number" value={pendingUpdate.entryPrice ?? position.entryPrice ?? ''} onChange={e => handleChange('entryPrice', e.target.value === '' ? undefined : Number(e.target.value))} />
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Exit price</span>
                        <input className={styles.input} type="number" value={('exitPrice' in pendingUpdate) ? (pendingUpdate.exitPrice === undefined ? '' : pendingUpdate.exitPrice) : (position.exitPrice ?? '')} onChange={e => handleChange('exitPrice', e.target.value === '' ? undefined : Number(e.target.value))} />
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Stop loss</span>
                        <input className={styles.input} type="number" value={('stopLoss' in pendingUpdate) ? (pendingUpdate.stopLoss === undefined ? '' : pendingUpdate.stopLoss) : (position.stopLoss ?? '')} onChange={e => handleChange('stopLoss', e.target.value === '' ? undefined : Number(e.target.value))} />
                    </div>
                    <div className={styles.updateButtonRow}>
                        <button className={styles.updateButton} onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            )}
        </div>
    );
}