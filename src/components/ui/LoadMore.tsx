"use client";

import { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface LoadMoreProps {
  /** 是否正在加载 */
  loading: boolean;
  /** 是否还有更多数据可以加载 */
  hasMore: boolean;
  /** 加载更多的回调（点击或触底时触发） */
  onLoadMore: () => void;
  /** 加载模式：click-点击加载，intersect-触底自动加载，默认为 click */
  mode?: "click" | "intersect";
  /** 触底自动加载时的阈值 */
  threshold?: number;
  /** "没有更多数据"时的提示文本 */
  endText?: string;
  /** 加载中的提示文本 */
  loadingText?: string;
  /** 加载按钮的文字 */
  buttonText?: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 加载更多组件
 * 支持点击加载和触底自动加载两种模式
 */
export function LoadMore({
  loading,
  hasMore,
  onLoadMore,
  mode = "click",
  threshold = 0,
  endText = "没有更多数据了",
  loadingText = "加载中...",
  buttonText = "加载更多",
  className = "",
}: LoadMoreProps) {
  // 使用触底检测 Hook（仅在 intersect 模式下）
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin: "100px",
    immediate: false,
  });

  // 触底自动加载
  useEffect(() => {
    if (mode === "intersect" && isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore, mode]);

  // 加载中状态
  if (loading) {
    return (
      <div className={`flex justify-center py-4 ${className}`}>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>{loadingText}</span>
        </div>
      </div>
    );
  }

  // 没有更多数据
  if (!hasMore) {
    return (
      <div className={`flex justify-center py-4 ${className}`}>
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {endText}
        </span>
      </div>
    );
  }

  // 点击加载模式
  if (mode === "click") {
    return (
      <div className={`flex justify-center py-4 ${className}`}>
        <button
          onClick={onLoadMore}
          className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium
                     hover:bg-blue-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {buttonText}
        </button>
      </div>
    );
  }

  // 触底加载模式 - 使用 ref 元素作为触发点
  return (
    <div ref={ref} className={`flex justify-center py-4 ${className}`}>
      <span className="text-gray-400 dark:text-gray-500 text-sm">
        下拉加载更多...
      </span>
    </div>
  );
}

export default LoadMore;