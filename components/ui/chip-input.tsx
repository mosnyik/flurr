import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { FlurrColors, BorderRadius, Typography, Spacing, Shadows } from '@/constants/theme';
import { Chip } from './chip';

interface ChipInputProps {
  label?: string;
  chips: string[];
  onAddChip: (chip: string) => void;
  onRemoveChip: (index: number) => void;
  placeholder?: string;
  maxChips?: number;
}

export function ChipInput({
  label,
  chips,
  onAddChip,
  onRemoveChip,
  placeholder = 'Type and press enter',
  maxChips = 5,
}: ChipInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const value = inputValue.trim();
    if (value && chips.length < maxChips && !chips.includes(value)) {
      onAddChip(value);
      setInputValue('');
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, isFocused && styles.inputFocused]}>
        {chips.length > 0 && (
          <View style={styles.chipsContainer}>
            {chips.map((chip, index) => (
              <Chip
                key={`${chip}-${index}`}
                label={chip}
                removable
                onRemove={() => onRemoveChip(index)}
              />
            ))}
          </View>
        )}
        {chips.length < maxChips && (
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleSubmit}
            placeholder={chips.length === 0 ? placeholder : ''}
            placeholderTextColor={FlurrColors.lightGray}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            returnKeyType="done"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.label,
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    backgroundColor: FlurrColors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: Spacing.sm,
    minHeight: 56,
    ...Shadows.card,
  },
  inputFocused: {
    borderColor: FlurrColors.black,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  input: {
    ...Typography.bodyMedium,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.xs,
    color: FlurrColors.black,
  },
});
