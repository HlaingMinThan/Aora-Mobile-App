import { Text, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import TrendingItem from './TrendingItem';

const Trending = ({ videos }) => {
    let [activeItem, setActiveItem] = useState(2);
    let onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems?.length) {
            setActiveItem(viewableItems[0].key);
        }
    }
    const windowWidth = Dimensions.get('window').width;
    const itemWidth = windowWidth * 0.5;

    return (
        <>
            {videos.length && <Text className="text-gray-100 text-lg mt-3">Trending Videos</Text>}
            <FlatList
                horizontal
                data={videos}
                renderItem={({ item }) => <TrendingItem video={item} activeItem={activeItem} />}
                snapToAlignment="center"  // Snap to center
                snapToInterval={itemWidth} // Adjust interval based on item width
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 70
                }}
            />
        </>
    )
}

export default Trending