/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import ReactNativeBitmovinPlayer from '@takeoffmedia/react-native-bitmovin-player';
import { RouteProp, useRoute } from '@react-navigation/native';
import { navigationGoBack } from '@src/navigation/rootNavigation';
import Action from '@components/Action';
import { PlayVideo } from '@src/services/Video';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { ErrorCode, VideoResponse } from '@src/services/Video/types';
import { useTranslation } from 'react-i18next';
import { BackIcon } from '@assets/icons';
import { Config } from '@src/utils/config';
import ScreenOrientation, { UNLOCK } from 'react-native-orientation-locker/ScreenOrientation';
import Orientation from 'react-native-orientation-locker';
import { delay } from 'lodash';
import { isTablet } from 'react-native-device-info';
import { SafeArea, Loading, ErrorWrapper, ErrorText, Back } from './styles-ios';

type RootParamList = {
  VideoPlayer: {
    item: MassiveSDKModelItemSummary;
    isTrailer: boolean;
    pcToken?: string;
    currentTime: number;
  };
};

type VideoPlayerScreenRouteProp = RouteProp<RootParamList, 'VideoPlayer'>;

const modalStyles = { marginHorizontal: 0, marginVertical: 0 };

const VideoPlayerNative = () => {
  const { t } = useTranslation('layout');
  const [videoData, setVideoData] = useState<VideoResponse>();
  const [error, setError] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [supportedOrientations] = useState<'landscape'[]>(isTablet() ? [] : ['landscape']);
  const [errorMessage, setErrorMessage] = useState<ErrorCode>();
  const [loading, setLoading] = useState(false);
  const { params } = useRoute<VideoPlayerScreenRouteProp>();

  useEffect(() => {
    (async function asyncPlayVideo() {
      setLoading(true);
      await PlayVideo({
        ...params,
      })
        .then((response) => {
          const { video } = response;
          setVideoData({ ...video });
          console.log({ video });
          setError(false);
          setErrorMessage(undefined);
          setLoading(false);
        })
        .catch((e: ErrorCode) => {
          console.tron.log({ e });
          setErrorMessage(e);
          setError(true);
          setLoading(false);
        });
    })();
  }, [params]);

  return (
    <>
      <ScreenOrientation orientation={UNLOCK} />
      <Modal
        style={modalStyles}
        useNativeDriver
        supportedOrientations={supportedOrientations}
        animationIn="fadeIn"
        animationInTiming={500}
        animationOut="fadeOut"
        animationOutTiming={50}
        backdropOpacity={1}
        isVisible={modalIsVisible}
        onModalHide={() => {
          delay(() => {
            Orientation.lockToPortrait();
            navigationGoBack();
          }, 150);
        }}
      >
        <SafeArea>
          {loading ? (
            <Loading>
              <Action width={88} height={88} loading animated loop autoPlay />
            </Loading>
          ) : error ? (
            <ErrorWrapper>
              <Back onPress={() => setModalIsVisible(false)}>
                <BackIcon width={22} height={22} />
              </Back>
              <ErrorText>{t('videoNotAvailable')}</ErrorText>
              <ErrorText>{t('videoNotAvailableSecond')}</ErrorText>
              <ErrorText>
                {t('errorMessage')} {errorMessage?.errorCode}
              </ErrorText>
              {Config.ENVIRONMENT === 'STAGING' && (
                <ErrorText>
                  {t('dev')} {errorMessage?.devMessage}
                </ErrorText>
              )}
            </ErrorWrapper>
          ) : (
            <ReactNativeBitmovinPlayer
              autoPlay
              configuration={{
                url: videoData?.mediaUrl || '',
                poster: videoData?.imageUrl || '',
                subtitles: videoData?.customData?.subtitles,
                thumbnails: videoData?.customData?.thumbnails,
              }}
              onLoad={() => {
                console.tron.log({ event: 'load' });
              }}
              onPlaying={() => {
                console.tron.log({ event: 'play' });
              }}
              onPause={() => {
                console.tron.log({ event: 'pause' });
              }}
              onEvent={({ nativeEvent }) => {
                if (nativeEvent.message === 'closePlayer') {
                  setModalIsVisible(false);
                }
              }}
            />
          )}
        </SafeArea>
      </Modal>
    </>
  );
};

export default VideoPlayerNative;
