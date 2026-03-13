import { ReactNode, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle, StyleProp, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlurrColors, BorderRadius, Spacing, Shadows } from '@/constants/theme';

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
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(borderAnim, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 100,
    }).start();
  }, [selected, borderAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', FlurrColors.black],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
    >
      <Animated.View
        style={[
          styles.container,
          { borderColor, transform: [{ scale: scaleAnim }] },
        ]}
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
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FlurrColors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 2,
    minHeight: 100,
    justifyContent: 'space-between',
    ...Shadows.card,
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
