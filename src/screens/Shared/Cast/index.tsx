/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import GoogleCast from 'react-native-google-cast';
import { useDispatch } from 'react-redux';
import { castOn, castOff } from '@store/modules/layout/actions';
import { CastButton, FABView } from './styles';

const Cast = () => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
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
        }

        if (event === 'SESSION_ENDED') {
          dispatch(castOff());
        }
      });
    });
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
    <FABView>
      <CastButton />
    </FABView>
  ) : null;
};

export default Cast;
