import { theme } from '@/constants/theme';

export function useThemeColor(
  props: { color?: string; },
  colorName: keyof typeof theme.colors
) {
  return props.color ?? theme.colors[colorName];
}