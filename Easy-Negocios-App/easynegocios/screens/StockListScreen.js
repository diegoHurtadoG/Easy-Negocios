import React from "react";

import Layout from '../components/Layout';
import StockList from '../components/Stock/StockList';

const StockListScreen = (props) => (
    <Layout>
        <StockList data={props}/>
    </Layout>
);


export default StockListScreen;