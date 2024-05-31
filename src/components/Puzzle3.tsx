// components/Puzzle3.tsx
import { useState } from "react";
import { Box, Input, Button, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface PuzzleProps {
  onCorrectAnswer: () => void;
}

const MotionButton = motion(Button);

const Puzzle3: React.FC<PuzzleProps> = ({ onCorrectAnswer }) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const correctAnswer = "polowinki";
    const morseCode: Record<string, string> = {
      a: ".-",
      b: "-...",
      c: "-.-.",
      d: "-..",
      e: ".",
      f: "..-.",
      g: "--.",
      h: "....",
      i: "..",
      j: ".---",
      k: "-.-",
      l: ".-..",
      m: "--",
      n: "-.",
      o: "---",
      p: ".--.",
      q: "--.-",
      r: ".-.",
      s: "...",
      t: "-",
      u: "..-",
      v: "...-",
      w: ".--",
      x: "-..-",
      y: "-.--",
      z: "--..",
      "1": ".----",
      "2": "..---",
      "3": "...--",
      "4": "....-",
      "5": ".....",
      "6": "-....",
      "7": "--...",
      "8": "---..",
      "9": "----.",
      "0": "-----",
    };

    const encryptedAnswer = correctAnswer
      .split("")
      .map((char) => morseCode[char] || char)
      .join(" ");

    if (answer.toLowerCase() === encryptedAnswer) {
      setFeedback("Correct!");
      onCorrectAnswer();
    } else {
      setFeedback("Try again.");
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          Gdzie się poznaliśmy poraz pierwszy?
        </Text>
        <img
          src="https://www.electronics-notes.com/images/morse-code-table-alphabet-letters.svg"
          alt="Morse Code Table"
        />
        <Text fontSize="sm" color="gray.500">
          Hint: Użyj szyfru Morse'a (Kropki . i myślniki -).
        </Text>
        <Input
          value={answer}
          onChange={handleInputChange}
          placeholder="Your answer"
          variant="filled"
          color="black"
          _placeholder={{ color: "gray.500" }}
        />
        <MotionButton
          onClick={handleSubmit}
          colorScheme="teal"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          Submit
        </MotionButton>
        <Text color={feedback === "Correct!" ? "green.500" : "red.500"}>
          {feedback}
        </Text>
      </VStack>
    </Box>
  );
};

export default Puzzle3;
