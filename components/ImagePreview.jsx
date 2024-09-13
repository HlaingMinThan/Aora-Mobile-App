import { Image, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ImageViewing from "react-native-image-viewing";

const ImagePreview = ({ images }) => {
    const [visible, setIsVisible] = useState(false);
    return (
        <View>
            <ImageViewing
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => { setIsVisible(false) }}
            />
            <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Image source={{ uri: images[0].uri }} className="w-full h-40 rounded-2xl mt-2 bg-black-100 justify-center items-center" />
            </TouchableOpacity>
        </View >
    )
}

export default ImagePreview