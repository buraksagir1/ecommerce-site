import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Container, Button } from '@mui/material'
import { addToCart, increaseNumber, decreaseNumber, removeItem } from '../slices/ProductsSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DisplayProduct() {

    const { productId } = useParams();

    const dispatch = useDispatch()

    const products = useSelector((state) => (state.products.products));

    const displayedProduct = products.find((p) => (Number(p.id) === Number(productId)))

    if (!displayedProduct) {
        return <Box><h3>Ürün bulunamadı veya yükleniyor...</h3></Box>;
    }

    console.log(displayedProduct.inCart)

    return (
        <Container>
            <Box mt={14} display={"flex"}>

                <Box style={{ width: "50%" }} display={'flex'} flexDirection={"column"}>
                    <img style={{ marginTop: "30px", width: "90%" }} src={displayedProduct.image} alt="" />
                </Box>

                <Box flexDirection={"column"} style={{ width: "40%" }} >
                    <h2>{displayedProduct.title}</h2>
                    <p style={{ width: "80%", height: "40%" }}>{displayedProduct.description}</p>

                    <Box gap={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                        <h3 >{displayedProduct.price} TL</h3>

                        {displayedProduct.inCart ?
                            (
                                <Box sx={{ width: "100%" }} display={"flex"} justifyContent={'center'} gap={4} alignItems={"center"}>
                                    {displayedProduct.quantity === 1 ? (<DeleteIcon onClick={() => (dispatch(removeItem(displayedProduct)))} sx={{ color: "red" }} cursor={"pointer"} />) : (<RemoveIcon
                                        onClick={() => (dispatch(decreaseNumber(displayedProduct)))}
                                        cursor={"pointer"} />)}
                                    <p>{displayedProduct.quantity}</p>
                                    <AddIcon onClick={() => (dispatch(increaseNumber(displayedProduct)))} cursor={"pointer"} />

                                </Box>
                            ) :
                            (
                                <Button
                                    onClick={() => (dispatch(addToCart(displayedProduct)))}
                                    cursor={"pointer"} style={{ maxWidth: "100%", }}>Sepete Ekle</Button>
                            )}                    </Box>

                </Box>

            </Box>
        </Container>

    )
}
