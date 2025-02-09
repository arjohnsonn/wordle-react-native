import { View, Text } from "react-native";
import React from "react";
import { LetterSquare } from "./LetterSquare";

interface WordRowProps {
  word: string;
  count: number;
  guessData: { status: number }[];
}

const WordRow = ({ word, count, guessData }: WordRowProps) => {
  const letters = word.toUpperCase().split("");
  const length = letters.length;
  const empty = Array.from({ length: count - length }, () => "");

  return (
    <View className="flex flex-row gap-x-1.5">
      {letters.slice(0, 5).map((char, index) => (
        <LetterSquare
          status={guessData[index].status}
          key={index}
          char={char}
        />
      ))}
      {empty.map((_, index) => (
        <LetterSquare status={0} key={index + length} char="" />
      ))}
    </View>
  );
};

export default WordRow;
