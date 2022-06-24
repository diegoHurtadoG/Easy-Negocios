import React from "react";

import Layout from '../components/Layout';
import CashFlux from '../components/CashFlux/CashFlux';

const CashFluxScreen = (props) => (
    <Layout>
        <CashFlux data={props}/>
    </Layout>
);


export default CashFluxScreen;