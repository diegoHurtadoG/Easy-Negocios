import { View, Text, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { getProjects } from '../api'

const HomeScreen = () => {

    const [projects, setProjects] = useState([])

    const loadProjects = async () => {
        const data = await getProjects()
        console.log(data)
    }

    // Every time the screen loads, the useEffect runs
    useEffect(() => {

        loadProjects()

    }, [])

  return (
    <View>
      <FlatList
       data={projects}
       renderItem={() => (
           <Text>Hello World</Text>
       )}>

      </FlatList>
    </View>
  )
}

export default HomeScreen