import { Platform } from 'react-native';
import DetailIOS from './index.ios';
import DetailAndroid from './index.android';

export default Platform.OS === 'ios' ? DetailIOS : DetailAndroid;
