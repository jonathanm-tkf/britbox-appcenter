/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import GoogleCast, { CastDevice, CastState } from 'react-native-google-cast';
import { useDispatch, useSelector } from 'react-redux';
import {
  castOn,
  castOff,
  hideForceChromecast,
  setCastState,
  castVideoPlayerDetailClear,
} from '@store/modules/layout/actions';
import {
  castDetailClear,
  castingOff,
  castingOn,
  castDetail as castDetailAction,
} from '@store/modules/core/actions';
import { AppState } from '@store/modules/rootReducer';
import { immersiveModeOff } from 'react-native-android-immersive-mode';
import { ChromecastIcon } from '@assets/icons';
import { store } from '@store/index';
import { CastDetail, LayoutState } from '@store/modules/layout/types';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PostMessage } from '@src/utils/videoPlayerRef';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import { CoreState } from '@store/modules/core/types';
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

const getPage = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.page;
};

const Cast = () => {
  const { t } = useTranslation('layout');
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const [showButton, setShowButton] = useState(false);
  const [showMiniController, setShowMiniController] = useState(false);
  const [stateChromecast, setStateChromecast] = useState<CastState | undefined>(undefined);
  const [device, setDevice] = useState<CastDevice | undefined>(undefined);
  const { cast, forceChromecast, castState } = useSelector((state: AppState) => state.layout);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { casting, castDetail } = useSelector((state: AppState) => state.core);
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
          if (getPage() === 'VideoPlayer') {
            Orientation.lockToPortrait();
            immersiveModeOff();
            goBack();
          }
        }

        if (event === 'SESSION_STARTED') {
          dispatch(castOn());
          timer();

          const { currentTime, item } = getItemCastDetail() as CastDetail;

          if (currentTime && item) {
            dispatch(setCastState('loading'));
          }
        }

        if (event === 'MEDIA_PLAYBACK_STARTED') {
          GoogleCast.initChannel('urn:x-cast:com.reactnative.googlecast.britbox');
        }

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

    if (
      forceChromecast &&
      Platform.OS === 'ios' &&
      parseInt(Platform.Version.toString(), 10) >= 14
    ) {
      setShowButton(true);
      dispatch(hideForceChromecast());
    }

    const intervalCheckChromecast = setInterval(() => {
      GoogleCast.getCastState().then((state) => {
        setStateChromecast(state === 'NotConnected' ? t('loading') : state);
        if (state === 'NoDevicesAvailable' && !forceChromecast) {
          setShowButton(false);
          PostMessage({
            type: 'chromecast',
            value: false,
          });
        } else {
          setShowButton(true);
          PostMessage({
            type: 'chromecast',
            value: true,
          });
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

  return showButton ? (
    <>
      <FABView>
        <CastButton />
      </FABView>
      {showMiniController && (
        <MiniController>
          <MiniExpandButton
            onPress={() =>
              casting ? GoogleCast.launchExpandedControls() : GoogleCast.showCastPicker()
            }
          >
            {castDetail?.images && (
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
                {castState === 'loaded' || casting
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
  ) : null;
};

export default Cast;
