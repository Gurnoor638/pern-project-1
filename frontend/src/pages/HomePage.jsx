import React from 'react'
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from '@/components/ProductCard';
// import { Link as RouterLink } from "react-router-dom";
// import { Link } from "@chakra-ui/react";

const HomePage = () => {

  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products: ", products)

  return (
      <Container maxW={"1280px"} py={12}>
          <VStack gap={8}>
              <Text 
                fontSize={30}
                fontWeight={"bold"}
                bgGradient="to-r"
                gradientFrom="cyan.400"
                gradientTo="blue.500"
                color="transparent"
                backgroundClip="text"
                textAlign={"center"}
              >
                Current Products 🚀
              </Text>

              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap={10}
                w="full"
              >
                {products.map((product)=>(
                  <ProductCard key = {product.id} product = {product}/>
                ))}
              </SimpleGrid>
              
              {products.length === 0 && (
                <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						      No products found 😢{" "}
						      <Link to={"/create"}>
							      <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								    Create a product
							      </Text>
						      </Link>
					      </Text>
              )}

          </VStack>
      </Container>
  )
}

export default HomePage
