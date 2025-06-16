'use client'

import styles from './AddMenu.module.css';
import { useState } from 'react';
import Select from 'react-select';
import usSecurities from '@/data/seed/us-securities.json';
import { BasePositionSchema } from '@/validation/position-schema';

const options = usSecurities.map(({ security, ticker }) => ({
    label: security,
    value: JSON.stringify({ security, ticker }),
}));

export default function AddMenu({ onAdd, onClose }) {
    const [newPosition, setNewPosition] = useState({ type: 'long' });
    const [fieldErrors, setFieldErrors] = useState({});
    const [overallErrors, setOverallErrors] = useState([]);

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
        setNewPosition(prev => ({ ...prev, [field]: value }));
    };

    const handleAdd = async () => {
        // Validate required fields before adding
        const validationFields = ['size', 'entryPrice'];
        const newFieldErrors = {};

        validationFields.forEach(field => {
            const schema = BasePositionSchema.shape[field];
            const value = newPosition[field];
            if (schema) {
                const result = schema.safeParse(value);
                if (!result.success) {
                    newFieldErrors[field] = result.error.errors[0].message;
                }
            }
        });

        setFieldErrors(newFieldErrors);

        if (Object.keys(newFieldErrors).length > 0) {
            return;
        }

        try {
            await onAdd(newPosition);
            onClose();
            setNewPosition({});
            setFieldErrors({});
        } catch (error) {
            if (error.type === 'Validation error') {
                setOverallErrors(error.details);
            }
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.titleRow}>
                    <h2 className={styles.title}>New position</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    </button>
                </div>
                <h3 className={styles.subtitle}>Security</h3>
                <Select
                    options={options}
                    placeholder="Select a security"
                    isSearchable
                    className="securitySelect"
                    classNamePrefix="securitySelect"
                    value={
                        newPosition.security && newPosition.ticker
                            ? {
                                label: newPosition.security,
                                value: JSON.stringify({
                                security: newPosition.security,
                                ticker: newPosition.ticker,
                                }),
                            }
                            : null
                    }
                    onChange={(option) => {
                        const parsed = JSON.parse(option.value);
                        setNewPosition({
                            ...newPosition,
                            security: parsed.security,
                            ticker: parsed.ticker,
                        });
                    }}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            border: state.isFocused
                            ? '2px solid black'
                            : '2px solid rgba(0, 0, 0, 0.25)',
                            '&:hover': {
                                border: state.isFocused
                                ? '2px solid black'
                                : '2px solid rgba(0, 0, 0, 0.25)', 
                            },
                            backgroundColor: 'transparent',
                            borderRadius: 0,
                            boxShadow: 'none',
                            fontSize: '14px',
                            fontFamily: 'var(--font-ibm-mono), "Courier New", Courier, monospace',
                            fontWeight: 400,
                        }),
                        dropdownIndicator: (base) => ({
                            ...base,
                            color: 'black',
                        }),
                        singleValue: (base) => ({
                            ...base,
                            textAlign: 'center',
                            width: '100%',
                            fontSize: '14px',
                            fontFamily: 'var(--font-ibm-mono), "Courier New", Courier, monospace',
                            fontWeight: 400,
                        }),
                        input: (base) => ({
                            ...base,
                            textAlign: 'center',
                            fontSize: '14px',
                            fontFamily: 'var(--font-ibm-mono), "Courier New", Courier, monospace',
                            fontWeight: 400,
                        }),
                        valueContainer: (base) => ({
                            ...base,
                            justifyContent: 'center',
                        }),
                        menu: (base) => ({
                            ...base,
                            borderRadius: 0, 
                            marginTop: 0,
                            fontSize: '14px',
                            fontFamily: 'var(--font-ibm-mono), "Courier New", Courier, monospace',
                            fontWeight: 400,
                        }),
                        option: (base, state) => ({
                            ...base,
                            fontSize: '14px',
                            fontFamily: 'var(--font-ibm-mono), "Courier New", Courier, monospace',
                            fontWeight: 400,
                            backgroundColor: state.isFocused ? '#e6f0ff' : 'white',
                            color: 'black',
                        }),
                        placeholder: (base) => ({
                            ...base,
                            fontSize: '14px',
                            fontFamily: 'var(--font-ibm-mono), "Courier New", Courier, monospace',
                            fontWeight: 400,
                            textAlign: 'center',
                        }),
                        noOptionsMessage: (base) => ({
                            ...base,
                            fontSize: '14px',
                            fontFamily: 'var(--font-ibm-mono), "Courier New", Courier, monospace',
                            fontWeight: 400,
                            textAlign: 'center',
                        }),
                    }}
                />

                <h3 className={styles.subtitle}>Details</h3>
                <div className={styles.inputRow}>
                    <span>Position type</span>
                    <select
                        value={newPosition.type || 'long'}
                        onChange={(e) => setNewPosition({ ...newPosition, type: e.target.value })}
                        className={styles.input}
                        >
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                    </select>
                </div>
                <div className={styles.inputRow}>
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
                            value={newPosition.size || ''}
                            onChange={e => handleChange('size', e.target.value === '' ? undefined : Number(e.target.value))}
                            style={{ borderColor: fieldErrors.size ? 'var(--risk-high)' : '' }}
                        />
                    </div>
                </div>
                <div className={styles.inputRow}>
                    <span>Entry price</span>
                    <div className={styles.inputContainer}>
                        {fieldErrors.entryPrice && (
                            <span title={fieldErrors.entryPrice}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#D32F2F"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                            </span>
                        )}
                        <input
                            className={styles.input}
                            type="number"
                            value={newPosition.entryPrice || ''}
                            onChange={e => handleChange('entryPrice', e.target.value === '' ? undefined : Number(e.target.value))}
                            style={{ borderColor: fieldErrors.entryPrice ? 'var(--risk-high)' : '' }}
                        />
                    </div>
                </div>
                <div className={styles.inputRow}>
                    <span>Exit price</span>
                    <div className={styles.inputContainer}>
                        {fieldErrors.exitPrice && (
                            <span title={fieldErrors.exitPrice}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#D32F2F"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                            </span>
                        )}
                        <input
                            className={styles.input}
                            type="number"
                            value={newPosition.exitPrice || ''}
                            onChange={e => handleChange('exitPrice', e.target.value === '' ? undefined : Number(e.target.value))}
                            style={{ borderColor: fieldErrors.exitPrice ? 'var(--risk-high)' : '' }}
                        />
                    </div>
                </div>
                <div className={styles.inputRow}>
                    <span>Stop loss</span>
                    <div className={styles.inputContainer}>
                        {fieldErrors.stopLoss && (
                            <span title={fieldErrors.stopLoss}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#D32F2F"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                            </span>
                        )}
                        <input
                            className={styles.input}
                            type="number"
                            value={newPosition.stopLoss || ''}
                            onChange={e => handleChange('stopLoss', e.target.value === '' ? undefined : Number(e.target.value))}
                            style={{ borderColor: fieldErrors.stopLoss ? 'var(--risk-high)' : '' }}
                        />
                    </div>
                </div>
                <div className={styles.addButtonRow}>
                    <button
                        className={styles.addButton}
                        onClick={handleAdd}
                        disabled={Object.values(fieldErrors).some(error => error)}
                    >
                        Add Position
                    </button>
                    <div className={styles.errorContainer}>
                        {overallErrors.map((error, index) => (
                            <span key={index}>
                                {error}!
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}