"use client"

import * as React from "react"

const Chart = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className={className} ref={ref} {...props} />,
)
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { padding?: { left?: number; bottom?: number; right?: number; top?: number } }
>(({ className, padding, ...props }, ref) => (
  <div
    className={className}
    ref={ref}
    style={{
      paddingLeft: padding?.left,
      paddingBottom: padding?.bottom,
      paddingRight: padding?.right,
      paddingTop: padding?.top,
    }}
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className={className} ref={ref} {...props} />,
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, content, ...props }, ref) => (
    <div className={className} ref={ref} {...props}>
      {content}
    </div>
  ),
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartBarItem = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className={className} ref={ref} {...props} />,
)
ChartBarItem.displayName = "ChartBarItem"

const ChartBarStack = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className={className} ref={ref} {...props} />,
)
ChartBarStack.displayName = "ChartBarStack"

const ChartAxis = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, position, ...props }, ref) => (
    <div className={className} ref={ref} data-position={position} {...props} />
  ),
)
ChartAxis.displayName = "ChartAxis"

const ChartAxisLabel = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className={className} ref={ref} {...props} />,
)
ChartAxisLabel.displayName = "ChartAxisLabel"

const ChartGrid = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { horizontal?: boolean; vertical?: boolean }
>(({ className, horizontal, vertical, ...props }, ref) => (
  <div className={className} ref={ref} data-horizontal={horizontal} data-vertical={vertical} {...props} />
))
ChartGrid.displayName = "ChartGrid"

const ChartLine = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className={className} ref={ref} {...props} />,
)
ChartLine.displayName = "ChartLine"

export {
  Chart,
  ChartBarItem,
  ChartBarStack,
  ChartAxis,
  ChartAxisLabel,
  ChartGrid,
  ChartLine,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
}

