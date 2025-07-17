'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import Position from '@/components/positions/home/Position';
import AddMenu from '@/components/positions/home/AddMenu';
import positionProxy from '@/proxies/position-proxy';
import styles from './page.module.css';

const PAGE_SIZE = 20;

export default function Page() {
	const params = useParams();
	const strategyId = Number(params.id);
	const pageRef = useRef(1);
	const reloadIdRef = useRef(0);
	const [shouldRecomputeRisks, setShouldRecomputeRisks] = useState(false);
	const [positions, setPositions] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [toast, setToast] = useState('');
	const [sortBy, setSortBy] = useState('id');
	const [sortOrder, setSortOrder] = useState('asc');
	const [typeFilter, setTypeFilter] = useState('all');
	const [hasStopLossFilter, setHasStopLossFilter] = useState(false);
	const [addMenu, setAddMenu] = useState(false);

	const recomputeRisks = async () => {
		if (!positions.length) return;
		const ids = positions.map(position => position.id);

		const pastReloadId = reloadIdRef.current;

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
			console.error('Failed to update risks:', error);
			setToast('Failed to fetch risks. Please try again.');
			setTimeout(() => setToast(''), 2000);
		}
	};

	const loadNextPage = useCallback(async () => {
		const pastReloadId = reloadIdRef.current;

		const filters = {};
		if (typeFilter !== 'all') filters.type = typeFilter;
		if (hasStopLossFilter) filters.stopLoss = true;

		try {
			const newPositions = await positionProxy.getAll({ strategyId, page: pageRef.current, limit: PAGE_SIZE, sortBy, order: sortOrder, filters });
			if (pastReloadId !== reloadIdRef.current) return;

			setPositions(prev => [...prev, ...newPositions.data]);

			pageRef.current += 1;

			if (newPositions.data.length < PAGE_SIZE) setHasMore(false);
			else setHasMore(true);

		} catch (error) {
			console.error('Failed to load positions:', error);
			setToast('Failed to load positions. Please try again.');
			setTimeout(() => setToast(''), 2000);
		}

	}, [sortBy, sortOrder, typeFilter, hasStopLossFilter]);

	const reset = () => {
		setPositions([]);
		pageRef.current = 1;
		reloadIdRef.current += 1;
	};

	useEffect(() => {
		reset();
		loadNextPage();
	}, [sortBy, sortOrder, typeFilter, hasStopLossFilter]);

	useEffect(() => {
		if (shouldRecomputeRisks) {
			recomputeRisks();
			setShouldRecomputeRisks(false);
		}
	}, [shouldRecomputeRisks]);

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
				reset();
				loadNextPage();
			} else {
				setPositions(previousPositions => previousPositions.map(position => (position.id === updatedPosition.id ? updatedPosition : position)));
				setShouldRecomputeRisks(true);
			}
			setToast('Position updated successfully!');
			setTimeout(() => setToast(''), 2000);
		} catch (error) {
			console.error('Failed to update position:', error);
			setToast('Update failed. Please try again.');
			setTimeout(() => setToast(''), 2000);
			throw error; // Re-throw to let the component handle it
		}
	};

	const handleDelete = async (position) => {
		try {
			await positionProxy.delete(position.id);
			setPositions((previousPositions) => previousPositions.filter(p => p.id !== position.id));
			setShouldRecomputeRisks(true);
			setToast('Position deleted!');
			setTimeout(() => setToast(''), 2000);
		} catch (error) {
			console.error('Failed to delete position:', error);
			setToast('Delete failed. Please try again.');
			setTimeout(() => setToast(''), 2000);
		}
	};

	const handleAdd = async (newPosition) => {
		try {
			await positionProxy.add(newPosition);
			reset();
			loadNextPage();
			setToast('Position added successfully!');
			setTimeout(() => setToast(''), 2000);
			setAddMenu(false);
		} catch (error) {
			console.error('Failed to add position:', error);
			setToast('Failed to add position. Please try again.');
			setTimeout(() => setToast(''), 2000);
			throw error; // Re-throw to let the component handle it
		}
	};

	const handleSortChange = (value) => {
		if (value !== sortBy) {
			setSortBy(value);
			reset();
		}
	};

	const handleSortOrderToggle = () => {
		setSortOrder(previousSortOrder => (previousSortOrder === 'asc' ? 'desc' : 'asc'));
		reset();
	};

	const handleFilterChange = (filterType, value) => {
		if (filterType === 'type' && value !== typeFilter) {
			setTypeFilter(value);
			reset();
		} else if (filterType === 'stopLoss' && value !== hasStopLossFilter) {
			setHasStopLossFilter(value);
			reset();
		}
	};

	const handleAddButtonClick = () => {
		setAddMenu(true);
	};

	return (
		<>
			{toast && (
				<div className={styles.toast}>
					{toast}
				</div>
			)}
			{addMenu && <AddMenu onClose={() => setAddMenu(false)} onAdd={handleAdd} strategyId={strategyId} />}
      <div className={styles.positionsHeader}>
        <h1>Positions</h1>
		<button className={styles.addButton} onClick={handleAddButtonClick}>
			<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
			<span>Add</span>
		</button>
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
			aria-label="Sort by"
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
