import { Box, Flex, Container } from "components/Layout";
import { Text } from "components/Text";
import type { NextPage } from "next";
import { extend, styled } from "styled";

import { Button } from "../components/Button";

const Background = styled.div("bg-red-200 h-screen w-screen");

const Card = extend(Box).div("shadow-md rounded-xl bg-red-300 bg-opacity-20");

const Home: NextPage = () => {
  return (
    <Background>
      <Flex p="md" direction="col" spaceY="lg">
        <Box>
          <Text heading="h1"># Design System</Text>
        </Box>
        <Box>
          <Text heading="h2">## Heading</Text>
          <Card p="sm">
            <Flex spaceY="md" py="md" direction="col">
              <Text heading="h1">h1: Hello, World!</Text>
              <Text heading="h2">h2: Hello, World!</Text>
              <Text heading="h3">h3: Hello, World!</Text>
              <Text heading="h4">h4: Hello, World!</Text>
            </Flex>
          </Card>
        </Box>
        <Box>
          <Text heading="h3">
            <Text></Text> Buttons
          </Text>
          <Card p="md">
            <Flex spaceX="md">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </Flex>
          </Card>
        </Box>
      </Flex>
      <Container collapse="md">
        <Box className="bg-green-200">Container</Box>
      </Container>
    </Background>
  );
};

export default Home;
