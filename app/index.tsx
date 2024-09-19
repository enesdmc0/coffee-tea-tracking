import { Link } from 'expo-router';
import {Text, View} from 'react-native';

export default function Home() {
    return (
        <View className="bg-red-400 h-full flex items-center justify-center ">
            <Link href="/sign-in">Sign In</Link>
        </View>
    );
}

