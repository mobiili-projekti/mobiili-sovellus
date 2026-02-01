import { View, Text, StyleSheet } from "react-native"
import Svg, { Path, G } from "react-native-svg"
import { theme } from "@/constants/theme"

type PieChartData = {
  value: number
  color: string
  label: string
}

type PieChartProps = {
  data: PieChartData[]
  size?: number
}

export default function PieChart({
  data,
  size = 200,
}: PieChartProps) {
  const radius = size / 2
  const center = radius
  const total = data.reduce((sum, d) => sum + d.value, 0)

  let startAngle = 0

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angle: number
  ) => {
    const rad = (angle - 90) * (Math.PI / 180)
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    }
  }

  const createArc = (value: number) => {
    const angle = (value / total) * 360
    const endAngle = startAngle + angle

    const start = polarToCartesian(center, center, radius, endAngle)
    const end = polarToCartesian(center, center, radius, startAngle)

    const largeArc = angle > 180 ? 1 : 0

    const path = `
      M ${center} ${center}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}
      Z
    `

    startAngle = endAngle
    return path
  }

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G>
          {data.map((slice, index) => (
            <Path 
              key={index}
              d={createArc(slice.value)}
              fill={slice.color}
            />
          ))}
        </G>
      </Svg>
      <View style={styles.legendContainer}>
        {data.map((slice, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorBox, {backgroundColor: slice.color}]} />
            <Text style={styles.labelText}>{slice.label} ({slice.value})</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 16,
  },
  legendContainer: {
    marginTop: 12,
    flexDirection: "column",
    justifyContent: "center",
    gap: 6,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  labelText: {
    fontSize: 14,
    color: theme.colors.text,
  }
})