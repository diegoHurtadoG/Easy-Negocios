import React from "react";

import Layout from '../components/Layout';
import SaleProductRelationList from '../components/SaleProductRelation/SaleProductRelationList';

const SaleProductRelationListScreen = (props) => (
    <Layout>
        <SaleProductRelationList data={props}/>
    </Layout>
);


export default SaleProductRelationListScreen;