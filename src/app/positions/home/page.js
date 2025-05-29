'use client';

import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Position from '@/app/components/positions/home/Position';
import positionProxy from '@/proxies/position-proxy';
import styles from './page.module.css';

const PAGE_SIZE = 20;

export default function Page() {
	const [positions, setPositions] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [toast, setToast] = useState('');
	const [sortBy, setSortBy] = useState('id');
	const [sortOrder, setSortOrder] = useState('asc');

	const resetSortState = () => {
		setPositions([]);
		setPage(1);
		setHasMore(true);
	};

	const loadNextPage = useCallback(async () => {
		if (!hasMore) return;

		const res = await positionProxy.getAll({ page, limit: PAGE_SIZE, sortBy, order: sortOrder });

		if (res?.data?.length) {
			setPositions((prev) => [...prev, ...res.data]);
			setPage((prev) => prev + 1);

			if (res.data.length < PAGE_SIZE) setHasMore(false);
		} else {
			setHasMore(false);
		}
	}, [page, hasMore, sortBy, sortOrder]);

	useEffect(() => {
		loadNextPage();
	}, [page, sortBy, sortOrder]);

	const handleFieldChange = async (field, value, position) => {
		const updatedPosition = { ...position, [field]: value };
		try {
			await positionProxy.update(updatedPosition);
			setPositions((previousPositions) =>
				previousPositions.map((p) => (p.id === position.id ? updatedPosition : p))
			);
			setToast('Update successful!');
			setTimeout(() => setToast(''), 2000);
		} catch (err) {
			console.error('Failed to update position:', err);
      setToast('Update failed. Please try again.');
      setTimeout(() => setToast(''), 2000);
		}
	};
  
	const handleDelete = async (position) => {
		try {
			await positionProxy.delete(position.id);
			setPositions(previousPositions => previousPositions.filter(p => p.id !== position.id));
			setToast('Position deleted!');
			setTimeout(() => setToast(''), 2000);
		} catch (err) {
			console.error('Failed to delete position:', err);
			setToast('Delete failed. Please try again.');
			setTimeout(() => setToast(''), 2000);
		}
	};

	const handleSortChange = (value) => {
		setSortBy(value);
		resetSortState();
	};

	const handleSortOrderToggle = () => {
		setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		resetSortState();
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
      <div className={styles.sortFilterRow}>
        <div className={styles.sortContainer}>
          <span className={styles.sortLabel}>Sort by:</span>
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
						onFieldChange={handleFieldChange}
						onDelete={handleDelete}
					/>
				))}
			</InfiniteScroll>
		</>
	);
}
