'use client';

import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Position from '@/app/components/positions/home/Position';
import positionProxy from '@/proxies/position-proxy';

const PAGE_SIZE = 20;

export default function Page() {
  const [positions, setPositions] = useState([]);
  const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const loadNextPage = useCallback(async () => {
		if (!hasMore) return;

		const res = await positionProxy.getAll({ page, limit: PAGE_SIZE });

		if (res?.data?.length) {
			setPositions(prev => [...prev, ...res.data]);
			setPage(prev => prev + 1);

			if (res.data.length < PAGE_SIZE) setHasMore(false);
		} else {
			setHasMore(false);
		}
	}, [page, hasMore]);

	useEffect(() => {
		loadNextPage();
	}, []);

	const handleFieldChange = async () => {
		//
	};
	const handleDelete = async () => {
		//
	};

	return (
		<InfiniteScroll
			dataLength={positions.length}
			next={loadNextPage}
			hasMore={hasMore}
			loader={null}
			scrollThreshold={0.7}
			scrollableTarget="scrollableContainer"
		>
			{positions.map(pos => (
				<Position
					key={pos.id}
					position={pos}
					onFieldChange={handleFieldChange}
					onDelete={handleDelete}
				/>
			))}
		</InfiniteScroll>
	);
}
