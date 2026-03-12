import { StyleSheet, Text, TouchableOpacity, TextStyle, StyleProp } from 'react-native';
import { FlurrColors, Typography } from '@/constants/theme';

interface TextLinkProps {
  children: string;
  onPress: () => void;
  variant?: 'default' | 'coral';
  style?: StyleProp<TextStyle>;
}

export function TextLink({
  children,
  onPress,
  variant = 'default',
  style,
}: TextLinkProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text
        style={[
          styles.text,
          variant === 'coral' && styles.coral,
          style,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    ...Typography.bodyMedium,
    color: FlurrColors.black,
  },
  coral: {
    color: FlurrColors.coral,
  },
});
