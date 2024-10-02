import { atom } from 'jotai';
import * as SecureStore from 'expo-secure-store';

export const tokenAtom = atom<string | null>(null);

export const fetchTokenAtom = atom(
    null,
    async (get, set) => {
        const token = await SecureStore.getItemAsync('userToken');
        set(tokenAtom, token);
    }
);