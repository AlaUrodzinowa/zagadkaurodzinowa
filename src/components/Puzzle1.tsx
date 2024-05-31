// components/Puzzle1.tsx
import { useState } from "react";
import { Box, Input, Button, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface PuzzleProps {
  onCorrectAnswer: () => void;
}

const MotionButton = motion(Button);

const Puzzle1: React.FC<PuzzleProps> = ({ onCorrectAnswer }) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const correctAnswer = "przestan ty";
    const shift = 3;
    const encryptedAnswer = correctAnswer
      .split("")
      .map((char) => {
        const charCode = char.charCodeAt(0);
        if (char >= "a" && char <= "z") {
          return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        }
        return char;
      })
      .join("");

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
          Wiadomość którą dostałaś ode mnie 21.09.2022 16:08
        </Text>
        <iframe
          width="677"
          height="392"
          src="https://www.youtube.com/embed/fR8rVR72a6o"
          title="Caesar Cipher"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <Text fontSize="sm" color="gray.500">
          Hint: Użyj szyfru Cezara z przesunięciem 3 (bez polskich znaków).
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

export default Puzzle1;
