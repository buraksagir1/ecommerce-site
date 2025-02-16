import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DisplayProduct from '../components/DisplayProduct'
import ProductGrid from '../components/ProductGrid'

export default function RouterConfig() {
    return (
        <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/product/:productId" element={<DisplayProduct />} />
        </Routes>
    )
}
