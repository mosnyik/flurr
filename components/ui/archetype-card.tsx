import { useRef, useEffect, ReactNode } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { FlurrColors, BorderRadius, Spacing, Shadows, Typography } from '@/constants/theme';

interface ArchetypeCardProps {
  name: string;
  icon: ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}

export function ArchetypeCard({ name, icon, title, description, selected, onPress }: ArchetypeCardProps) {
  const borderAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(borderAnim, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 100,
    }).start();
  }, [selected, borderAnim]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', FlurrColors.black],
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.wrapper}>
      <Animated.View style={[styles.card, { borderColor }]}>
        <View style={styles.row}>
          <Text style={styles.name}>{name}</Text>
          {icon}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '47%',
  },
  card: {
    backgroundColor: FlurrColors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    padding: Spacing.md,
    gap: Spacing.xs,
    ...Shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    fontStyle: 'italic',
    color: FlurrColors.black,
    textTransform: 'lowercase',
    flexShrink: 1,
  },
  title: {
    ...Typography.bodySmall,
    color: FlurrColors.gray,
    fontStyle: 'italic',
  },
  description: {
    ...Typography.bodySmall,
    color: FlurrColors.black,
    lineHeight: 18,
  },
});
