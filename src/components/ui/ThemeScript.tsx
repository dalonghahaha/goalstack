"use client";

import Script from "next/script";

/**
 * ThemeScript - 防止 SSR 闪烁的主题切换脚本
 *
 * 该组件在页面加载早期执行，读取 localStorage 中的主题偏好，
 * 并在 DOM 完全渲染前设置根元素的 class，避免主题闪烁问题。
 */
export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('theme-storage');
        if (theme) {
          var parsed = JSON.parse(theme);
          if (parsed.state && parsed.state.theme) {
            document.documentElement.classList.add(parsed.state.theme);
          }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.add('light');
        }
      } catch (e) {
        document.documentElement.classList.add('light');
      }
    })();
  `;

  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}