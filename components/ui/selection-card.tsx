import { ReactNode } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlurrColors, BorderRadius, Typography, Spacing, Shadows } from '@/constants/theme';

interface SelectionCardProps {
  icon?: ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
  label: string;
  selected?: boolean;
  showCheckmark?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function SelectionCard({
  icon,
  iconName,
  label,
  selected = false,
  showCheckmark = false,
  onPress,
  style,
}: SelectionCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {(icon || iconName) && (
        <View style={styles.iconContainer}>
          {icon || (iconName && (
            <Ionicons
              name={iconName}
              size={24}
              color={FlurrColors.black}
            />
          ))}
        </View>
      )}
      <Text style={styles.label}>
        {label}
      </Text>
      {selected && showCheckmark && (
        <View style={styles.checkmark}>
          <Ionicons name="checkmark" size={16} color={FlurrColors.white} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: FlurrColors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 100,
    justifyContent: 'space-between',
    ...Shadows.card,
  },
  selected: {
    borderColor: FlurrColors.black,
  },
  iconContainer: {
    alignSelf: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'flex-start',
    color: FlurrColors.black,
  },
  checkmark: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: FlurrColors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
