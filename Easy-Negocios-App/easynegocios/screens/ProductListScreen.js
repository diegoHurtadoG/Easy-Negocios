import React from "react";

import Layout from '../components/Layout';
import ProductList from '../components/Products/ProductList';

const ProductListScreen = (props) => (
    <Layout>
        <ProductList data={props}/>
    </Layout>
);


export default ProductListScreen;