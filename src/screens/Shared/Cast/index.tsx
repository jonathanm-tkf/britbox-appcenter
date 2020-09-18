/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import GoogleCast from 'react-native-google-cast';
import { useDispatch, useSelector } from 'react-redux';
import { castOn, castOff } from '@store/modules/layout/actions';
import { AppState } from '@store/modules/rootReducer';
import { castDetailClear, castingOff, castingOn } from '@store/modules/core/actions';
import { ChromecastIcon } from '@assets/icons';
import { getImage } from '@src/utils/images';
import {
  CastButton,
  FABView,
  MiniController,
  MiniImage,
  MiniWrapperText,
  MiniTitle,
  MiniSubtitle,
  MiniExpandButton,
} from './styles';

const Cast = () => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const cast = useSelector((state: AppState) => state.layout.cast);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const casting = useSelector((state: AppState) => state.core.casting);
  const castDetail = useSelector((state: AppState) => state.core.castDetail);
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
        if (event === 'SESSION_STARTED') {
          dispatch(castOn());
          timer();
        }

        if (event === 'SESSION_ENDED') {
          dispatch(castingOff());
          dispatch(castOff());
          dispatch(castDetailClear());
        }
      });
    });

    GoogleCast.EventEmitter.addListener(GoogleCast.MEDIA_PLAYBACK_STARTED, ({ mediaStatus }) => {
      if (mediaStatus && (mediaStatus?.playerState || 0) === 2) {
        dispatch(castingOn());
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
          clearInterval(interval);
        }
      });
    }, 100);
  };

  useEffect(() => {
    registerListeners();

    GoogleCast.getCastState().then((state) => {
      if (state === 'NoDevicesAvailable') {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
      dispatch(state === 'NotConnected' || state === 'NoDevicesAvailable' ? castOff() : castOn());
    });
  }, []);

  return showButton ? (
    <>
      <FABView>
        <CastButton />
      </FABView>
      {cast && casting && (
        <MiniController>
          <MiniImage
            source={{ uri: getImage(castDetail?.images?.wallpaper || 'loading', 'wallpaper') }}
          />
          <MiniWrapperText>
            <MiniTitle>
              {castDetail.type === 'program' ||
              castDetail.type === 'movie' ||
              castDetail.type === 'show'
                ? castDetail?.contextualTitle
                : castDetail?.showTitle}
            </MiniTitle>
            <MiniSubtitle>
              {castDetail.type === 'episode'
                ? `${castDetail.seasonTitle}・${castDetail.episodeName}`
                : castDetail.type.toUpperCase()}
            </MiniSubtitle>
          </MiniWrapperText>
          <MiniExpandButton onPress={() => GoogleCast.launchExpandedControls()}>
            <ChromecastIcon fill={theme.PRIMARY_TEXT_COLOR} width={25} height={35} />
          </MiniExpandButton>
        </MiniController>
      )}
    </>
  ) : null;
};

export default Cast;
