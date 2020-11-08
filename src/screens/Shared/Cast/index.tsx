/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import GoogleCast, { CastDevice, CastState } from 'react-native-google-cast';
import { useDispatch, useSelector } from 'react-redux';
import {
  castOn,
  castOff,
  setCastState,
  castVideoPlayerDetailClear,
  toggleMiniController,
  castPosition,
} from '@store/modules/layout/actions';
import {
  castDetailClear,
  castingOff,
  castingOn,
  castDetail as castDetailAction,
  hideForceChromecast,
} from '@store/modules/core/actions';
import { AppState } from '@store/modules/rootReducer';
import { ChromecastPlay, ChromecastPause } from '@assets/icons';
import { store } from '@store/index';
import { CastDetail, LayoutState } from '@store/modules/layout/types';
import { useTranslation } from 'react-i18next';
import { PostMessage } from '@src/utils/videoPlayerRef';
import { CoreState } from '@store/modules/core/types';
import { navigationRef } from '@src/navigation/rootNavigation';
import { getTextInConfigJSON } from '@src/utils/object';
import {
  CastButton,
  MiniController,
  MiniImage,
  MiniWrapperText,
  MiniTitle,
  MiniSubtitle,
  MiniExpandButton,
  MiniExpandButtonIcon,
} from './styles';

const getItemCastDetail = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout?.castDetail || {};
};

const getCastPosition = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout?.castPosition || {};
};

const getCastState = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout?.castState || {};
};

const getCoreCastDetail = () => {
  const { core }: { core: CoreState } = store.getState();
  return core?.castDetail || {};
};

