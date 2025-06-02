'use client'

import positionProxy from '@/proxies/position-proxy';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Page() {
    const [longCount, setLongCount] = useState(0);
    const [shortCount, setShortCount] = useState(0);
    const [stopLossCount, setStopLossCount] = useState(0);
    const [noStopLossCount, setNoStopLossCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const positions = await positionProxy.getAll({});
                const longPositions = positions.data.filter(pos => pos.type === 'long');
                const shortPositions = positions.data.filter(pos => pos.type === 'short');
                const stopLossPositions = positions.data.filter(pos => pos.stopLoss !== undefined);
                const noStopLossPositions = positions.data.filter(pos => pos.stopLoss === undefined);

                setLongCount(longPositions.length);
                setShortCount(shortPositions.length);
                setStopLossCount(stopLossPositions.length);
                setNoStopLossCount(noStopLossPositions.length);
            } catch (error) {
                console.error('Failed to fetch positions:', error);
            }
        };

        fetchCounts();
    }, []);

    const totalCount = longCount + shortCount;
    const longWidth = (longCount / totalCount) * 100;
    const shortWidth = (shortCount / totalCount) * 100;

    const totalStopLossCount = stopLossCount + noStopLossCount;
    const stopLossWidth = (stopLossCount / totalStopLossCount) * 100;
    const noStopLossWidth = (noStopLossCount / totalStopLossCount) * 100;

    return (
    <>
        <h2 className={styles.statisticsTitle}>Statistics</h2>
        <div className={styles.horizontalSingleBarChartHeader}>
            <span>Long</span>
            <span>Short</span>
        </div>
        <div className={styles.horizontalSingleBarChart}>
            <div
                style={{ width: `${longWidth}%`, backgroundColor: 'var(--horizontal-single-bar-chart-type-long-color)' }}
                title={`${longWidth.toFixed(2)}%`}
            ></div>
            <div
                style={{ width: `${shortWidth}%`, backgroundColor: 'var(--risk-high)' }}
                title={`${shortWidth.toFixed(2)}%`}
            ></div>
        </div>

        <div className={styles.horizontalSingleBarChartHeader}>
            <span>With Stop Loss</span>
            <span>Without Stop Loss</span>
        </div>
        <div className={styles.horizontalSingleBarChart}>
            <div
                style={{ width: `${stopLossWidth}%`, backgroundColor: 'var(--risk-low)' }}
                title={`${stopLossWidth.toFixed(2)}%`}
            ></div>
            <div
                style={{ width: `${noStopLossWidth}%`, backgroundColor: 'var(--risk-high)' }}
                title={`${noStopLossWidth.toFixed(2)}%`}
            ></div>
        </div>
    </>);
}