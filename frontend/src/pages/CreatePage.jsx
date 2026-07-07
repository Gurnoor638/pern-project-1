import React from 'react'
import { Box, Button, Container, Heading, Input, Toast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '@/store/product.js';
import { toaster } from "@/components/ui/toaster";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name:"",
        price:"",
        image:""
    });

    const {createProduct} = useProductStore();

    const handleAddProduct = async () =>{
        const {success, message} = await createProduct(newProduct);
        if(!success){
            toaster.create({
                id: "create-product-error",
                title: "Error",
                description: message,
                type: "error",
                closable: true,
                duration: 3000
            })  
            console.log()        
        }
        else{
            toaster.create({
                title: "Success",
                description: message,
                type: "success",
                closable: true,
                duration: 3000
            }) 
            setNewProduct({name: "", price: "", image: ""})
        }
    }

  return (
    <Container maxW={"640px"}>
        <VStack spacing={8} >
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>

            <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing= {4}>
                    <Input type="text"  placeholder={'Product Name'}
                           name='name'  value={newProduct.name}
                           onChange={(e)=>setNewProduct({...newProduct, name: e.target.value})}
                    />

                    <Input type="number"  placeholder={'Price'}
                           name='price'  value={newProduct.price}
                           onChange={(e)=>setNewProduct({...newProduct, price: e.target.value})}
                    />

                    <Input type="text"  placeholder={'Image URL'}
                           name='image'  value={newProduct.image}
                           onChange={(e)=>setNewProduct({...newProduct, image: e.target.value})}
                    />
                        <Button
                            colorScheme="blue"
                            w="full"
                            onClick={handleAddProduct}
                            // _hover={{
                            // bg: "blue.600",
                            // transform: "translateY(-2px)",
                            // }}
                            _active={{
                                bg: "blue.400",
                                transform: "scale(0.98)",
                            }}
                            _focusVisible={{
                                boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
                            }}
                            transition="all 0.1s ease"
                            >
                                Add Product
                        </Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage
