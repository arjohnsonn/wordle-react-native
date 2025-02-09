import { View } from "react-native";
import React from "react";
import { KeyboardLetter, FunctionKey } from "./KeyboardLetter";

const WordleKeyboard = ({
  letterPress: onPressFunc,
  enterPress: enterFunc,
  backspacePress: backspaceFunc,
  letterData,
}: {
  letterPress: Function;
  enterPress: Function;
  backspacePress: Function;
  letterData: Record<string, number>;
}) => {
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <View className="flex flex-col gap-y-1.5 items-center justify-center">
      <View className="flex flex-row gap-x-1">
        {firstRow.map((letter, index) => (
          <KeyboardLetter
            status={letterData[letter]}
            letterPress={onPressFunc}
            key={index}
            char={letter}
          />
        ))}
      </View>
      <View className="flex flex-row gap-x-1">
        {secondRow.map((letter, index) => (
          <KeyboardLetter
            status={letterData[letter]}
            letterPress={onPressFunc}
            key={index}
            char={letter}
          />
        ))}
      </View>
      <View className="flex flex-row gap-x-1">
        <FunctionKey char="↵" func={enterFunc} />
        {thirdRow.map((letter, index) => (
          <KeyboardLetter
            status={letterData[letter]}
            letterPress={onPressFunc}
            key={index}
            char={letter}
          />
        ))}
        <FunctionKey char="⌫" func={backspaceFunc} />
      </View>
    </View>
  );
};

export default WordleKeyboard;
