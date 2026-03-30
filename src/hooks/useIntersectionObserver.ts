import { useState, useEffect, useRef, RefObject } from "react";

interface UseIntersectionObserverOptions {
  /** 触发观察的阈值，0-1 之间的数字或数字数组 */
  threshold?: number | number[];
  /** 根元素的边距，格式同 CSS margin */
  rootMargin?: string;
  /** 是否在初始时立即观察 */
  immediate?: boolean;
}

interface UseIntersectionObserverResult {
  /** 绑定到目标元素的 ref */
  ref: RefObject<HTMLDivElement | null>;
  /** 元素是否进入视口 */
  isIntersecting: boolean;
  /** 观察器实例（可选，用于手动控制） */
  observer: IntersectionObserver | null;
}

/**
 * 触底检测 Hook
 * 使用 Intersection Observer API 检测元素是否进入视口
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverResult {
  const { threshold = 0, rootMargin = "0px", immediate = false } = options;

  const [isIntersecting, setIsIntersecting] = useState(immediate);
  const ref = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 创建观察器
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      {
        threshold: Array.isArray(threshold) ? threshold : [threshold],
        rootMargin,
      }
    );

    // 开始观察
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin]);

  return {
    ref,
    isIntersecting,
    observer: observerRef.current,
  };
}

export default useIntersectionObserver;