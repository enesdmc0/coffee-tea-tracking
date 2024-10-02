import { Link } from 'expo-router'
import {Button, Text, View} from 'react-native'

export default function Screen1() {
  
    return (
        <View className="h-full flex items-center justify-center">
     
                <Link href="/sign-in">
                    <Text>Sign In</Text>
                </Link>
                <Link href="/sign-up">
                    <Text>Sign Up</Text>
                </Link>
        </View>
    );
}

