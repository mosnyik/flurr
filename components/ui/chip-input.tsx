import {
  BorderRadius,
  FlurrColors,
  Shadows,
  Spacing,
  Typography,
} from "@/constants/theme";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { Chip } from "./chip";

interface ChipInputProps {
  label?: string;
  chips: string[];
  onAddChip: (chip: string) => void;
  onRemoveChip: (index: number) => void;
  placeholder?: string;
  maxChips?: number;
  minChipLength?: number;
  maxChipLength?: number;
}

export function ChipInput({
  label,
  chips,
  onAddChip,
  onRemoveChip,
  placeholder = "Type and press enter",
  maxChips = 5,
  minChipLength = 1,
  maxChipLength,
}: ChipInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const animatedValue = useRef(
    new Animated.Value(chips.length > 0 ? 1 : 0),
  ).current;

  const isActive = isFocused || chips.length > 0 || inputValue.length > 0;

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

  const addChip = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return false;
    }

    const isValidLength =
      trimmed.length >= minChipLength &&
      (!maxChipLength || trimmed.length <= maxChipLength);

    if (isValidLength && chips.length < maxChips && !chips.includes(trimmed)) {
      onAddChip(trimmed);
      return true;
    }
    return false;
  };

  const handleChangeText = (text: string) => {
    if (text.endsWith(" ") || text.endsWith(",")) {
      const added = addChip(text);
      if (added) {
        setInputValue("");
      } else {
        // Keep only the text without the space/comma
        setInputValue(text.slice(0, -1));
      }
    } else {
      setInputValue(text);
    }
  };

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    addChip(inputValue);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, isFocused && styles.inputFocused]}>
        {label && (
          <Animated.Text style={[styles.label, labelStyle]}>
            {label}
          </Animated.Text>
        )}
        <View style={styles.contentWrapper}>
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
              onChangeText={handleChangeText}
              onSubmitEditing={handleSubmit}
              placeholder={isActive ? placeholder : undefined}
              placeholderTextColor={FlurrColors.lightGray}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              returnKeyType="done"
            />
          )}
        </View>
      </View>
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
    borderColor: "transparent",
    minHeight: 56,
    position: "relative",
    ...Shadows.card,
  },
  inputFocused: {
    borderColor: FlurrColors.black,
  },
  label: {
    position: "absolute",
    left: Spacing.md,
    fontWeight: "500",
  },
  contentWrapper: {
    paddingTop: 24,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
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
