import React, { useCallback, useMemo } from 'react';
import { Platform, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Title } from '@components/Typography';
import { CelularIcon, EditIcon } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@store/modules/user/actions';
import { getVersion, getBuildNumber, isTablet } from 'react-native-device-info';
import { getTextInConfigJSON } from '@src/utils/object';
import { analyticsRef } from '@src/utils/analytics';
import {
  ProfileView,
  RowContainer,
  RowContent,
  SubTitleLink,
  SeparatorLine,
  ItemTitle,
  ItemSubTitle,
  DescriptionText,
  RowViewContainer,
  ProfileImageIconView,
  EditIconContainer,
} from './styles';

export default function More() {
  const { t } = useTranslation('myaccount');
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const isShowMiniController = useSelector((state: AppState) => state.layout.isShowMiniController);

  const wrapper = useMemo(
    () => ({
      flexGrow: 1,
      paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
      paddingHorizontal: 30,
      paddingBottom:
        Platform.OS === 'ios'
          ? isShowMiniController
            ? 160
            : 110
          : isShowMiniController
          ? 140
          : 90,
    }),
    [isShowMiniController]
  );

  const CelularStyle = useMemo(
    () => ({
      left: -10,
      opacity: 0.6,
    }),
    []
  );

  const logoutAction = useCallback(() => {
    if (analyticsRef.current) {
      analyticsRef.current.onTrackEvent({
        type: 'event',
        actionType: 'auth',
        actionName: 'bb_logged_out',
        eventProperties: {
          is_background: false,
          container: 'Application',
          result: '',
          source: 'Britbox~App',
          metadata: '',
          eventType: 'atc',
          label: 'User has logged out',
          status: 'success',
        },
      });
    }
    dispatch(logout());
  }, [dispatch]);

  const formatURL = useCallback((url: string) => {
    if (url.includes('[urls:')) {
      const path = url.replace('[', '').replace(']', '').split(':');
      if (path.length > 0) return getTextInConfigJSON(path, '');
    }
    return url;
  }, []);

  return (
    <ScrollView bounces={false} contentContainerStyle={wrapper}>
      <ProfileView>
        <RowContainer>
          <ProfileImageIconView />
          <RowContent>
            <Title fontSize={isTablet() ? 24 : 20}>{user?.profile?.firstName || ''}</Title>
            <RowViewContainer>
              <EditIconContainer
                onPress={() => {
                  navigate('MyAccount');
                }}
              >
                <SubTitleLink>{t('manageprofile')} </SubTitleLink>
                <EditIcon width={25} height={25} />
              </EditIconContainer>
            </RowViewContainer>
          </RowContent>
        </RowContainer>
      </ProfileView>
      <SeparatorLine />
      <RowContainer
        onPress={() => {
          navigate('MyAccount', {
            subscriptionSelected: false,
          });
        }}
      >
        <RowContent>
          <ItemTitle>{t('myaccount.title')}</ItemTitle>
        </RowContent>
      </RowContainer>
      <SeparatorLine />
      <RowContainer
        onPress={() => {
          navigate('ParentalControls');
        }}
      >
        <RowContent>
          <ItemTitle>{t('parentalcontrols.title')}</ItemTitle>
        </RowContent>
      </RowContainer>
      <SeparatorLine />
      {(getTextInConfigJSON(['more-links'], undefined) ?? []).map((item: any, index: number) => {
        return (
          <RowContainer key={index.toString()}>
            <RowContent>
              <ItemTitle
                onPress={() => {
                  const path = formatURL(item.path || '');
                  if (item.type === 'weblink') {
                    Linking.openURL(path);
                  } else {
                    navigate('MoreLinks', {
                      url: path,
                    });
                  }
                }}
              >
                {item.text}
              </ItemTitle>
            </RowContent>
          </RowContainer>
        );
      })}
      <SeparatorLine />
      <RowContainer>
        <CelularIcon
          height={isTablet() ? 70 : 60}
          width={isTablet() ? 60 : 50}
          style={CelularStyle}
        />
        <RowContent>
          <ItemSubTitle>{t('appversion')}</ItemSubTitle>
          <DescriptionText>
            {t('version')}: {getVersion()} {t('build')} {getBuildNumber()} (code 34567), OS
          </DescriptionText>
        </RowContent>
      </RowContainer>
      <SeparatorLine />
      <RowContainer>
        <RowContent>
          <TouchableOpacity activeOpacity={0.5} onPress={() => logoutAction()}>
            <ItemTitle>{t('signout')}</ItemTitle>
          </TouchableOpacity>
        </RowContent>
      </RowContainer>
    </ScrollView>
  );
}
