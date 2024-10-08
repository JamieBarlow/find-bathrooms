import { FaToiletsPortable } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { Flex, Heading, Text, Button, Spacer, HStack } from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Flex
        bg="teal.300"
        justify="space-between"
        wrap="wrap"
        gap="2"
        as="nav"
        p="10px"
        align="center"
        position="fixed"
        w="100%"
      >
        <Flex align="center" gap="5">
          <FaToiletsPortable size="25" />
          <Heading as="h1">Bathrooms</Heading>
          <Spacer />
        </Flex>
        <HStack spacing="20px">
          <NavLink to="/bathrooms">All bathrooms</NavLink>
          <Text>Username</Text>
          <Button colorScheme="blue">
            <IoMdMenu size="20" />
          </Button>
        </HStack>
      </Flex>
    </>
  );
}
