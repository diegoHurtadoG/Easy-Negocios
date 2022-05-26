import { FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { getProducts } from '../../api';
import StockItem from './StockItem';

const StockList = (props) => {

  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadProducts = async (id) => {
    const data = await getProducts(id);
    setProducts(data);
  };

  // Every time the screen loads, the useEffect runs
  useEffect(() => {
    loadProducts(props.data.route.params.project_id);
  }, [isFocused]);

  const renderItem = ({ item }) => {

    return <StockItem product={item}/>;

  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadProducts(props.data.route.params.project_id);
    setRefreshing(false);
  })

  return (
    <FlatList
      style={{
        width: '100%',
      }}
      data={products}
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

export default StockList;