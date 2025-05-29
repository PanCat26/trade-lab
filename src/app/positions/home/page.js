'use client';

import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Position from '@/app/components/positions/home/Position';
import positionProxy from '@/proxies/position-proxy';

const PAGE_SIZE = 20;

export default function Page() {
  const [positions, setPositions] = useState([]);
  const [page, setPage]       = useState(1);   // page to request next
  const [hasMore, setHasMore] = useState(true);

  /** ONE function that always loads “the next page” */
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

  /* initial fetch – just call the same function once */
  useEffect(() => {
    loadNextPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // safe: loadNextPage is guaranteed fresh on first render

  const handleFieldChange = () => {};
  const handleDelete      = () => {};

  return (
    <InfiniteScroll
      dataLength={positions.length}
      next={loadNextPage}   // ← same function reused
      hasMore={hasMore}
      loader={null}         // seamless
      scrollThreshold={0.7} // pre-fetch early
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
