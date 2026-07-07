import { Box, Button, Heading, HStack, IconButton, Image, Input, Text, Dialog, useDisclosure, Portal, VStack} from '@chakra-ui/react';
import { LuPencil, LuTrash2 } from "react-icons/lu";
import React, { useState } from 'react';
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '@/store/product';
import { toaster } from "@/components/ui/toaster";


const ProductCard = ({product}) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();

    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [open, setOpen] = React.useState(false);
    
    const[updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);

        if(!success){
            toaster.create({
                id: "delete-product-error",
                title: "Error",
                description: message,
                type: "error",
                closable: true,
                duration: 3000
            })  
        }
        else{
            toaster.create({
                title: "Success",
                description: message,
                type: "success",
                closable: true,
                duration: 3000
            })           
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
      const { success, message } = await updateProduct(pid, updatedProduct);

      if(!success){
            toaster.create({
                id: "update-product-error",
                title: "Error",
                description: message,
                type: "error",
                closable: true,
                duration: 3000
            })  
        }
        else{
            toaster.create({
                title: "Success",
                description: "Product updated successfully",
                type: "success",
                closable: true,
                duration: 3000
            })           
        }
        setOpen(false);
    }

  return (
    <Box
        shadow='lg'
		rounded='lg'
		overflow='hidden'
		transition='all 0.3s'
		_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
		bg={bg}
    >
        <Image src={product.image} alt ={product.name} h={48} w='full' objectFit='cover'/>
        <Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl'  color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack gap={2}>
					<IconButton onClick={() => setOpen(true)} colorPalette='blue'
                        aria-label="Edit product"
                        variant="subtle"
                        bg="#669fd8"
                        color="white"
                        _hover={{ bg: "#5198df" }}
                    >
                        <LuPencil />
                    </IconButton>
					<IconButton
						onClick={() => handleDeleteProduct(product.id)}
						colorPalette='red'
                        variant="subtle"  
                        aria-label="Delete product"
                        bg="#fb9caf"
                        color="white"
                        _hover={{ bg: "#f3819b" }}
					>
                        <LuTrash2 />
                    </IconButton>
				</HStack>
			</Box>
            <Dialog.Root
   open={open}
  onOpenChange={(e) => setOpen(e.open)}
>
  <Portal>
    <Dialog.Backdrop />

    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Update Product</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body>
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  name: e.target.value,
                })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: e.target.value,
                })
              }
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  image: e.target.value,
                })
              }
            />
          </VStack>
        </Dialog.Body>

        <Dialog.Footer>
          <Button
            colorPalette="blue"
            mr={3}
            onClick={() =>
              handleUpdateProduct(product.id, updatedProduct)
            }
          >
            Update
          </Button>

          <Dialog.ActionTrigger asChild>
            <Button variant="ghost">
              Cancel
            </Button>
          </Dialog.ActionTrigger>
        </Dialog.Footer>

        <Dialog.CloseTrigger />
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
    </Box>
    
  )
}

export default ProductCard
