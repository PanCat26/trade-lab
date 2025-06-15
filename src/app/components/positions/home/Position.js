'use client'

import { useState } from 'react';
import { BasePositionSchema } from '@/validation/position-schema';
import styles from './Position.module.css';

export default function Position({ position, onUpdate, onDelete }) {
    const [showDetails, setShowDetails] = useState(false);
    const [pendingUpdate, setPendingUpdate] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});

    const handleToggleDetails = () => {
        setShowDetails(prev => {
            if (prev) setPendingUpdate({});
            return !prev;
        });
    };

    const validateField = (field, value) => {
        const schema = BasePositionSchema.shape[field];
        if (!schema) return;

        const result = schema.safeParse(value);
        setFieldErrors(prevErrors => ({
            ...prevErrors,
            [field]: result.success ? undefined : result.error.errors[0].message
        }));
    };

    const handleChange = (field, value) => {
        validateField(field, value);
        setPendingUpdate(previousFields => ({ ...previousFields, [field]: value }));
    };

    const handleUpdate = () => {
        onUpdate({ ...position, ...pendingUpdate }, position);
        setPendingUpdate({});
    };

    const handleDelete = () => {
        onDelete(position);
    };

    return (
        <div className={styles.position}>
            <div className={styles.titleRow}>
                <div className={styles.titleText} onClick={handleToggleDetails} aria-label={`Toggle details for position for ${position.security}`}>
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
                <button className={styles.deleteButton} onClick={handleDelete} aria-label={`Delete position for ${position.security}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#0"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>
            {showDetails && (
                <div className={styles.data}>
                    <div className={styles.detailsHeader}>Details</div>
                    <div className={styles.detailsRow}>
                        <span>Position type</span>
                        <select
                            className={styles.input}
                            value={pendingUpdate.type ?? position.type}
                            onChange={e => handleChange('type', e.target.value)}
                            style={{ borderColor: fieldErrors.type ? 'var(--risk-high)' : '' }}
                        >
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                        </select>
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Position size</span>
                        <div className={styles.inputContainer}>
                            {fieldErrors.size && (
                                <span title={fieldErrors.size}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#D32F2F"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                </span>
                            )}
                            <input
                                className={styles.input}
                                type="number"
                                value={('size' in pendingUpdate ? pendingUpdate.size ?? '' : position.size ?? '')}
                                onChange={e => handleChange('size', e.target.value === '' ? undefined : Number(e.target.value))}
                                style={{ borderColor: fieldErrors.size ? 'var(--risk-high)' : '' }}
                            />
                        </div>
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Entry price</span>
                        <div className={styles.inputContainer}>
                            {fieldErrors.entryPrice && (
                                <span className={styles.errorTooltip} title={fieldErrors.entryPrice}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#D32F2F"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                </span>
                            )}
                            <input
                                className={styles.input}
                                type="number"
                                value={('entryPrice' in pendingUpdate ? pendingUpdate.entryPrice ?? '' : position.entryPrice ?? '')}
                                onChange={e => handleChange('entryPrice', e.target.value === '' ? undefined : Number(e.target.value))}
                                style={{ borderColor: fieldErrors.entryPrice ? 'var(--risk-high)' : '' }}
                            />
                        </div>
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Exit price</span>
                        <div className={styles.inputContainer}>
                            {fieldErrors.exitPrice && (
                                <span className={styles.errorTooltip} title={fieldErrors.exitPrice}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#D32F2F"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                </span>
                            )}
                            <input
                                className={styles.input}
                                type="number"
                                value={('exitPrice' in pendingUpdate) ? (pendingUpdate.exitPrice === undefined ? '' : pendingUpdate.exitPrice) : (position.exitPrice ?? '')}
                                onChange={e => handleChange('exitPrice', e.target.value === '' ? undefined : Number(e.target.value))}
                                style={{ borderColor: fieldErrors.exitPrice ? 'var(--risk-high)' : '' }}
                            />
                        </div>
                    </div>
                    <div className={styles.detailsRow}>
                        <span>Stop loss</span>
                        <div className={styles.inputContainer}>
                            {fieldErrors.stopLoss && (
                                <span className={styles.errorTooltip} title={fieldErrors.stopLoss}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#D32F2F"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                                </span>
                            )}
                            <input
                                className={styles.input}
                                type="number"
                                value={('stopLoss' in pendingUpdate) ? (pendingUpdate.stopLoss === undefined ? '' : pendingUpdate.stopLoss) : (position.stopLoss ?? '')}
                                onChange={e => handleChange('stopLoss', e.target.value === '' ? undefined : Number(e.target.value))}
                                style={{ borderColor: fieldErrors.stopLoss ? 'var(--risk-high)' : '' }}
                            />
                        </div>
                    </div>
                    <div className={styles.updateButtonRow}>
                        <button className={styles.updateButton} onClick={handleUpdate} aria-label={`Update position for ${position.security}`}>Update</button>
                    </div>
                </div>
            )}
        </div>
    );
}