import { FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { getCategories, deleteCategory } from '../../api';
import CategoryItem from './CategoryItem';

const CategoryList = (props) => {

    const [categories, setCategories] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    const loadCategories = async (id) => {
        const data = await getCategories(id);
        setCategories(data);
    };

    // Every time the screen loads, the useEffect runs
    useEffect(() => {
        loadCategories(props.data.route.params.project_id);
    }, [isFocused]);

    const handleDelete = async (project_id, category_id) => {
        await deleteCategory(project_id, category_id)
        await loadCategories(project_id)
    }

    const renderItem = ({ item }) => {

        return <CategoryItem category={item} handleDelete={handleDelete} />;

    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadCategories(props.data.route.params.project_id);
        setRefreshing(false);
    })

    return (
        <FlatList
            style={{
                width: '100%',
            }}
            data={categories}
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

export default CategoryList;