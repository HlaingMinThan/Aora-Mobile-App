import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, onPress, containerStyle, isLoading, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading}
      className={` bg-secondary h-[62px] justify-center  items-center rounded-xl ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
    >
      <Text className={`${textStyle} text-primary text-lg font-psemibold`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton