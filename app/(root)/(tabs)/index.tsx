import WordleKeyboard from "@/components/WordleKeyboard";
import WordRow from "@/components/WordRow";
import images from "@/constants/images";
import { useState } from "react";
import { View, Image, SafeAreaView, Alert } from "react-native";
import { allWords } from "@/assets/words";

// Constants

const MAX_LETTERS = 5;
const MAX_GUESSES = 6;

const INITIAL_WORDS = ["", "", "", "", "", ""];
const INITIAL_GUESS_DATA = Array.from({ length: MAX_GUESSES }, () =>
  Array.from({ length: MAX_LETTERS }, () => ({ status: -1 }))
);

function getRandomWord() {
  return allWords[Math.floor(Math.random() * allWords.length)].toUpperCase();
}

export default function Index() {
  const [words, setWords] = useState<string[]>([...INITIAL_WORDS]);
  const [wordGuessData, setWordGuessData] = useState<
    Array<{ status: number }[]>
  >([...INITIAL_GUESS_DATA]);
  const [letterData, setLetterData] = useState<Record<string, number>>({});

  const [correctWordStr, setCorrectWordStr] = useState(getRandomWord());
  const [currentWord, setCurrentWord] = useState(0);

  const handleLetterPress = (letter: string) => {
    setWords((prevWords) => {
      const newWords = [...prevWords]; // Copy the array

      if (newWords[currentWord].length < 5) {
        newWords[currentWord] = newWords[currentWord] + letter;
        return newWords;
      }

      // Return old array of words if the word is already 5 letters long
      return prevWords;
    });
  };

  const handleBackspacePress = () => {
    setWords((prevWords) => {
      const newWords = [...prevWords]; // Copy the array

      if (newWords[currentWord].length > 0) {
        newWords[currentWord] = newWords[currentWord].slice(0, -1);
        return newWords;
      }

      return prevWords;
    });
  };

  const handleEnterPress = () => {
    const currentWordEntry = words[currentWord];
    if (currentWordEntry.length != 5) {
      Alert.alert("Invalid word", "Please enter a 5 letter word");
      return;
    }

    const guessData = generateGuessData({ guessedWord: currentWordEntry });

    setWordGuessData((prevGuessData) => {
      const newGuessData = [...prevGuessData]; // Copy the array
      newGuessData[currentWord] = guessData;

      return newGuessData;
    });

    if (currentWordEntry == correctWordStr) {
      Alert.prompt(
        "You win!",
        "Play again?",
        [
          {
            text: "No",
            onPress: () => {},
          },
          {
            text: "Yes",
            onPress: () => {
              setCorrectWordStr(getRandomWord());
              setWords([...INITIAL_WORDS]);
              setWordGuessData([...INITIAL_GUESS_DATA]);
              setCurrentWord(0);
              setLetterData({});
            },
          },
        ],
        "default"
      );
    } else {
      setCurrentWord((prevWord) => {
        if (prevWord == 5) {
          Alert.alert(
            "Game over!",
            `You have run out of guesses! The correct word was ${correctWordStr}`,
            [
              {
                text: "Play again",
                onPress: () => {
                  setCorrectWordStr(getRandomWord());
                  setWords([...INITIAL_WORDS]);
                  setWordGuessData([...INITIAL_GUESS_DATA]);
                  setCurrentWord(0);
                  setLetterData({});
                },
              },
            ]
          );
          return prevWord;
        }

        return prevWord + 1;
      });
    }
  };

  const generateGuessData = ({ guessedWord }: { guessedWord: string }) => {
    const guessData = Array.from({ length: 5 }, (_, index) => {
      const letter = guessedWord[index];

      // LEGEND: 2 = green, 1 = yellow, 0 = gray

      /* The below code is for handling yellow letters where there will not
       be more yellow letters than the correct word has
       e.g. only MAX of 2 Es can be yellow in the word "SLEEP", not 3+ */

      const letterCounts: Record<string, number> = {};
      for (const char of correctWordStr) {
        letterCounts[char] = (letterCounts[char] || 0) + 1;
      }

      // Greens
      const statuses = Array(5).fill(0); // Fill with 0 meaning gray
      for (let i = 0; i < 5; i++) {
        if (guessedWord[i] === correctWordStr[i]) {
          statuses[i] = 2;
          letterCounts[guessedWord[i]]--;
        }
      }

      // Yellows
      for (let i = 0; i < 5; i++) {
        if (statuses[i] !== 2 && letterCounts[guessedWord[i]] > 0) {
          statuses[i] = 1;
          letterCounts[guessedWord[i]]--;
        }
      }

      const status = statuses[index];

      setLetterData((prevData) => {
        const newLetterData = { ...prevData };
        if (
          newLetterData[letter] < status ||
          newLetterData[letter] === undefined
        ) {
          newLetterData[letter] = status;
        }
        return newLetterData;
      });

      return { status };
    });

    return guessData;
  };

  return (
    <SafeAreaView className="bg-white h-full items-center">
      <Image
        source={images.wordle_long}
        className="w-full h-20 mt-5"
        resizeMode="contain"
      />
      <View className="flex flex-col justify-center items-center gap-y-1.5 p-4">
        {words.map((word, index) => (
          <WordRow
            key={index}
            word={word}
            guessData={wordGuessData[index]}
            count={MAX_LETTERS}
          />
        ))}
      </View>

      <WordleKeyboard
        enterPress={handleEnterPress}
        backspacePress={handleBackspacePress}
        letterPress={handleLetterPress}
        letterData={letterData}
      />
    </SafeAreaView>
  );
}
