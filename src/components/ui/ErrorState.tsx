import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  icon,
  title = "加载失败",
  description = "抱歉，发生了错误，请稍后重试。",
  onRetry,
  className
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      {icon && <div className="mb-4 text-red-500">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4" variant="secondary">
          重新加载
        </Button>
      )}
    </div>
  );
}