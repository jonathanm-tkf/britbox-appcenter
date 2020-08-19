/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, Platform, Alert, Text, Switch } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ThemeState } from '@store/modules/theme/types';
import { BackIcon, CelularIcon } from '@assets/icons';
import { updateProfileRequest, profile } from '@store/modules/user/saga';
import { profileRequestSuccess } from '@store/modules/user/actions';
import HeaderCustom from '@components/HeaderCustom';
import TabsComponent from '@components/TabsComponent';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { useNavigation } from '@react-navigation/native';
import { EvergentResponseError } from '@store/modules/user/types';
import {
  Container,
  TitleWrapper,
  Title,
  SubTitle,
  ScrollableContainer,
  Gradient,
  Wrapper,
  FooterTitle,
  LinkTitle,
  Paragraph,
  SubscriptionParagraph,
  RowContainer,
  RowContent,
  NewsParagraph,
  SwitchContainer,
  ScrollableContainerPaddingHorizontal,
  ScrollContent,
  ErrorText,
} from './styles';

const updateBtnStyle = {
  marginBottom: 30,
};

const evergentResponseError: EvergentResponseError = {
  responseCode: 0,
  failureMessage: [],
};

export default function MyAccount() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const user = useSelector((state: AppState) => state.user);
  const theme = useSelector((state: AppState) => state.theme.theme);

  const [isNewsletters, setIsNewsletters] = useState(false);

  const DetailsRoute = () => {
    const [firstName, setFirstName] = useState(user?.profile?.firstName || '');
    const [lastName, setLastName] = useState(user?.profile?.lastName || '');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState(user?.profile?.phoneNumber || '');
    const [loading, setLoading] = useState(false);

    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState(evergentResponseError);

    const updateProfile = async () => {
      setLoading(true);
      setErrorState(false);
      setErrorMessage(evergentResponseError);

      const response = await updateProfileRequest(user?.access?.accessToken, {
        firstName,
        lastName,
        mobileNumber: mobile,
        // email: '',
        alertNotificationEmail: true,
      });

      console.log(response);

      if (response) {
        const { response: responseData } = response;
        if (responseData && Number(responseData.responseCode) === 1) {
          const responseProfile = await profile(user?.access?.accessToken);
          dispatch(profileRequestSuccess(responseProfile.response));
        } else {
          const responseError: EvergentResponseError = {
            responseCode: 0,
            failureMessage: response,
          };
          setErrorMessage(responseError);
          setErrorState(true);
        }
      }
      setLoading(false);
    };

    return (
      <Container>
        <ScrollableContainer>
          <ScrollContent>
            <ScrollableContainerPaddingHorizontal>
              <TitleWrapper>
                <SubTitle>Upgrade your Details</SubTitle>
              </TitleWrapper>
              {errorState && (
                <ErrorText>
                  {Object.keys(
                    ((errorMessage as unknown) as EvergentResponseError).failureMessage
                  ).map((item) => errorMessage.failureMessage[item])}
                </ErrorText>
              )}
              <Input
                label="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
              <Input
                label="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
              <Input label="Email" value={email} onChangeText={(text) => setEmail(text)} />
              <Input label="Mobile" value={mobile} onChangeText={(text) => setMobile(text)} />
              <Button
                onPress={() => updateProfile()}
                stretch
                style={updateBtnStyle}
                loading={loading}
                size="big"
                color={theme.PRIMARY_FOREGROUND_COLOR}
              >
                Update
              </Button>
              <Paragraph>
                Your information will be used in accordance with our{' '}
                <LinkTitle>Privacy Policy</LinkTitle>.
              </Paragraph>
            </ScrollableContainerPaddingHorizontal>
            <Gradient>
              <Wrapper>
                <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
                <Paragraph>Available from noon-midnight EST</Paragraph>
                <LinkTitle>support-us@britbox.com</LinkTitle>
              </Wrapper>
            </Gradient>
          </ScrollContent>
        </ScrollableContainer>
      </Container>
    );
  };

  const PasswordRoute = () => {
    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    return (
      <ScrollableContainer>
        <ScrollContent>
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>Change Password</SubTitle>
            </TitleWrapper>
            <Input
              label="Current password"
              value={curPassword}
              onChangeText={(text) => setCurPassword(text)}
            />
            <Input
              label="New password"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <Input
              label="Confirm password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <Button
              onPress={() => {}}
              stretch
              loading={loading}
              size="big"
              color={theme.PRIMARY_FOREGROUND_COLOR}
            >
              Update
            </Button>
          </ScrollableContainerPaddingHorizontal>
        </ScrollContent>
        <Gradient>
          <Wrapper>
            <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
            <Paragraph>Available from noon-midnight EST</Paragraph>
            <LinkTitle>support-us@britbox.com</LinkTitle>
          </Wrapper>
        </Gradient>
      </ScrollableContainer>
    );
  };

  const SubscriptionRoute = () => {
    return (
      <ScrollableContainer>
        <ScrollableContainerPaddingHorizontal>
          <TitleWrapper>
            <SubTitle>Your subscription</SubTitle>
          </TitleWrapper>
          <SubscriptionParagraph>
            You are subscribed directly via Android. Please go to Google Subscription to review or
            update your subscription and payment details.
          </SubscriptionParagraph>
        </ScrollableContainerPaddingHorizontal>
        <Gradient>
          <Wrapper>
            <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
            <Paragraph>Available from noon-midnight EST</Paragraph>
            <LinkTitle>support-us@britbox.com</LinkTitle>
          </Wrapper>
        </Gradient>
      </ScrollableContainer>
    );
  };
  const NewsletterRoute = () => {
    const [loading, setLoading] = useState(false);

    return (
      <Container>
        <ScrollableContainer>
          <ScrollContent>
            <ScrollableContainerPaddingHorizontal>
              <TitleWrapper>
                <SubTitle>Newsletter preferences</SubTitle>
              </TitleWrapper>
              <RowContainer>
                <SwitchContainer
                  value={isNewsletters}
                  onValueChange={(value: boolean) => setIsNewsletters(value)}
                />
                <RowContent>
                  <NewsParagraph>BritBox newsletter, special promotions and offers.</NewsParagraph>
                </RowContent>
              </RowContainer>
              <Button
                onPress={() => {}}
                stretch
                style={updateBtnStyle}
                loading={loading}
                size="big"
                color={theme.PRIMARY_FOREGROUND_COLOR}
              >
                Update
              </Button>
              <Paragraph>
                Your information will be used in accordance with our{' '}
                <LinkTitle>Privacy Policy</LinkTitle>.
              </Paragraph>
            </ScrollableContainerPaddingHorizontal>
            <Gradient>
              <Wrapper>
                <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
                <Paragraph>Available from noon-midnight EST</Paragraph>
                <LinkTitle>support-us@britbox.com</LinkTitle>
              </Wrapper>
            </Gradient>
          </ScrollContent>
        </ScrollableContainer>
      </Container>
    );
  };

  const DATA = [
    {
      key: 'details',
      title: 'Your Details ',
      content: () => <DetailsRoute />,
    },
    { key: 'password', title: 'Password ', content: () => <PasswordRoute /> },
    {
      key: 'subscription',
      title: 'Subscription ',
      content: () => <SubscriptionRoute />,
    },
    {
      key: 'newsletter',
      title: 'Newsletter ',
      content: () => <NewsletterRoute />,
    },
  ];

  return (
    <Container>
      <HeaderCustom isBack shadow />
      <Container>
        <TitleWrapper>
          <Title>Account Details</Title>
        </TitleWrapper>
        <Container>
          <TabsComponent routes={DATA} />
        </Container>
      </Container>
    </Container>
  );
}