const Cast = () => {
  const { t } = useTranslation('layout');
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stateChromecast, setStateChromecast] = useState<CastState | undefined>(undefined);
  const [device, setDevice] = useState<CastDevice | undefined>(undefined);
  const { castState, isShowMiniController } = useSelector((state: AppState) => state.layout);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { casting, castDetail, forceChromecast } = useSelector((state: AppState) => state.core);
  const registerListeners = () => {
    const events = `
      SESSION_STARTING SESSION_STARTED SESSION_START_FAILED SESSION_SUSPENDED
      SESSION_RESUMING SESSION_RESUMED SESSION_ENDING SESSION_ENDED
      MEDIA_STATUS_UPDATED MEDIA_PLAYBACK_STARTED MEDIA_PLAYBACK_ENDED MEDIA_PROGRESS_UPDATED
      CHANNEL_CONNECTED CHANNEL_DISCONNECTED CHANNEL_MESSAGE_RECEIVED
    `
      .trim()
      .split(/\s+/);

    events.forEach((event) => {
      GoogleCast.EventEmitter.addListener(GoogleCast[event], () => {
        if (event === 'SESSION_STARTING') {
          const { name } = navigationRef.current && navigationRef.current.getCurrentRoute();
          if (name === 'VideoPlayer') {
            dispatch(setCastState('sending'));
            navigationRef.current!.goBack();
          }
        }

        if (event === 'SESSION_STARTED') {
          GoogleCast.initChannel('urn:x-cast:com.reactnative.googlecast.britbox');
          dispatch(castOn());

          const { currentTime, item } = getItemCastDetail() as CastDetail;

          if (currentTime && item) {
            dispatch(setCastState('loading'));
          }
        }

        if (event === 'SESSION_ENDING') {
          dispatch(castingOff());
        }
      });
    });

    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_STARTED, ({ mediaStatus }) => {
      if (mediaStatus && (mediaStatus?.playerState || 0) === 2) {
        dispatch(castingOn());
      }
    });

    GoogleCast.EventEmitter.addListener(GoogleCast.CHANNEL_MESSAGE_RECEIVED, ({ message }) => {
      const { eventError } = JSON.parse(message) || {};
      if (eventError) {
        const { detailedErrorCode } = eventError;
        if (detailedErrorCode === 905) {
          dispatch(castVideoPlayerDetailClear());
          dispatch(setCastState('error'));
        }

        return;
      }

      const { id } = getCoreCastDetail();
      const {
        mediaMetadata,
        mediaCustomData: { itemVideoMassiveId },
      } = JSON.parse(message) || {};
      if (id !== itemVideoMassiveId && getCastState() === 'loaded') {
        dispatch(castDetailAction({ id: itemVideoMassiveId, ...mediaMetadata }));
      }
    });

    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_STATUS_UPDATED, ({ mediaStatus }) => {
      const { playerState } = mediaStatus;
      setIsPlaying(playerState !== 3);
    });
  };

  useEffect(() => {
    registerListeners();
    if (forceChromecast) {
      setShowButton(true);
    }

    const intervalCheckChromecast = setInterval(() => {
      GoogleCast.getCastState().then((state, ...rest) => {
        setStateChromecast(state === 'NotConnected' ? t('loading') : state);
        if (state === 'NoDevicesAvailable' && !forceChromecast) {
          PostMessage({
            type: 'chromecast',
            value: false,
          });
          setShowButton(false);
        } else {
          PostMessage({
            type: 'chromecast',
            value: true,
          });
          if (state === 'NotConnected') {
            setShowButton(true);
          }
        }

        if (state === 'Connected' && !isShowMiniController) {
          setShowButton(true);
        }

        dispatch(state === 'NotConnected' || state === 'NoDevicesAvailable' ? castOff() : castOn());
      });

      GoogleCast.getCastDevice()
        .then((deviceItem) => {
          if (deviceItem !== undefined) {
            setDevice(deviceItem);
          }
        })
        .catch(() => {});
    }, 1000);

    return () => {
      dispatch(setCastState(undefined));
    };
  }, []);

  useEffect(() => {
    try {
      if (casting && device) {
        dispatch(setCastState('loaded'));
        GoogleCast.launchExpandedControls();
      }
      // TODO: check this
    } catch (error) {
      //
    }
  }, [casting]);

  useEffect(() => {
    if (castDetail && castDetail?.title === t('loading')) {
      dispatch(castingOff());
    }
  }, []);

  useEffect(() => {
    if (castDetail) {
      dispatch(setCastState('loaded'));
      dispatch(toggleMiniController(true));
    }
  }, [castDetail]);

  useEffect(() => {
    if (!forceChromecast && device === undefined) {
      setShowButton(false);
    }
  }, [forceChromecast, device]);

  const togglePlay = () => {
    if (device) {
      if (isPlaying) {
        GoogleCast.pause();
      } else {
        GoogleCast.play();
      }
    }
  };

  return (
    <>
      {showButton && !isShowMiniController && (
        <CastButton
          onLayout={(e) => {
            const { x, y } = e.nativeEvent.layout;
            const { x: positionX, y: positionY } = getCastPosition();
            if (x !== 0 && y !== 0 && (positionX && positionY) === 0) {
              dispatch(castPosition({ x, y }));
            }
          }}
          onPress={() => {
            setTimeout(() => {
              dispatch(hideForceChromecast());
            }, 1000);
          }}
        />
      )}
      {isShowMiniController && (
        <MiniController>
          <MiniExpandButton
            onPress={() =>
              castState === 'error'
                ? GoogleCast.showCastPicker()
                : GoogleCast.launchExpandedControls()
            }
          >
            {castDetail?.images && castState !== 'error' && (
              <MiniImage
                source={{
                  uri: castDetail?.images
                    ?.filter((item: { url: string }) => item.url !== 'no-image')
                    .reduce((a: any) => a).url,
                }}
              />
            )}
            <MiniWrapperText>
              <MiniTitle>
                {castState === 'error'
                  ? getTextInConfigJSON(['chromecast', 'error-couldnt-play'], '')
                  : castState === 'loaded'
                  ? castDetail?.title
                  : castState === 'loading'
                  ? t('loading')
                  : device
                  ? `${stateChromecast} ${t('to')} ${device?.name}`
                  : stateChromecast}
              </MiniTitle>
              {castState === 'loaded' && castDetail?.subtitle && (
                <MiniSubtitle>{castDetail?.subtitle}</MiniSubtitle>
              )}
            </MiniWrapperText>
            {castState !== 'error' && castState !== 'loading' && (
              <MiniExpandButtonIcon onPress={() => togglePlay()}>
                {isPlaying ? (
                  <ChromecastPause fill={theme.PRIMARY_TEXT_COLOR} width={30} height={30} />
                ) : (
                  <ChromecastPlay fill={theme.PRIMARY_TEXT_COLOR} width={30} height={30} />
                )}
              </MiniExpandButtonIcon>
            )}
          </MiniExpandButton>
        </MiniController>
      )}
    </>
  );
};

export default Cast;
