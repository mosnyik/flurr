import { StyleSheet, View, Text, Image, ImageSourcePropType } from 'react-native';
import { FlurrColors, BorderRadius, Typography, Spacing, Shadows, Fonts, CustomFonts } from '@/constants/theme';
import { Chip } from './chip';
import { getCompatibilityColor } from '@/store';

interface MatchCardProps {
  name: string;
  pronouns: string;
  interests: string[];
  compatibility?: number;
  imageUrl?: string;
  imageSource?: ImageSourcePropType;
}

export function MatchCard({
  name,
  pronouns,
  interests,
  compatibility,
  imageUrl,
  imageSource,
}: MatchCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          {compatibility !== undefined && (
            <View
              style={[
                styles.compatibilityBadge,
                { backgroundColor: getCompatibilityColor(compatibility) },
              ]}
            >
              <Text style={styles.compatibilityText}>{compatibility}%</Text>
            </View>
          )}
        </View>
        <Text style={styles.pronouns}>{pronouns}</Text>
        <View style={styles.interestsContainer}>
          {interests.map((interest, index) => (
            <Chip key={index} label={interest} />
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
    </View>
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
