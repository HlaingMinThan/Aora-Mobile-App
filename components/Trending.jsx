import { Text, FlatList } from 'react-native'
import React from 'react'

const Trending = ({ posts }) => {
    return (
        <>
            {posts.length && <Text className="text-gray-100 text-lg">Latest Videos</Text>}
            <FlatList
                horizontal
                data={posts}
                renderItem={({ item }) => <Text className="text-white">{item.id}</Text>}

                keyExtractor={(item) => item.id}
            />
        </>
    )
}

export default Trending