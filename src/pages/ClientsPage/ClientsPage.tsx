import React from 'react';
import ClientList from '../../components/ClientList/ClientList';

const ClientsPage: React.FC = () => {
    return (
        <div>
            <h1>Clients</h1>
            <ClientList />
        </div>
    );
};

export default ClientsPage;
