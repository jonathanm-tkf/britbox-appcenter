import { NativeModules } from 'react-native';

const { AppleTVController } = NativeModules;

export const VideoStart = (playPosition: number, item: any) => {
  AppleTVController.videoStart({
    playbackDuration: item?.duration || 0,
    elapsedPlaybackTime: playPosition,
    playbackRate: 1,
    playbackDate: new Date().getTime(),
    contentID: item?.id || '0',
    serviceID: 'No',
    isLiveStream: false,
  });
};

export const Play = () => AppleTVController.play();

export const Pause = (seconds: number) => AppleTVController.pause(seconds);

export const Dismissal = () => AppleTVController.dismissal();
