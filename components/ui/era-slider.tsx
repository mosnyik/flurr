import { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { FlurrColors, Typography, Spacing } from '@/constants/theme';

interface EraSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  labels?: string[];
}

const DEFAULT_LABELS = [
  '2010s+ (gen z)',
  'on the cusp (zillenial)',
  '30+ (solid millenial, aka late 90s)',
];

const THUMB_WIDTH = 48;
const THUMB_HEIGHT = 28;
const TRACK_HEIGHT = 4;

export function EraSlider({
  value,
  onValueChange,
  labels = DEFAULT_LABELS,
}: EraSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const position = useRef(new Animated.Value(0)).current;
  const currentValue = useRef(value);
  const currentPosition = useRef(0);
  const trackWidthRef = useRef(0);

  const max = labels.length - 1;

  const getPositionForValue = (val: number, width: number) => {
    if (width === 0) return 0;
    return (val / max) * (width - THUMB_WIDTH);
  };

  const getValueForPosition = (pos: number, width: number) => {
    if (width === 0) return 0;
    const ratio = pos / (width - THUMB_WIDTH);
    return Math.round(ratio * max);
  };

  const snapToValue = (val: number) => {
    const clampedValue = Math.max(0, Math.min(max, val));
    const newPosition = getPositionForValue(clampedValue, trackWidthRef.current);
    Animated.spring(position, {
      toValue: newPosition,
      useNativeDriver: false,
      tension: 100,
      friction: 10,
    }).start();
    currentPosition.current = newPosition;
    if (clampedValue !== currentValue.current) {
      currentValue.current = clampedValue;
      onValueChange(clampedValue);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.stopAnimation();
      },
      onPanResponderMove: (_, gestureState) => {
        const width = trackWidthRef.current;
        const newPos = currentPosition.current + gestureState.dx;
        const clampedPos = Math.max(0, Math.min(width - THUMB_WIDTH, newPos));
        position.setValue(clampedPos);
      },
      onPanResponderRelease: (_, gestureState) => {
        const width = trackWidthRef.current;
        const newPos = currentPosition.current + gestureState.dx;
        const newValue = getValueForPosition(newPos, width);
        snapToValue(newValue);
      },
    })
  ).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTrackWidth(width);
    trackWidthRef.current = width;
  };

  // Update position when trackWidth changes
  useEffect(() => {
    if (trackWidth > 0) {
      const newPosition = getPositionForValue(value, trackWidth);
      position.setValue(newPosition);
      currentPosition.current = newPosition;
    }
  }, [trackWidth, value]);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer} onLayout={handleLayout}>
        {/* Track */}
        <View style={styles.track} />

        {/* Dots for each position */}
        {labels.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                left: trackWidth > 0
                  ? (index / max) * (trackWidth - THUMB_WIDTH) + THUMB_WIDTH / 2 - 4
                  : `${(index / max) * 100}%`,
              },
            ]}
          />
        ))}

        {/* Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: position }],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>

      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <Text
            key={index}
            style={[
              styles.label,
              index === value && styles.labelActive,
              index === 0 && styles.labelStart,
              index === labels.length - 1 && styles.labelEnd,
            ]}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.lg,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    position: 'absolute',
    left: THUMB_WIDTH / 2,
    right: THUMB_WIDTH / 2,
    height: TRACK_HEIGHT,
    backgroundColor: FlurrColors.chipBackground,
    borderRadius: TRACK_HEIGHT / 2,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: FlurrColors.chipBackground,
    top: '50%',
    marginTop: -4,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: THUMB_HEIGHT / 2,
    backgroundColor: FlurrColors.black,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  label: {
    ...Typography.bodySmall,
    color: FlurrColors.lightGray,
    flex: 1,
    textAlign: 'center',
  },
  labelActive: {
    color: FlurrColors.black,
    fontWeight: '600',
  },
  labelStart: {
    textAlign: 'left',
  },
  labelEnd: {
    textAlign: 'right',
  },
});
