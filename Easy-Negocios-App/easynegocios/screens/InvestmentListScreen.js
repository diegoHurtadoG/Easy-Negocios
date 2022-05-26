import React from "react";

import Layout from '../components/Layout';
import InvestmentList from '../components/Investments/InvestmentList';

const InvestmentListScreen = (props) => (
    <Layout>
        <InvestmentList data={props}/>
    </Layout>
);


export default InvestmentListScreen;