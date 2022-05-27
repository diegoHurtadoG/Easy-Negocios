import React from "react";

import Layout from '../components/Layout';
import OrderProductRelationList from '../components/OrderProductRelation/OrderProductRelationList';

const OrderProductRelationListScreen = (props) => (
    <Layout>
        <OrderProductRelationList data={props}/>
    </Layout>
);


export default OrderProductRelationListScreen;