// App.tsx
import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import MainPuzzle from "./components/MainPuzzle";

const App: React.FC = () => {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      bgImage="url('https://upload.wikimedia.org/wikipedia/commons/b/b2/Puszczykowo%2C_Marktplatz_08.jpg')" // replace with the actual path to your image
      bgSize="cover"
      minH="100vh"
      color="white"
    >
      <Box bg="rgba(0, 0, 0, 0.6)" p={6} borderRadius="md">
        <Heading as="h1" size="2xl" mb={6}>
          URODZINOWA ZAGADKA DLA CIEBIE ALICJAAAAA!
        </Heading>
        <MainPuzzle />
      </Box>
    </Box>
  );
};

export default App;
