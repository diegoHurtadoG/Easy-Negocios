import { FlatList, RefreshControl, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { getSaleProductRelations, deleteSaleProductRelation, getProduct, getSale } from '../../api';
import SaleProductRelationItem from './SaleProductRelationItem';

const SaleProductRelationList = (props) => {

  const [saleProductRelations, setSaleProductRelations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadSaleProductRelations = async (id) => {
    const data = await getSaleProductRelations(id);
    setSaleProductRelations(data);
  };

  // Every time the screen loads, the useEffect runs
  useEffect(() => {
    loadSaleProductRelations(props.data.route.params.project_id);
  }, [isFocused]);

  const handleDelete = async (project_id, saleProductRelation_id) => {
    await deleteSaleProductRelation(project_id, saleProductRelation_id)
    await loadSaleProductRelations(project_id)
  }

  const renderItem = ({ item }) => {

    return <SaleProductRelationItem saleProductRelation={item} handleDelete={handleDelete}/>;

  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadSaleProductRelations(props.data.route.params.project_id);
    setRefreshing(false);
  })

  return (
    <FlatList
      style={{
        width: '100%',
      }}
      data={saleProductRelations}
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

export default SaleProductRelationList;