import { FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { getClients, deleteClient } from '../../api';
import ClientItem from './ClientItem';

const ClientList = (props) => {

  const [clients, setClients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadClients = async (id) => {
    const data = await getClients(id);
    setClients(data);
  };

  // Every time the screen loads, the useEffect runs
  useEffect(() => {
    loadClients(props.data.route.params.project_id);
  }, [isFocused]);

  const handleDelete = async (project_id, client_id) => {
    await deleteClient(project_id, client_id)
    await loadClients(project_id)
  }

  const renderItem = ({ item }) => {

    return <ClientItem client={item} handleDelete={handleDelete} />;

  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadClients(props.data.route.params.project_id);
    setRefreshing(false);
  })

  return (
    <FlatList
      style={{
        width: '100%',
      }}
      data={clients}
      keyExtractor={(item) => item.id + ''}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh} />
      }
    />
  );
};

export default ClientList;