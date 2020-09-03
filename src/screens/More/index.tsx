import React from 'react';
import { Platform, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Title } from '@components/Typography';
import { CelularIcon, EditIcon } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@store/modules/user/actions';
import { getVersion, getBuildNumber } from 'react-native-device-info';
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

const wrapper = {
  flexGrow: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
  paddingHorizontal: 30,
  paddingBottom: Platform.OS === 'ios' ? 110 : 90,
};

const CelularStyle = {
  left: -10,
  opacity: 0.6,
};

export default function More() {
  const { t } = useTranslation('myaccount');
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const logoutAction = () => dispatch(logout());

  return (
    <ScrollView bounces={false} contentContainerStyle={wrapper}>
      <ProfileView>
        <RowContainer>
          <ProfileImageIconView />
          <RowContent>
            <Title>{user?.profile?.firstName || ''}</Title>
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
          navigate('MyAccount');
        }}
      >
        <RowContent>
          <ItemTitle>{t('myaccount.title')}</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
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
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <SeparatorLine />
      <RowContainer>
        <RowContent>
          <ItemTitle onPress={() => Linking.openURL('https://help.britbox.com/')}>
            {t('help')}
          </ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <RowContainer>
        <RowContent>
          <ItemTitle>{t('termscondition')}</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <RowContainer>
        <RowContent>
          <ItemTitle>{t('privacypolicy')}</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <SeparatorLine />
      <RowContainer>
        <CelularIcon height={60} width={50} style={CelularStyle} />
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
          <TouchableOpacity activeOpacity={1} onPress={() => logoutAction()}>
            <ItemTitle>{t('signout')}</ItemTitle>
          </TouchableOpacity>
        </RowContent>
      </RowContainer>
    </ScrollView>
  );
}
