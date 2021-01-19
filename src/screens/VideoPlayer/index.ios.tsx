/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import ReactNativeBitmovinPlayer from '@takeoffmedia/react-native-bitmovin-player';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { navigationGoBack } from '@src/navigation/rootNavigation';
import Action from '@components/Action';
import { getNextItem, PlayVideo } from '@src/services/Video';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { ErrorCode, VideoResponse } from '@src/services/Video/types';
import { useTranslation } from 'react-i18next';
import { BackIcon } from '@assets/icons';
import { Config } from '@src/utils/config';
import ScreenOrientation, { UNLOCK } from 'react-native-orientation-locker/ScreenOrientation';
import Orientation from 'react-native-orientation-locker';
import { delay } from 'lodash';
import { isTablet } from 'react-native-device-info';
import { continueWatchingRequest } from '@store/modules/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { getDescription, getProgress, getTitle } from '@src/services/util';
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
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState<VideoResponse>();
  const [nextData, setnextData] = useState<{
    item: MassiveSDKModelItemSummary | undefined;
    currentTime: number;
  }>();
  const [error, setError] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [supportedOrientations] = useState<'landscape'[]>(isTablet() ? [] : ['landscape']);
  const [errorMessage, setErrorMessage] = useState<ErrorCode>();
  const [loading, setLoading] = useState(false);
  const { setParams } = useNavigation();
  const { params } = useRoute<VideoPlayerScreenRouteProp>();
  const { watched } = useSelector((state: AppState) => state.detail);

  const asyncPlayVideo = useCallback(async (dataParams) => {
    setLoading(true);
    await PlayVideo({
      ...dataParams,
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
  }, []);

  useEffect(() => {
    asyncPlayVideo(params);
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
            dispatch(continueWatchingRequest());
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
                title: getTitle(params.item),
                subtitle: getDescription(params.item),
                url: videoData?.mediaUrl || '',
                poster: videoData?.imageUrl || '',
                subtitles: videoData?.customData?.subtitles,
                thumbnails: videoData?.customData?.thumbnails,
                startOffset: params.currentTime,
                nextPlayback: 30,
              }}
              onLoad={() => {
                console.tron.log({ event: 'load' });
                getNextItem(params.item?.id || '0')
                  .then((data) => {
                    console.tron.log({ data });
                    setnextData({
                      item: data?.next || undefined,
                      currentTime: getProgress(data?.next?.id || '0', watched),
                    });
                    //   setTimeout(() => {
                    //     setParams({
                    //       item: data?.next || undefined,
                    //       currentTime: getProgress(data?.next?.id || '0', watched),
                    //     });
                    //     asyncPlayVideo({ item: data?.next || undefined });
                    //   }, 10000);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
              onPlaying={() => {
                console.tron.log({ event: 'play' });
              }}
              onPause={() => {
                console.tron.log({ event: 'pause' });
              }}
              onEvent={({ nativeEvent }) => {
                console.tron.log({ event: nativeEvent });

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
