import React, { useEffect, useState } from 'react';
import { Box, Drawer, Avatar, TextField, Menu, Button, Typography } from '@mui/material';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { increaseNumber, decreaseNumber, removeItem, search, displayAllProducts, categorize } from '../slices/ProductsSlice';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const cart = useSelector((state) => state.products.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchedProduct, setSearchedProduct] = useState("");

    const toggleDrawer = (open) => () => {
        setIsOpen(open);
    };

    let cartTotal = 0
    cart.forEach((cartItem) => (
        cartTotal += (cartItem.price * cartItem.quantity)
    ))

    let cartQuantity = 0
    cart.forEach((cartItem) => (
        cartQuantity += cartItem.quantity
    ))

    useEffect(() => {
        dispatch(search(searchedProduct))
    }, [searchedProduct, dispatch])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>

            <Box
                sx={{ backgroundColor: 'black' }}
                position="fixed"
                top={0}
                right={0}
                left={0}
                justifyContent="space-between"
                display="flex"
                alignItems="center"
                zIndex={1000}
                px={{ xs: 2, sm: 4, md: 27 }}
            >
                {/**Menu Starts */}
                <Box >
                    <Button
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon sx={{ fontSize: "25px", color: "white" }} />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{
                            sx: {
                                width: '130px',
                                paddingRight: '10px',
                                paddingLeft: '10px',
                                backgroundColor: "black",
                                color: "white"
                            },
                        }}
                    >
                        <Box>
                            <h4 onMouseOver={(e) => (e.target.style.backgroundColor = "dimgrey")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}

                                style={{ cursor: "pointer" }} onClick={() => (dispatch(categorize("men's clothing")))} >Men's Clothes</h4>
                            <h4
                                onMouseOver={(e) => (e.target.style.backgroundColor = "dimgrey")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                                style={{ cursor: "pointer" }} onClick={() => (dispatch(categorize("women's clothing")))}>Women's Clothes</h4>
                            <h4
                                onMouseOver={(e) => (e.target.style.backgroundColor = "dimgrey")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                                style={{ cursor: "pointer" }} onClick={() => (dispatch(categorize("jewelery")))}>Accessiories</h4>
                            <h4
                                onMouseOver={(e) => (e.target.style.backgroundColor = "dimgrey")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                                style={{ cursor: "pointer" }} onClick={() => (dispatch(categorize("electronics")))}>Electronics</h4>
                        </Box>
                    </Menu>
                </Box>
                {/**Menu Ends */}

                <Box
                    onClick={() => {
                        navigate("/");
                        dispatch(displayAllProducts());
                    }}
                    display="flex"
                    alignItems="center"
                    maxWidth={"137px"}
                    sx={{ cursor: 'pointer', width: { xs: "auto", sm: "auto", md: "100%" } }}
                >
                    <Typography variant="h3" fontWeight={"bold"} fontFamily={"inter"} fontSize={"20px"} sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                        TANZİMAZON
                    </Typography>
                </Box>


                <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 2, width: { xs: "100%", sm: "100%", md: "100%" } }}>
                    <TextField
                        sx={{
                            border: 'none', backgroundColor: "gray",
                            borderRadius: "20px"
                        }}
                        value={searchedProduct}
                        onChange={(e) => setSearchedProduct(e.target.value)}
                        fullWidth
                        variant="outlined"
                        placeholder="Ara..."
                        InputProps={{
                            style: { borderRadius: 20 },
                        }}
                    />
                </Box>

                <Box>
                    <ShoppingCartIcon onClick={toggleDrawer(true)} sx={{ cursor: 'pointer' }} />
                </Box>
            </Box>

            {/**Cart Modal Starts */}
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={toggleDrawer(false)}
                disableEnforceFocus
                disableRestoreFocus
            >

                {cart.length === 0 ?
                    (null) : (
                        <h4 style={{ backgroundColor: "black", color: "white", margin: 0, paddingTop: "10px" }}>Cart ({cartQuantity})</h4>
                    )}

                {cart.length === 0 ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        sx={{ width: 300, p: 2, backgroundColor: 'black', color: 'white' }}
                    >
                        <ProductionQuantityLimitsIcon />
                        <h4 style={{ backgroundColor: "black", color: "white" }}>Your Cart is Empty</h4>
                    </Box>
                ) : (
                    <Box
                        display="flex"
                        flexDirection="column"
                        sx={{ width: 500, p: 2, backgroundColor: 'black', color: 'white' }}
                    >
                        {cart.map((cartItem) => (
                            <Box

                                key={`${cartItem.id}`}
                                display="flex"
                                justifyContent="space-between"
                                flexDirection="column"
                            >
                                <Box display="flex" gap={4} alignItems="center">
                                    <Box
                                        sx={{ width: '50%' }}
                                        display="flex"
                                        gap={1}
                                        alignItems="center"
                                    >
                                        <Avatar src={cartItem.image} />
                                        <p>{cartItem.title}</p>
                                    </Box>

                                    <Box sx={{ width: '15%' }} display="flex">
                                        <p>{cartItem.price} TL</p>
                                    </Box>

                                    <Box
                                        sx={{ width: '30%' }}
                                        display="flex"
                                        gap={1}
                                        alignItems="center"
                                    >
                                        {cartItem.quantity === 1 ? (
                                            <DeleteIcon
                                                onClick={() => dispatch(removeItem(cartItem))}
                                                sx={{ cursor: 'pointer' }}
                                            />
                                        ) : (
                                            <RemoveIcon
                                                onClick={() => dispatch(decreaseNumber(cartItem))}
                                                sx={{ cursor: 'pointer' }}
                                            />
                                        )}
                                        <p>{cartItem.quantity}</p>
                                        <AddIcon
                                            onClick={() => dispatch(increaseNumber(cartItem))}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                        <Box>
                            {
                                <h4>Total: {cartTotal.toFixed(2)} TL </h4>
                            }
                        </Box>
                    </Box>
                )}
            </Drawer>
            {/**Modal Ends */}


        </Box>



    );
}
