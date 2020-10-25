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
} from '@store/modules/layout/actions';
import {
  castDetailClear,
  castingOff,
  castingOn,
  castDetail as castDetailAction,
  hideForceChromecast,
} from '@store/modules/core/actions';
import { AppState } from '@store/modules/rootReducer';
import { ChromecastIcon } from '@assets/icons';
import { store } from '@store/index';
import { CastDetail, LayoutState } from '@store/modules/layout/types';
import { useTranslation } from 'react-i18next';
import { PostMessage } from '@src/utils/videoPlayerRef';
import { useNavigation } from '@react-navigation/native';
import { CoreState } from '@store/modules/core/types';
import { navigateByPath, navigationRef, pop } from '@src/navigation/rootNavigation';
import { getTextInConfigJSON } from '@src/utils/object';
import {
  FABView,
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

const getCoreCastDetail = () => {
  const { core }: { core: CoreState } = store.getState();
  return core?.castDetail || {};
};

const Cast = () => {
  const { t } = useTranslation('layout');
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const [showButton, setShowButton] = useState(false);
  const [showMiniController, setShowMiniController] = useState(false);
  const [stateChromecast, setStateChromecast] = useState<CastState | undefined>(undefined);
  const [device, setDevice] = useState<CastDevice | undefined>(undefined);
  const { cast, castState } = useSelector((state: AppState) => state.layout);
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
          setShowMiniController(true);
          const { name } = navigationRef.current && navigationRef.current.getCurrentRoute();
          if (name === 'VideoPlayer') {
            dispatch(setCastState('sending'));
            navigationRef.current!.goBack();
          }
        }

        if (event === 'SESSION_STARTED') {
          GoogleCast.initChannel('urn:x-cast:com.reactnative.googlecast.britbox');
          dispatch(castOn());
          timer();

          const { currentTime, item } = getItemCastDetail() as CastDetail;

          if (currentTime && item) {
            dispatch(setCastState('loading'));
          }
        }

        // if (event === 'MEDIA_PLAYBACK_STARTED') {
        // }

        if (event === 'SESSION_ENDED') {
          dispatch(castingOff());
          dispatch(castOff());
          dispatch(castVideoPlayerDetailClear());
          dispatch(castDetailClear());
          setShowMiniController(false);
        }
      });
    });

    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_STARTED, ({ mediaStatus }) => {
      if (mediaStatus && (mediaStatus?.playerState || 0) === 2) {
        dispatch(castingOn());
        dispatch(setCastState(undefined));
      }
    });

    GoogleCast.EventEmitter.addListener(GoogleCast.CHANNEL_MESSAGE_RECEIVED, ({ message }) => {
      const { eventError } = JSON.parse(message) || {};

      if (eventError) {
        const { detailedErrorCode } = eventError;
        if (detailedErrorCode === 905) {
          dispatch(castVideoPlayerDetailClear());
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
      if (id !== itemVideoMassiveId) {
        dispatch(castDetailAction({ id: itemVideoMassiveId, ...mediaMetadata }));
      }
    });
  };

  const timer = () => {
    const interval = setInterval(() => {
      GoogleCast.getCastState().then((response) => {
        if (response !== 'Connected') {
          dispatch(castingOff());
          dispatch(castOff());
          dispatch(castDetailClear());
          dispatch(castVideoPlayerDetailClear());
          setShowMiniController(false);
          clearInterval(interval);
        }
      });
    }, 100);
  };

  useEffect(() => {
    registerListeners();

    if (forceChromecast) {
      setShowButton(true);
    }

    const intervalCheckChromecast = setInterval(() => {
      GoogleCast.getCastState().then((state) => {
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

        if (state === 'Connected' && !showMiniController) {
          setShowMiniController(true);
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
      // clearInterval(intervalCheckChromecast);
      setShowMiniController(false);
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
    if (cast) {
      setShowMiniController(true);
    }
  }, [cast]);

  useEffect(() => {
    if (!forceChromecast && device === undefined) {
      setShowButton(false);
    }
  }, [forceChromecast, device]);

  return (
    <>
      {showButton && (
        <FABView onPress={() => dispatch(hideForceChromecast())}>
          <CastButton />
        </FABView>
      )}
      {showMiniController && (
        <MiniController>
          <MiniExpandButton
            onPress={() =>
              casting ? GoogleCast.launchExpandedControls() : GoogleCast.showCastPicker()
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
                  : castState === 'loaded' || casting
                  ? castDetail?.title
                  : castState === 'loading'
                  ? t('loading')
                  : device
                  ? `${stateChromecast} ${t('to')} ${device?.name}`
                  : stateChromecast}
              </MiniTitle>
              {(castState === 'loaded' || casting) && castDetail?.subtitle && (
                <MiniSubtitle>{castDetail?.subtitle}</MiniSubtitle>
              )}
            </MiniWrapperText>
            <MiniExpandButtonIcon>
              <ChromecastIcon fill={theme.PRIMARY_TEXT_COLOR} width={25} height={35} />
            </MiniExpandButtonIcon>
          </MiniExpandButton>
        </MiniController>
      )}
    </>
  );
};

export default Cast;
