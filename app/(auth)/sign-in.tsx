import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignIn = () => {
  return (
    <View className='h-full flex items-center justify-center'>
      <Text>SignIn</Text>
      <Link href="/screen1">Screen1</Link>
    </View>
  )
}

export default SignIn