import * as React from "react"
import { cn } from "@/lib/utils" // pastikan kamu punya helper `cn`, atau bisa dihapus jika tidak ada

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-200", className)}
        {...props}
      >
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
