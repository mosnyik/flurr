import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
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

export function EraSlider({
  value,
  onValueChange,
  labels = DEFAULT_LABELS,
}: EraSliderProps) {
  const step = 1;
  const min = 0;
  const max = labels.length - 1;

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={FlurrColors.black}
        maximumTrackTintColor={FlurrColors.chipBackground}
        thumbTintColor={FlurrColors.black}
      />
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
  slider: {
    width: '100%',
    height: 40,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
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
