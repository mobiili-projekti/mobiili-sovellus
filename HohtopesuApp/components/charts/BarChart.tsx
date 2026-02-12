import { View } from "react-native"
import Svg, { Rect, Text as SvgText, G, Line } from "react-native-svg"

type BarChartProps = {
  data: number[]
  labels?: string[]
  height?: number
  barColor?: string
  gap?: number
  barWidth?: number
  gridLines?: number
}

export default function BarChart({
  data,
  labels = [],
  height = 200,
  barWidth = 30,
  gap = 25,
  barColor = "#2563eb",
  gridLines = 4,
}: BarChartProps) {
  const maxValue = Math.max(...data)
  const chartWidth = data.length * (barWidth + gap)
  const paddingLeft = 32
  const paddingTop = 16
  const paddingBottom = 16

  return (
    <View>
      <Svg width={chartWidth + paddingLeft} height={height + paddingTop + 32}>
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const value = Math.round((maxValue / gridLines) * i)
          const y = paddingTop + height - (i / gridLines) * height

          return (
            <G key={i}>
              {/* Grid-viiva */}
              <Line 
                x1={paddingLeft}
                x2={chartWidth + paddingLeft}
                y1={y}
                y2={y}
                stroke="#333"
                strokeDasharray="4 4"
              />

              {/* Grid arvo */}
              <SvgText 
                x={paddingLeft - 6}
                y={y + 4}
                fontSize={10}
                fill="#666"
                textAnchor="end"
              >
                {value}
              </SvgText>
            </G>
          )
        })}

        {data.map((value, index) => {
          const barHeight = (value / maxValue) * height
          const x = paddingLeft + 8 + index * (barWidth + gap)
          const y = paddingTop + height - barHeight

          return (
            <G key={index}>
              {/* Pylväs */}
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill={barColor}
              />

              {/* Label pylvään alle */}
              <SvgText
                x={x + barWidth / 2}
                y={paddingTop + height + 18}
                fontSize={12}
                fill="#666"
                textAnchor="middle"
              >
                {labels[index]}
              </SvgText>
            </G>
          )
        })}
      </Svg>
    </View>
  )
}