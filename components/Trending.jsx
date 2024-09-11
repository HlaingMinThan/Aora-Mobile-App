import { Text, FlatList } from 'react-native'
import React from 'react'
import TrendingItem from './TrendingItem';

const Trending = ({ videos }) => {
    return (
        <>
            {videos.length && <Text className="text-gray-100 text-lg mt-3">Trending Videos</Text>}
            <FlatList
                horizontal
                data={videos}
                renderItem={({ item }) => <TrendingItem video={item} />}
                keyExtractor={(item) => item.id}
            />
        </>
    )
}

export default Trending