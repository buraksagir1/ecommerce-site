import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decreaseNumber, getAllProducts, increaseNumber, removeItem } from '../slices/ProductsSlice'
import { Grid, Box, Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductGrid() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    const products = useSelector((state) => (state.products.products))


    return (
        <Container >
            <Box mt={5} sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ sm: 3, md: 3 }}>
                    {products.map((p) => (
                        <Grid item marginTop={10} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} maxHeight={"500px"} maxWidth={"390px"} key={p.id} xs={12} sm={6} md={3}>
                            <img onClick={() => (navigate("/product/" + p.id))} style={{ maxWidth: "290px", height: "290px", cursor: "pointer", borderRadius: "10px" }} src={p.image} alt="" />
                            <h4 style={{ maxWidth: "300px", cursor: "pointer" }}>{p.title}</h4>
                            <h4 style={{ marginTop: "0px", cursor: "pointer" }}>{p.price} TL</h4>
                            {p.inCart ?
                                (
                                    <Box sx={{ width: "100%" }} display={"flex"} justifyContent={'center'} gap={4} alignItems={"center"}>
                                        {p.quantity === 1 ? (<DeleteIcon onClick={() => (dispatch(removeItem(p)))} sx={{ color: "red" }} cursor={"pointer"} />) : (<RemoveIcon
                                            onClick={() => (dispatch(decreaseNumber(p)))}
                                            cursor={"pointer"} />)}
                                        <p>{p.quantity}</p>
                                        <AddIcon onClick={() => (dispatch(increaseNumber(p)))} cursor={"pointer"} />

                                    </Box>
                                ) :
                                (
                                    <Button
                                        onClick={() => (dispatch(addToCart(p)
                                        ))}
                                        cursor={"pointer"} style={{ maxWidth: "300px", }}>Add to Cart</Button>
                                )}

                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Container>
    )
}
