import { FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { getOrderProductRelations, deleteOrderProductRelation, getProduct, getOrder } from '../../api';
import OrderProductRelationItem from './OrderProductRelationItem';

const OrderProductRelationList = (props) => {

  const [orderProductRelations, setOrderProductRelations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadOrderProductRelations = async (id) => {
    const data = await getOrderProductRelations(id);
    setOrderProductRelations(data);
  };

  // Every time the screen loads, the useEffect runs
  useEffect(() => {
    loadOrderProductRelations(props.data.route.params.project_id);
  }, [isFocused]);

  const handleDelete = async (project_id, orderProductRelation_id) => {
    await deleteOrderProductRelation(project_id, orderProductRelation_id)
    await loadOrderProductRelations(project_id)
  }

  const renderItem = ({ item }) => {

    return <OrderProductRelationItem orderProductRelation={item} handleDelete={handleDelete} />;

  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadOrderProductRelations(props.data.route.params.project_id);
    setRefreshing(false);
  })

  return (
    <FlatList
      style={{
        width: '100%',
      }}
      data={orderProductRelations}
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

export default OrderProductRelationList;