import { useCallback, useEffect } from 'react';

const useInfiniteScroll = (bodyRef, bottomLineRef, callback) => {
  const handleScroll = useCallback(() => {
    const containerHeight = bodyRef?.current?.getBoundingClientRect().height;
    const { top: bottomLineTop } =
      bottomLineRef?.current?.getBoundingClientHeight();
    if (containerHeight >= bottomLineTop) {
      callback();
    }
  }, [bodyRef, bottomLineRef, callback]);

  useEffect(() => {
    const bodyRefCurrent = bodyRef?.current;
    bodyRefCurrent?.addEventListener('scroll', handleScroll, true);

    return () => {
      bodyRefCurrent.removeEventListener('scroll', handleScroll, true);
    };
  }, [bodyRef, handleScroll]);
};

export default useInfiniteScroll;
