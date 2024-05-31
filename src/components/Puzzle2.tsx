// components/Puzzle2.tsx
import { useState } from 'react';
import { Box, Input, Button, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface PuzzleProps {
  onCorrectAnswer: () => void;
}

const MotionButton = motion(Button);

const Puzzle2: React.FC<PuzzleProps> = ({ onCorrectAnswer }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const correctAnswer = 'svalbard';
    const key = 'key';
    const encryptedAnswer = correctAnswer.split('').map((char, index) => {
      const charCode = char.charCodeAt(0);
      const keyCode = key[index % key.length].charCodeAt(0);
      if (char >= 'a' && char <= 'z') {
        return String.fromCharCode(((charCode - 97 + (keyCode - 97)) % 26) + 97);
      }
      return char;
    }).join('');

    if (answer.toLowerCase() === encryptedAnswer) {
      setFeedback('Correct!');
     
      onCorrectAnswer();
    } else {
      setFeedback('Try again.');
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">Najbardziej wysunięty na północ archipelag ma nazwę?</Text>
        <iframe 
          width="1128" 
          height="635" 
          src="https://www.youtube.com/embed/JrEY8qbwT-4" 
          title="Szyfr Vigenère'a" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
        <Text fontSize="sm" color="gray.500">Hint: Użyj szyfru Vigenère z kluczem 'key'.</Text>
        <Input 
          value={answer} 
          onChange={handleInputChange} 
          placeholder="Your answer" 
          variant="filled"
          color="black"
          _placeholder={{ color: 'gray.500' }}
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
        <Text color={feedback === 'Correct!' ? 'green.500' : 'red.500'}>{feedback}</Text>
      </VStack>
    </Box>
  );
};

export default Puzzle2;
