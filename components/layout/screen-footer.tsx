import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlurrColors, Spacing, BorderRadius, Typography } from '@/constants/theme';
import { Button } from '@/components/ui/button';

interface ScreenFooterProps {
  primaryLabel: string;
  onPrimaryPress: () => void;
  primaryDisabled?: boolean;
  primaryLoading?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export function ScreenFooter({
  primaryLabel,
  onPrimaryPress,
  primaryDisabled = false,
  primaryLoading = false,
  showBackButton = true,
  onBackPress,
}: ScreenFooterProps) {
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={FlurrColors.black} />
        </TouchableOpacity>
      )}
      <View style={[styles.primaryWrapper, !showBackButton && styles.fullWidth]}>
        <Button
          onPress={onPrimaryPress}
          disabled={primaryDisabled}
          loading={primaryLoading}
        >
          {primaryLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    backgroundColor: FlurrColors.chipBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryWrapper: {
    flex: 1,
  },
  fullWidth: {
    flex: 1,
  },
});
