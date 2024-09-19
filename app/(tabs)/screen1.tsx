import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import {Button, Text, View} from 'react-native'

export default function Screen1() {
    const { user } = useUser()
    const { signOut } = useClerk()
    return (
        <View className="h-full flex items-center justify-center">
            <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
                <Button title="Logout" onPress={() => signOut()} />
            </SignedIn>
            <SignedOut>
                <Link href="/sign-in">
                    <Text>Sign In</Text>
                </Link>
                <Link href="/sign-up">
                    <Text>Sign Up</Text>
                </Link>
            </SignedOut>
        </View>
    );
}

