import { FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { getInvestments, deleteInvestment } from '../../api';
import InvestmentItem from './InvestmentItem';

const InvestmentList = (props) => {

  const [investments, setInvestments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadInvestments = async (id) => {
    const data = await getInvestments(id);
    setInvestments(data);
  };

  // Every time the screen loads, the useEffect runs
  useEffect(() => {
    loadInvestments(props.data.route.params.project_id);
  }, [isFocused]);

  const handleDelete = async (project_id, investment_id) => {
    await deleteInvestment(project_id, investment_id)
    await loadInvestments(project_id)
  }

  const renderItem = ({ item }) => {

    return <InvestmentItem investment={item} handleDelete={handleDelete} />;

  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadInvestments(props.data.route.params.project_id);
    setRefreshing(false);
  })

  return (
    <FlatList
      style={{
        width: '100%',
      }}
      data={investments}
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

export default InvestmentList;