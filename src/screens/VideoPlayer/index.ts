import { Platform } from 'react-native';
import VideoIOS from './index.ios';
import VideoAndroid from './index.android';

export default Platform.OS === 'ios' ? VideoIOS : VideoAndroid;
