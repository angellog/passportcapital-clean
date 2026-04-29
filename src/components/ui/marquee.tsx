import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn("group flex gap-12 overflow-hidden", className)}
      style={
        {
          "--duration": `${speed}s`,
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-12 animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          direction === "right" && "[animation-direction:reverse]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
