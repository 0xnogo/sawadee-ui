import { ChakraProvider, Container, Heading, VStack } from '@chakra-ui/react';
import LocationForm from './components/LocationForm';

function App() {
  return (

    <ChakraProvider>
      <Container maxW='md' bg='blue.600' color='white' padding='10' centerContent>
        <VStack spacing='10px'>
          <Heading size='lg' fontSize='50px'>
            Sawadee
          </Heading>
          <LocationForm />
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
