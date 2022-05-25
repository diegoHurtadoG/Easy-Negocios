import React from "react";

import Layout from '../components/Layout';
import ProductList from '../components/Products/ProductList';

const ProductListScreen = (props) => (
    <Layout>
        <ProductList productData={props}/>
    </Layout>
);


export default ProductListScreen;