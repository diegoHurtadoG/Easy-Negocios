import React from "react";

import Layout from '../components/Layout';
import ClientList from '../components/Clients/ClientList';

const ClientListScreen = (props) => (
    <Layout>
        <ClientList data={props}/>
    </Layout>
);


export default ClientListScreen;