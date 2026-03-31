import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlurrColors, BorderRadius, Typography, Spacing } from '@/constants/theme';

interface ChipProps {
  label: string;
  onRemove?: () => void;
  removable?: boolean;
  selected?: boolean;
  large?: boolean;
  onPress?: () => void;
}

export function Chip({
  label,
  onRemove,
  removable = false,
  selected = false,
  large = false,
  onPress,
}: ChipProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.container, selected && styles.selected, large && styles.large, large && selected && styles.largeSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      {removable && onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Ionicons name="close" size={14} color={FlurrColors.coral} />
        </TouchableOpacity>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: FlurrColors.chipBackground,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.xs,
    paddingLeft: Spacing.sm,
    paddingRight: Spacing.sm,
    gap: Spacing.xs,
  },
  selected: {
    backgroundColor: FlurrColors.black,
  },
  large: {
    height: 52,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: FlurrColors.white,
    borderWidth: 1,
    borderColor: FlurrColors.inputBorder,
  },
  largeSelected: {
    backgroundColor: FlurrColors.black,
    borderColor: FlurrColors.black,
  },
  label: {
    ...Typography.bodySmall,
    color: FlurrColors.black,
  },
  labelSelected: {
    color: FlurrColors.white,
  },
  removeButton: {
    marginLeft: 2,
  },
});
