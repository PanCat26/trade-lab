'use client'

import styles from './AddMenu.module.css';
import { useState } from 'react';
import Select from 'react-select';
import usSecurities from '@/data/seed/us-securities.json';

const options = usSecurities.map(({ security, ticker }) => ({
    label: security,
    value: JSON.stringify({ security, ticker }),
}));

export default function AddMenu({ onAdd, onClose }) {
    const [newPosition, setNewPosition] = useState({});

    const handleAdd = () => {

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
                    <input
                        type="number"
                        value={newPosition.size || ''}
                        onChange={(e) => setNewPosition({ ...newPosition, size: e.target.value === '' ? undefined : Number(e.target.value) })}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputRow}>
                    <span>Entry price</span>
                    <input
                        type="number"
                        value={newPosition.entryPrice || ''}
                        onChange={(e) => setNewPosition({ ...newPosition, entryPrice: e.target.value === '' ? undefined : Number(e.target.value) })}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputRow}>
                    <span>Exit price</span>
                    <input
                        type="number"
                        value={newPosition.exitPrice || ''}
                        onChange={(e) => setNewPosition({ ...newPosition, exitPrice: e.target.value === '' ? undefined : Number(e.target.value) })}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputRow}>
                    <span>Stop loss</span>
                    <input
                        type="number"
                        value={newPosition.stopLoss || ''}
                        onChange={(e) => setNewPosition({ ...newPosition, stopLoss: e.target.value === '' ? undefined : Number(e.target.value) })}
                        className={styles.input}
                    />
                </div>
                <button className={styles.addButton} onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
}