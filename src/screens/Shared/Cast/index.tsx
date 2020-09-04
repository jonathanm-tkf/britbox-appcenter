/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import GoogleCast from 'react-native-google-cast';
import { useDispatch } from 'react-redux';
import { castOn, castOff } from '@store/modules/layout/actions';
import { CastButton, FABView } from './styles';

// {
//   "title": "Casting To The Future",
//   "subtitle": "Fusce id nisi turpis. Praesent viverra bibendum semper. Donec tristique, orci sed semper lacinia, quam erat rhoncus massa, non congue tellus est quis tellus. Sed mollis orci venenatis quam scelerisque accumsan. Curabitur a massa sit amet mi accumsan mollis sed et magna. Vivamus sed aliquam risus. Nulla eget dolor in elit facilisis mattis. Ut aliquet luctus lacus. Phasellus nec commodo erat. Praesent tempus id lectus ac scelerisque. Maecenas pretium cursus lectus id volutpat.",
//   "studio": "Google IO - 2014",
//   "duration": 2596,
//   "mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/GoogleIO-2014-CastingToTheFuture.mp4",
//   "imageUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/ToTheFuture2-480x270.jpg",
//   "posterUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/780x1200/ToTheFuture-789x1200.jpg"
// }

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
