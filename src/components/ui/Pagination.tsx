"use client";

import { useMemo } from "react";

interface PaginationProps {
  /** 当前页码（从 1 开始） */
  currentPage: number;
  /** 总页数 */
  totalPages: number;
  /** 页码变化回调 */
  onPageChange: (page: number) => void;
  /** 显示的最大页码数量，默认为 5 */
  maxVisiblePages?: number;
  /** 是否显示首页/末页按钮，默认为 true */
  showFirstLast?: boolean;
  /** 自定义类名 */
  className?: string;
}

/**
 * 分页组件
 * 支持 PC 端显示完整的分页导航
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = true,
  className = "",
}: PaginationProps) {
  // 计算可见的页码范围
  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    // 调整边界
    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    }
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages, maxVisiblePages]);

  // 是否有上一页
  const hasPrev = currentPage > 1;
  // 是否有下一页
  const hasNext = currentPage < totalPages;

  // 跳转到指定页
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // 禁用状态样式
  const disabledStyle = "opacity-50 cursor-not-allowed pointer-events-none";
  // 按钮基础样式
  const baseButtonStyle =
    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200";
  // 普通页码样式
  const pageStyle = `${baseButtonStyle} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`;
  // 当前页样式
  const activeStyle = `${baseButtonStyle} bg-blue-600 text-white hover:bg-blue-700`;

  // 如果总页数为 0 或 1，不显示分页
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={`flex items-center justify-center gap-1 ${className}`}
      aria-label="分页导航"
    >
      {/* 首页按钮 */}
      {showFirstLast && (
        <button
          onClick={() => handlePageClick(1)}
          disabled={!hasPrev}
          className={`${baseButtonStyle} ${!hasPrev ? disabledStyle : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
          aria-label="首页"
        >
          首页
        </button>
      )}

      {/* 上一页按钮 */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={!hasPrev}
        className={`${baseButtonStyle} ${!hasPrev ? disabledStyle : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
        aria-label="上一页"
      >
        上一页
      </button>

      {/* 页码列表 */}
      <div className="flex items-center gap-1">
        {/* 省略号（前面） */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className={pageStyle}
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-1 text-gray-500 dark:text-gray-400">...</span>
            )}
          </>
        )}

        {/* 可见页码 */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={page === currentPage ? activeStyle : pageStyle}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {/* 省略号（后面） */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-1 text-gray-500 dark:text-gray-400">...</span>
            )}
            <button
              onClick={() => handlePageClick(totalPages)}
              className={pageStyle}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* 下一页按钮 */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={!hasNext}
        className={`${baseButtonStyle} ${!hasNext ? disabledStyle : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
        aria-label="下一页"
      >
        下一页
      </button>

      {/* 末页按钮 */}
      {showFirstLast && (
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={!hasNext}
          className={`${baseButtonStyle} ${!hasNext ? disabledStyle : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
          aria-label="末页"
        >
          末页
        </button>
      )}
    </nav>
  );
}

export default Pagination;