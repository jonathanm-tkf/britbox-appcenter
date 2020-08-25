/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Title } from '@components/Typography';
import { CelularIcon, EditIcon } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
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
  paddingBottom: Platform.OS === 'ios' ? 100 : 80,
};

const CelularStyle = {
  left: -10,
  opacity: 0.6,
};

export default function More() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  console.tron.log(user);
  const logoutAction = () => dispatch(logout());

  return (
    <ScrollView contentContainerStyle={wrapper}>
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
                <SubTitleLink>Manage Profile </SubTitleLink>
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
          <ItemTitle>My Account</ItemTitle>
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
          <ItemTitle>Parental Controls</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <SeparatorLine />
      <RowContainer>
        <RowContent>
          <ItemTitle>Help</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <RowContainer>
        <RowContent>
          <ItemTitle>Terms & Conditions</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <RowContainer>
        <RowContent>
          <ItemTitle>Privacy Policy</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <SeparatorLine />
      <RowContainer>
        <CelularIcon height={60} width={50} style={CelularStyle} />
        <RowContent>
          <ItemSubTitle>APP Version</ItemSubTitle>
          <DescriptionText>
            Version: {getVersion()} build {getBuildNumber()} (code 34567), OS
          </DescriptionText>
        </RowContent>
      </RowContainer>
      <SeparatorLine />
      <RowContainer>
        <RowContent>
          <TouchableOpacity onPress={() => logoutAction()}>
            <ItemTitle>Sign Out</ItemTitle>
          </TouchableOpacity>
        </RowContent>
      </RowContainer>
    </ScrollView>
  );
}
