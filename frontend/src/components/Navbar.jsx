import React from 'react'
import {Container, Flex, Text, HStack, Button} from '@chakra-ui/react'
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FaPlusSquare, FaSun } from 'react-icons/fa';
import { CiSquarePlus } from 'react-icons/ci';
import { useColorMode } from './ui/color-mode';
import { FaMoon } from 'react-icons/fa6';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
        <Flex 
           h={16}
           alignItems={"center"}
           justifyContent={"space-between"}
           flexDirection={{
            base:"column",
            sm:"row"
           }}
        >
            <Text
              fontSize = {{base:"22px", sm:"28px"}}
              fontWeight = {"bold"}
              textTransform={"uppercase"}
              textAlign={"center"}
            >
                <ChakraLink bgGradient="to-r"
                            gradientFrom="cyan.400"
                            gradientTo="blue.500"
                            backgroundClip="text"
                            color="transparent"
                            _hover={{
                                textDecoration: "none",
                            }}
                             as={RouterLink} to="/">Product Store 🛒</ChakraLink>
            </Text>
            <HStack gap={2} alignItems={"center"}>
                <ChakraLink as={RouterLink} to="/create">
                <Button   aria-label="add product"
                          bg={{ base: "gray.200", _dark: "gray.800" }}
                          _hover={{ bg: { base: "gray.300", _dark: "gray.700" } }}
                          color={{ base: "gray.800", _dark: "gray.100" }}>
                    <FaPlusSquare />
                </Button>
                    {/* <Button >
                        {colorMode==="light"? <FaPlusSquare color='white'/>: <FaPlusSquare color='black'/>} 
                    </Button> */}
                </ChakraLink>
                <Button
                      aria-label="toggle color mode"
                      bg={{ base: "gray.200", _dark: "gray.800" }}
                      _hover={{ bg: { base: "gray.300", _dark: "gray.700" } }}
                      color={{ base: "gray.800", _dark: "gray.300" }}
                      onClick={toggleColorMode}
                >
                    {colorMode === "light" ? <IoMoon /> : <LuSun />}
                </Button>
                    {/* <Button onClick={toggleColorMode}>
                        {colorMode==="light"? <IoMoon/> : <LuSun/>}
                    </Button> */}
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
