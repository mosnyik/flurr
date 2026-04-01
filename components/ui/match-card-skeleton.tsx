import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { FlurrColors, BorderRadius, Spacing, Shadows } from '@/constants/theme';

function ShimmerBox({ style }: { style?: object }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={[styles.shimmer, style, animatedStyle]} />;
}

export function MatchCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <View style={[styles.container, { marginBottom: Spacing.md }]}>
      <View style={styles.content}>
        <ShimmerBox style={styles.nameLine} />
        <ShimmerBox style={styles.pronounsLine} />
        <View style={styles.chipsRow}>
          <ShimmerBox style={styles.chip} />
          <ShimmerBox style={styles.chipWide} />
          <ShimmerBox style={styles.chip} />
        </View>
      </View>
      <ShimmerBox style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: FlurrColors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    ...Shadows.card,
  },
  content: {
    flex: 1,
    paddingRight: Spacing.md,
    gap: Spacing.sm,
  },
  shimmer: {
    backgroundColor: FlurrColors.chipBackground,
    borderRadius: BorderRadius.sm,
  },
  nameLine: {
    height: 28,
    width: '60%',
  },
  pronounsLine: {
    height: 14,
    width: '30%',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  chip: {
    height: 24,
    width: 60,
    borderRadius: BorderRadius.full,
  },
  chipWide: {
    height: 24,
    width: 90,
    borderRadius: BorderRadius.full,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
  },
});
