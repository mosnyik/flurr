import { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { FlurrColors, BorderRadius, Typography, Spacing, Shadows } from '@/constants/theme';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  error?: boolean;
}

export function OTPInput({
  length = 4,
  value,
  onChange,
  onComplete,
  error = false,
}: OTPInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const digits = value.split('').concat(Array(length - value.length).fill(''));

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newValue = digits.slice(0, index).join('') + digit + digits.slice(index + 1).join('');
    const trimmedValue = newValue.slice(0, length);

    onChange(trimmedValue);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (trimmedValue.length === length) {
      Keyboard.dismiss();
      onComplete?.(trimmedValue);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newValue = digits.slice(0, index - 1).join('') + digits.slice(index).join('');
      onChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      {digits.slice(0, length).map((digit, index) => (
        <View
          key={index}
          style={[
            styles.inputWrapper,
            focusedIndex === index && styles.inputFocused,
            error && styles.inputError,
          ]}
        >
          <TextInput
            ref={(ref) => { inputRefs.current[index] = ref; }}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 64,
    backgroundColor: FlurrColors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Shadows.card,
  },
  inputFocused: {
    borderColor: FlurrColors.black,
  },
  inputError: {
    borderColor: FlurrColors.coral,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: FlurrColors.black,
  },
});
