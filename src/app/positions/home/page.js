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

	const loadNextPage = useCallback(async () => {
		if (!hasMore) return;

		const res = await positionProxy.getAll({ page, limit: PAGE_SIZE });

		if (res?.data?.length) {
			setPositions((prev) => [...prev, ...res.data]);
			setPage((prev) => prev + 1);

			if (res.data.length < PAGE_SIZE) setHasMore(false);
		} else {
			setHasMore(false);
		}
	}, [page, hasMore]);

	useEffect(() => {
		loadNextPage();
	}, []);

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
	const handleDelete = async () => {
		//
	};

	return (
		<>
			{toast && (
				<div className={styles.toast}>
					{toast}
				</div>
			)}
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
