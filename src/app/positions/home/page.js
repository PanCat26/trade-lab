'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Position from '@/app/components/positions/home/Position';
import positionProxy from '@/proxies/position-proxy';
import styles from './page.module.css';

const PAGE_SIZE = 20;

export default function Page() {
	const pageRef = useRef(1);
	const reloadIdRef = useRef(0);
	const [positions, setPositions] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [toast, setToast] = useState('');
	const [sortBy, setSortBy] = useState('id');
	const [sortOrder, setSortOrder] = useState('asc');
	const [typeFilter, setTypeFilter] = useState('all');
	const [hasStopLossFilter, setHasStopLossFilter] = useState(false);

	const recomputeRisks = (positions) => {
		if (!positions.length) return;
		const ids = positions.map(position => position.id);

		const pastReloadId = reloadIdRef.current;

		(async () => {
			try {
				const risks = await positionProxy.getRisksByIds(ids);
				if (pastReloadId !== reloadIdRef.current) return;

				const riskMap = {};
				risks.forEach(({id, risk}) => { riskMap[id] = risk; });
				setPositions(previousPositions => previousPositions.map(position => {
					if (riskMap.hasOwnProperty(position.id)) {
						return { ...position, risk: riskMap[position.id] };
					}
					return position;
				}));
			} catch (error) {
				console.error('Failed to fetch risks:', error);
				setToast('Failed to fetch risks. Please try again.');
				setTimeout(() => setToast(''), 2000);
			}
		})();
	};

	const loadNextPage = useCallback(async () => {
		if (!hasMore) return;

		const filters = {};
		if (typeFilter !== 'all') filters.type = typeFilter;
		if (hasStopLossFilter) filters.stopLoss = true;

		console.log('on client', filters);

		try {
			const newPositions = await positionProxy.getAll({ page: pageRef.current, limit: PAGE_SIZE, sortBy, order: sortOrder, filters });

			if (pageRef.current === 1) {
				reloadIdRef.current += 1;
			}

			if (newPositions.data.length) {
				setPositions(prev => [...prev, ...newPositions.data]);
				pageRef.current += 1;
				if (newPositions.data.length < PAGE_SIZE) setHasMore(false);
				else setHasMore(true);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error('Failed to load positions:', error);
			setToast('Failed to load positions. Please try again.');
			setTimeout(() => setToast(''), 2000);
			setHasMore(false);
		}

	}, [hasMore, sortBy, sortOrder, typeFilter, hasStopLossFilter]);

	useEffect(() => {
		setPositions([]);
		setHasMore(true);
		pageRef.current = 1;
		loadNextPage();
	}, [sortBy, sortOrder, typeFilter, hasStopLossFilter]);

	const handleUpdate = async (updatedPosition, originalPosition) => {
		try {
			await positionProxy.update(updatedPosition);
			
			// Check if update affects filters/sort
			const isFilteredOutByType =
				typeFilter !== 'all' && updatedPosition.type !== typeFilter;
			const hasStopLossSet = updatedPosition.stopLoss !== undefined;
			const isFilteredOutByStopLoss = hasStopLossFilter && !hasStopLossSet;
			const isMovedBySort = sortBy !== 'id' && sortBy in updatedPosition && originalPosition[sortBy] !== updatedPosition[sortBy];

			if (isFilteredOutByType || isFilteredOutByStopLoss || isMovedBySort) {
				setPositions([]);
				setHasMore(true);
				pageRef.current = 1;
				loadNextPage();
			} else {
				setPositions((previousPositions) => {
					const newPositions = previousPositions.map(position => (position.id === updatedPosition.id ? updatedPosition : position));
					recomputeRisks(newPositions);
					return newPositions;
				});
			}
			setToast('Update successful!');
			setTimeout(() => setToast(''), 2000);
		} catch (error) {
			console.error('Failed to update position:', error);
			setToast('Update failed. Please try again.');
			setTimeout(() => setToast(''), 2000);
		}
	};

	const handleDelete = async (position) => {
		try {
			await positionProxy.delete(position.id);
			setPositions((previousPositions) => {
				const newPositions = previousPositions.filter(p => p.id !== position.id);
				recomputeRisks(newPositions);
				return newPositions;
			});
			setToast('Position deleted!');
			setTimeout(() => setToast(''), 2000);
		} catch (error) {
			console.error('Failed to delete position:', error);
			setToast('Delete failed. Please try again.');
			setTimeout(() => setToast(''), 2000);
		}
	};

	const handleSortChange = (value) => {
		setSortBy(value);
	};

	const handleSortOrderToggle = () => {
		setSortOrder(previousSortOrder => (previousSortOrder === 'asc' ? 'desc' : 'asc'));
	};

	const handleFilterChange = (filterType, value) => {
		if (filterType === 'type') {
			setTypeFilter(value);
		} else if (filterType === 'stopLoss') {
			setHasStopLossFilter(value);
		}
	};

	return (
		<>
			{toast && (
				<div className={styles.toast}>
					{toast}
				</div>
			)}
      <div className={styles.positionsHeader}>
        <h1>Positions</h1>
      </div>
      <div className={styles.sortFilterMenu}>
        <div className={styles.sortFilterToolbar}>
          <span className={styles.sortFilterOptionLabel}>Sort by:</span>
          {sortBy !== 'id' && (
            <button
              onClick={handleSortOrderToggle}
              className={styles.sortButton}
            >
              {sortOrder === 'asc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>
              )}
            </button>
          )}
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={e => handleSortChange(e.target.value)}
          >
            <option value="id">Default</option>
            <option value="size">Position size</option>
          </select>
        </div>
        <div className={styles.sortFilterToolbar}>
          <span className={styles.sortFilterOptionLabel}>Type:</span>
          <input
            type="radio"
            id="type-all"
            name="typeFilter"
            value="all"
            checked={typeFilter === 'all'}
            onChange={() => handleFilterChange('type', 'all')}
          />
          <label className={styles.radioLabel} htmlFor="type-all">All</label>
          <input
            type="radio"
            id="type-long"
            name="typeFilter"
            value="long"
            checked={typeFilter === 'long'}
            onChange={() => handleFilterChange('type', 'long')}
          />
          <label className={styles.radioLabel} htmlFor="type-long">Long</label>
          <input
            type="radio"
            id="type-short"
            name="typeFilter"
            value="short"
            checked={typeFilter === 'short'}
            onChange={() => handleFilterChange('type', 'short')}
          />
          <label className={styles.radioLabel} htmlFor="type-short">Short</label>
        </div>
        <div className={styles.sortFilterToolbar}>
          <span className={styles.sortFilterOptionLabel}>Stop loss:</span>
          <input
            type="checkbox"
            checked={hasStopLossFilter}
            onChange={e => handleFilterChange('stopLoss', e.target.checked)}
          />
        </div>
      </div>
			<InfiniteScroll
				dataLength={positions.length}
				next={loadNextPage}
				hasMore={hasMore}
				loader={null}
				scrollThreshold={0.7}
				scrollableTarget="scrollableContainer"
			>
				{positions.map((pos) => (
					<Position
						key={pos.id}
						position={pos}
						onUpdate={handleUpdate}
						onDelete={handleDelete}
					/>
				))}
			</InfiniteScroll>
		</>
	);
}
