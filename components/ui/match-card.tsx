import { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, ImageSourcePropType, Animated, TouchableOpacity } from 'react-native';
import { FlurrColors, BorderRadius, Typography, Spacing, Shadows, CustomFonts } from '@/constants/theme';
import { Chip } from './chip';
import { getCompatibilityColor } from '@/store';

interface MatchCardProps {
  name: string;
  pronouns: string;
  interests: string[];
  compatibility?: number;
  imageUrl?: string;
  imageSource?: ImageSourcePropType;
  index?: number;
  onPress?: () => void;
}

export function MatchCard({
  name,
  pronouns,
  interests,
  compatibility,
  imageUrl,
  imageSource,
  index = 0,
  onPress,
}: MatchCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const badgeScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * 100; // Stagger animation by 100ms per card

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animate badge after card appears
      Animated.spring(badgeScaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }).start();
    });
  }, [index, fadeAnim, slideAnim, badgeScaleAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
            {compatibility !== undefined && (
              <Animated.View
                style={[
                  styles.compatibilityBadge,
                  {
                    backgroundColor: getCompatibilityColor(compatibility),
                    transform: [{ scale: badgeScaleAnim }],
                  },
                ]}
              >
                <Text style={styles.compatibilityText}>{compatibility}%</Text>
              </Animated.View>
            )}
          </View>
          <Text style={styles.pronouns}>{pronouns}</Text>
          <View style={styles.interestsContainer}>
            {interests.map((interest, idx) => (
              <Chip key={idx} label={interest} />
            ))}
          </View>
        </View>
        <View style={styles.imageContainer}>
          {(imageUrl || imageSource) && (
            <Image
              source={imageSource || { uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: FlurrColors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  content: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  name: {
    fontFamily: CustomFonts.benguiatBold,
    fontSize: 24,
    color: FlurrColors.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  compatibilityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  compatibilityText: {
    fontSize: 12,
    fontWeight: '600',
    color: FlurrColors.white,
  },
  pronouns: {
    ...Typography.bodySmall,
    color: FlurrColors.gray,
    marginBottom: Spacing.sm,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    backgroundColor: FlurrColors.chipBackground,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
