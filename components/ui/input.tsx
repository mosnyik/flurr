import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
  Animated,
} from 'react-native';
import { FlurrColors, BorderRadius, Typography, Spacing, Shadows } from '@/constants/theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label,
  error,
  containerStyle,
  value,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const isActive = isFocused || !!value;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isActive, animatedValue]);

  const labelStyle = {
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 8],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [FlurrColors.lightGray, FlurrColors.gray],
    }),
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {label && (
          <Animated.Text style={[styles.label, labelStyle]}>
            {label}
          </Animated.Text>
        )}
        <TextInput
          style={[styles.input, label && styles.inputWithLabel]}
          placeholderTextColor={FlurrColors.lightGray}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          {...props}
          placeholder={isActive ? props.placeholder : undefined}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  inputWrapper: {
    backgroundColor: FlurrColors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'relative',
    ...Shadows.card,
  },
  inputFocused: {
    borderColor: FlurrColors.black,
  },
  inputError: {
    borderColor: FlurrColors.coral,
  },
  label: {
    position: 'absolute',
    left: Spacing.md,
    fontWeight: '500',
  },
  input: {
    ...Typography.bodyMedium,
    height: 56,
    paddingHorizontal: Spacing.md,
    color: FlurrColors.black,
  },
  inputWithLabel: {
    paddingTop: 18,
  },
  errorText: {
    ...Typography.bodySmall,
    color: FlurrColors.coral,
    marginTop: Spacing.xs,
  },
});
