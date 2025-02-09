import { View, Text } from "react-native";
import React from "react";

export const LetterSquare = ({
  char,
  status,
}: {
  char: string;
  status: number;
}) => {
  /* COLOR LEGEND

  400: Nothing in square
  500: Incorrect letter
  600: Current entry

  */

  const grayValue = char.length > 0 ? "bg-gray-500" : "bg-gray-400";
  return (
    <View
      className={`w-20 aspect-square ${
        status == 2
          ? "bg-green-500"
          : status == 1
          ? "bg-yellow-500"
          : status == 0
          ? grayValue
          : "bg-gray-600"
      } rounded-lg flex justify-center items-center`}
    >
      <Text className="text-4xl text-white font-bold">{char}</Text>
    </View>
  );
};
