function useIntersectionObserver(fetchNextPage: () => void) {
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => entry.isIntersecting && fetchNextPage());
  };

  const createObserver = (target: HTMLDivElement) => {
    const options = { threshold: 1.0 };

    const observer = new IntersectionObserver(handleIntersect, options);

    observer.observe(target);
  };

  return createObserver;
}

export default useIntersectionObserver;
