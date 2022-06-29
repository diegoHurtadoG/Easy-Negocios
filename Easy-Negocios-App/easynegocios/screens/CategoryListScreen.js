import React from "react";

import Layout from '../components/Layout';
import CategoryList from '../components/Categories/CategoryList';

const CategoryListScreen = (props) => (
    <Layout>
        <CategoryList data={props}/>
    </Layout>
);


export default CategoryListScreen;