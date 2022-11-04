import { Platform } from 'react-native';

export const isNative = (): boolean => Platform.OS === 'ios' || Platform.OS === 'android';
