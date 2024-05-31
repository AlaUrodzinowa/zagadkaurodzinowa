import { useState } from "react";
import { Box, Text, VStack, useToast } from "@chakra-ui/react";
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Puzzle1 from "./Puzzle1";
import Puzzle2 from "./Puzzle2";
import Puzzle3 from "./Puzzle3";

const steps = [
  {
    title: "Zagadka 1",
    description: "Wiadomość którą dostałaś ode mnie 21.09.2022 16:08",
  },
  {
    title: "Zagadka 2",
    description: "Najbardziej wysunięty na północ archipelag ma nazwę?",
  },
  { title: "Zagadka 3", description: "Gdzie się poznaliśmy poraz pierwszy?" },
  { title: "Koniec", description: "Gratulacje! Otrzymałeś pełny szyfr." },
];

const MainPuzzle: React.FC = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [cipherParts, setCipherParts] = useState<string[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const toast = useToast();

  const handleCorrectAnswer = (part: string) => {
    setCipherParts([...cipherParts, part]);
    setShowAnimation(true);
    toast({
      title: "TAK JEEEST!",
      description: "UDAŁO CI SIE ROZWIĄZAĆ O O O.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      setShowAnimation(false);
      setActiveStep(activeStep + 1);
    }, 2000);
  };

  const renderPuzzle = () => {
    switch (activeStep) {
      case 0:
        return <Puzzle1 onCorrectAnswer={() => handleCorrectAnswer("part1")} />;
      case 1:
        return <Puzzle2 onCorrectAnswer={() => handleCorrectAnswer("part2")} />;
      case 2:
        return <Puzzle3 onCorrectAnswer={() => handleCorrectAnswer("part3")} />;
      case 3:
        return (
          <Text>
            Gratulacje ALAAA! Napisz do mnie: kurczak w czekoladzie o o o{" "}
          </Text>
        );
      default:
        return <Text>aha coś sie odjebalo</Text>;
    }
  };

  return (
    <Box p={6} position="relative">
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 255, 0, 0.3)",
              zIndex: 10,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <Stepper size="lg" index={activeStep} colorScheme="teal">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIndicator />}
                incomplete={<StepIndicator />}
                active={<StepIndicator />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={4} mt={8}>
          {renderPuzzle()}
        </VStack>
      </motion.div>
    </Box>
  );
};

export default MainPuzzle;
