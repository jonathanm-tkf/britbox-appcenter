/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { Modal, Dimensions, ActivityIndicator, View, InteractionManager } from 'react-native';
import { HomeIndicator } from 'react-native-home-indicator';

import ReactNativeBitmovinPlayer from '@takeoffmedia/react-native-bitmovin-player';
import { useFocusEffect } from '@react-navigation/native';
import { navigationGoBack } from '@src/navigation/rootNavigation';
import { SafeArea, Loading, ErrorWrapper, ErrorText } from './styles-ios';

const { width, height } = Dimensions.get('screen');

interface Props {
  modalVisible: boolean;
}

const VideoPlayerNative = ({ modalVisible }: Props) => {
  const [error] = useState(false);
  const [errorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const getHeight = useMemo(() => (width > height ? height : width), [height, width]);
  useEffect(() => {
    if (modalVisible) {
      (async function asyncPlayVideo() {
        setLoading(true);
      })();
    }
  }, [modalVisible]);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        // Expensive task
        setIsVisible(true);
      });
      return () => task.cancel();
    }, [])
  );

  return (
    <View>
      {/* <HomeIndicator autoHidden /> */}
      <Modal
        // supportedOrientations={['landscape']}
        animationType="fade"
        visible
        onShow={() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }}
      >
        <SafeArea>
          {loading ? (
            <Loading>
              <ActivityIndicator color="#FFF" size="large" />
            </Loading>
          ) : error ? (
            <ErrorWrapper>
              <ErrorText>{errorMessage}</ErrorText>
            </ErrorWrapper>
          ) : (
            <ReactNativeBitmovinPlayer
              autoPlay
              configuration={{
                url:
                  'https://vod-hls-ntham-comm-live.bbccomm.s.llnwi.net/usp/auth/vod/piff_abr_full_hd/7458d3-p0891fst/vf_p0891fst_322d55b5-72d8-43df-b8cb-6a34c09ff15e.ism/mobile_wifi_main_sd_abr_v2_hls_master.m3u8?s=1610096553&e=1610139753&h=723b57abe76bf1e40ad0ae78a77d4829',
                poster:
                  "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=80&ImageId='205884'&EntityType='Item'&EntityId='23000'&Width=480&Height=269&device=web_browser&subscriptions=Anonymous&segmentationTags=US&imageType=wallpaper",
                subtitles:
                  'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
                thumbnails:
                  'https://staging-api.britbox.takeoffmedia.com/v1/thumbnail?qs=P19fZ2RhX189MTYxMDEzOTc1M19hMTkxMTc2NmZiZjkxMWQ2ODE0ODI2NWI3OWFmYmY5Mg==&fn=L3RodW1ibmFpbF92MS82YTBiMTYtcGlwcy1waWQtcDA4OTFmc3QvdmZfcGlwcy1waWQtcDA4OTFmc3RfdGh1bWJuYWlsX21hbmlmZXN0X2E2ZmMxNjNiLWIxNjctNDNkOS1iZjBkLWFjOWZkNTJlNjJkMC54bWw=&ch=vod-thumb-ntham-comm-live.akamaized.net',
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
                console.tron.log({ time: new Date() });
                if (nativeEvent.message === 'closePlayer') {
                  navigationGoBack();
                }
              }}
              style={{
                flex: 0,
                // height: getHeight,
              }}
            />
          )}
        </SafeArea>
      </Modal>
    </View>
  );
};

export default VideoPlayerNative;
