import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface KeyboardLetterProps {
  char: string;
  letterPress?: Function;
  func?: Function;
  status?: number;
}

export const KeyboardLetter = ({
  char,
  letterPress,
  status,
}: KeyboardLetterProps) => {
  const handlePress = () => {
    letterPress!(char);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`w-[34px] h-14 ${
        status == 2
          ? "bg-green-500"
          : status == 1
          ? "bg-yellow-500"
          : status == 0
          ? "bg-gray-600"
          : "bg-gray-500"
      } rounded-lg flex items-center justify-center`}
    >
      <Text className="text-white font-bold text-xl text-center">{char}</Text>
    </TouchableOpacity>
  );
};

export const FunctionKey = ({ char, func }: KeyboardLetterProps) => {
  const handlePress = () => {
    func!(char);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="w-[53px] h-14 bg-gray-500 rounded-lg flex items-center justify-center"
    >
      <Text className="text-white font-bold text-xl text-center">{char}</Text>
    </TouchableOpacity>
  );
};
