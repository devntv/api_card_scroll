import { useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useInfiniteScroll = (
  callback?: () => void,
  options?: IntersectionObserverOptions
) => {
  const observerRef = useRef<IntersectionObserver>();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: options?.threshold || 1,
      rootMargin: options?.rootMargin || "0px",
      root: options?.root || null,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    }, observerOptions);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);

  useEffect(() => {
    if (isIntersecting && callback) {
      callback();
    }
  }, [callback, isIntersecting]);

  const ob = (element: Element | null) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element);
    }
  };

  return ob;
};

export default useInfiniteScroll;
