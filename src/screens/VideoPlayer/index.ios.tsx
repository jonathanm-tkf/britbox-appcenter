/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from 'react-native-modal';
import ReactNativeBitmovinPlayer from '@takeoffmedia/react-native-bitmovin-player';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { navigationGoBack } from '@src/navigation/rootNavigation';
import Action from '@components/Action';
import { getNextItem, PlayVideo } from '@src/services/Video';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import {
  ErrorCode,
  ValidateParentalControlResponse,
  VideoResponse,
} from '@src/services/Video/types';
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
import NextEpisode from '@components/NextEpisode';
import { BritboxAccountApi } from '@src/sdks';
import ParentalControl from '@components/ParentalControl';
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
  const [nextData, setNextData] = useState<{
    item: MassiveSDKModelItemSummary | undefined;
    currentTime: number;
  }>();
  const [showNextEpisode, setShowNextEpisode] = useState<true | false | undefined>(undefined);
  const [error, setError] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [supportedOrientations] = useState<'landscape'[]>(isTablet() ? [] : ['landscape']);
  const [errorMessage, setErrorMessage] = useState<ErrorCode>();
  const [loading, setLoading] = useState(false);
  const { setParams } = useNavigation();
  const { params } = useRoute<VideoPlayerScreenRouteProp>();
  const { watched } = useSelector((state: AppState) => state.detail);
  const user = useSelector((state: AppState) => state.user);
  const core = useSelector((state: AppState) => state.core);
  const sheetRef = useRef<any>(undefined);

  const asyncPlayVideo = useCallback(async (dataParams) => {
    setLoading(true);
    await PlayVideo({
      ...dataParams,
    })
      .then((response) => {
        const { video } = response;
        setVideoData({ ...video });
        // console.log({ video });
        setError(false);
        setErrorMessage(undefined);
        setLoading(false);
      })
      .catch((e: ErrorCode) => {
        // console.tron.log({ e });
        setErrorMessage(e);
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    asyncPlayVideo(params);
  }, [params]);

  const playNextEpisode = useCallback(
    async (pcToken = '') => {
      setShowNextEpisode(false);
      const itemPlayback = nextData?.item;
      if (user.profile?.parentalControl && pcToken === '') {
        const { checkParentalControl } = BritboxAccountApi({
          headers: {
            Authorization: `Bearer ${core.token}`,
          },
        });
        const { canStream } = await checkParentalControl({
          classificationName: itemPlayback?.classification?.name || '',
          segment: core.segment,
        });
        if (!canStream) {
          if (sheetRef.current) {
            sheetRef.current.open();
          }
          return true;
        }
      }

      setParams({
        item: nextData?.item || undefined,
        currentTime: getProgress(nextData?.item?.id || '0', watched),
        pcToken,
      });

      return true;
    },
    [core.segment, core.token, nextData?.item, setParams, user.profile?.parentalControl, watched]
  );

  return (
    <>
      <SafeArea>
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
                // console.tron.log({ event: 'load' });
                getNextItem(params.item?.id || '0')
                  .then((data) => {
                    setNextData({
                      item: data?.next || undefined,
                      currentTime: getProgress(data?.next?.id || '0', watched),
                    });
                  })
                  .catch((e) => {
                    // console.log(e);
                  });
              }}
              onPlaying={() => {
                // console.tron.log({ event: 'play' });
              }}
              onPause={() => {
                // console.tron.log({ event: 'pause' });
              }}
              onEvent={({ nativeEvent }) => {
                if (nativeEvent.message === 'next') {
                  setShowNextEpisode(true);
                }
                if (nativeEvent.message === 'closePlayer') {
                  setModalIsVisible(false);
                }
              }}
            />
          )}
          {showNextEpisode !== undefined && nextData?.item && (
            <NextEpisode
              active={showNextEpisode}
              data={nextData?.item}
              onClose={() => {
                setShowNextEpisode(false);
              }}
              onNext={() => playNextEpisode()}
            />
          )}
          <ParentalControl
            ref={sheetRef}
            item={nextData?.item}
            onSuccess={(data: ValidateParentalControlResponse) => {
              if (sheetRef.current) {
                sheetRef.current.close();
              }
              playNextEpisode(data.pcToken);
            }}
          />
        </Modal>
      </SafeArea>
    </>
  );
};

export default VideoPlayerNative;