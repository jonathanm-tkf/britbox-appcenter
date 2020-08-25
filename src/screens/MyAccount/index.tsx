/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, Platform, Alert, Text, Switch } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ThemeState } from '@store/modules/theme/types';
import { BackIcon, CelularIcon } from '@assets/icons';
import { updateProfileRequest, resetPasswordRequest } from '@store/modules/user/saga';
import { getProfileRequest } from '@store/modules/user/actions';
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

  const error = {
    text: 'Field is required',
  };

  const DetailsRoute = () => {
    const [firstName, setFirstName] = useState(user?.profile?.firstName || '');
    const [lastName, setLastName] = useState(user?.profile?.lastName || '');
    const [email, setEmail] = useState(user?.profile?.email || '');
    const [mobile, setMobile] = useState(user?.profile?.phoneNumber || '');
    const [loading, setLoading] = useState(false);

    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState(evergentResponseError);

    const [errorFirstName, setErrorFirstName] = useState<{
      text: string;
    }>({
      text: '',
    });

    const [errorLastName, setErrorLastName] = useState<{
      text: string;
    }>({
      text: '',
    });

    const [errorEmail, setErrorEmail] = useState<{
      text: string;
    }>({
      text: '',
    });

    const [errorMobile, setErrorMobile] = useState<{
      text: string;
    }>({
      text: '',
    });

    const updateProfile = async () => {
      const hasErrorFirstName = firstName.trim() === '';
      const hasErrorLastName = lastName.trim() === '';
      const hasErrorEmail = email.trim() === '';

      setErrorFirstName(
        hasErrorFirstName
          ? error
          : {
              text: '',
            }
      );

      setErrorLastName(
        hasErrorLastName
          ? error
          : {
              text: '',
            }
      );

      setErrorEmail(
        hasErrorEmail
          ? error
          : {
              text: '',
            }
      );

      if (!hasErrorFirstName && !hasErrorLastName && !hasErrorEmail) {
        setLoading(true);
        setErrorState(false);
        setErrorMessage(evergentResponseError);

        const response = await updateProfileRequest(user?.access?.accessToken, {
          firstName,
          lastName,
          mobileNumber: mobile,
          email,
          alertNotificationEmail: user?.profile?.isAlertNotificationEmail,
        });

        if (response) {
          const { response: responseData } = response;
          if (responseData && Number(responseData.responseCode) === 1) {
            dispatch(getProfileRequest());
          } else {
            setErrorMessage(responseData);
            setErrorState(true);
          }
        }
        setLoading(false);
      }
    };

    useEffect(() => {
      if (firstName.trim() !== '') {
        setErrorFirstName({
          text: '',
        });
      }
      if (lastName.trim() !== '') {
        setErrorLastName({
          text: '',
        });
      }
      if (email.trim() !== '') {
        setErrorEmail({
          text: '',
        });
      }

      setErrorState(false);
      setErrorMessage(evergentResponseError);
    }, [firstName, lastName, email]);

    return (
      <Container>
        <ScrollableContainer>
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>Upgrade your Details</SubTitle>
            </TitleWrapper>
            {errorState && (
              <ErrorText>
                {
                  ((errorMessage as unknown) as EvergentResponseError)?.failureMessage?.reduce(
                    (item) => item
                  )?.errorMessage
                }
              </ErrorText>
            )}
            <Input
              label="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              error={errorFirstName}
            />
            <Input
              label="Last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              error={errorLastName}
            />
            <Input
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              error={errorEmail}
            />
            <Input
              label="Mobile"
              value={mobile}
              onChangeText={(text) => setMobile(text)}
              error={errorMobile}
            />
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
        </ScrollableContainer>
      </Container>
    );
  };

  const PasswordRoute = () => {
    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState(evergentResponseError);

    const [errorCurPassword, setErrorCurPassword] = useState<{
      text: string;
    }>({
      text: '',
    });

    const [errorNewPassword, setErrorNewPassword] = useState<{
      text: string;
    }>({
      text: '',
    });

    const [errorConfirmPassword, setErrorConfirmPassword] = useState<{
      text: string;
    }>({
      text: '',
    });

    const updatePassword = async () => {
      const hasErrorCurPassword = curPassword.trim() === '';
      const hasErrorNewPassword = newPassword.trim() === '';
      const hasErrorConfirmPassword = confirmPassword.trim() === '';

      setErrorCurPassword(
        hasErrorCurPassword
          ? error
          : {
              text: '',
            }
      );

      setErrorNewPassword(
        hasErrorNewPassword
          ? error
          : {
              text: '',
            }
      );

      setErrorConfirmPassword(
        hasErrorNewPassword
          ? error
          : {
              text: '',
            }
      );

      if (!hasErrorCurPassword && !hasErrorNewPassword && !hasErrorConfirmPassword) {
        setLoading(true);
        setErrorState(false);
        setErrorMessage(evergentResponseError);

        const response = await resetPasswordRequest(user?.access?.accessToken, {
          oldPassword: curPassword,
          newPassword,
          confirmNewpassword: confirmPassword,
        });

        if (response) {
          const { response: responseData } = response;
          if (responseData && Number(responseData.responseCode) === 1) {
            setCurPassword('');
            setNewPassword('');
            setConfirmPassword('');
          } else {
            setErrorMessage(responseData);
            setErrorState(true);
          }
        }
        setLoading(false);
      }
    };

    useEffect(() => {
      if (curPassword.trim() !== '') {
        setErrorCurPassword({
          text: '',
        });
      }
      if (newPassword.trim() !== '') {
        setErrorNewPassword({
          text: '',
        });
      }
      if (confirmPassword.trim() !== '') {
        setErrorConfirmPassword({
          text: '',
        });
      }

      setErrorState(false);
      setErrorMessage(evergentResponseError);
    }, [curPassword, newPassword, confirmPassword]);

    return (
      <ScrollableContainer>
        <ScrollContent>
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>Change Password</SubTitle>
            </TitleWrapper>
            {errorState && (
              <ErrorText>
                {
                  ((errorMessage as unknown) as EvergentResponseError)?.failureMessage?.reduce(
                    (item) => item
                  )?.errorMessage
                }
              </ErrorText>
            )}
            <Input
              label="Current password"
              value={curPassword}
              onChangeText={(text) => setCurPassword(text)}
              secureTextEntry
              error={errorCurPassword}
            />
            <Input
              label="New password"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry
              error={errorNewPassword}
            />
            <Input
              label="Confirm password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
              error={errorConfirmPassword}
            />
            <Button
              onPress={() => updatePassword()}
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
    const [isNewsletters, setIsNewsletters] = useState(
      user?.profile?.isAlertNotificationEmail === 'true' ? true : false || false
    );
    const [loading, setLoading] = useState(false);

    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState(evergentResponseError);

    const updateProfile = async () => {
      setLoading(true);
      setErrorState(false);
      setErrorMessage(evergentResponseError);

      const response = await updateProfileRequest(user?.access?.accessToken, {
        firstName: user?.profile?.firstName,
        lastName: user?.profile?.lastName,
        mobileNumber: user?.profile?.phoneNumber,
        email: user?.profile?.email,
        alertNotificationEmail: isNewsletters,
      });

      if (response) {
        const { response: responseData } = response;
        if (responseData && Number(responseData.responseCode) === 1) {
          dispatch(getProfileRequest());
        } else {
          setErrorMessage(responseData);
          setErrorState(true);
        }
      }
      setLoading(false);
    };

    return (
      <Container>
        <ScrollableContainer>
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>Newsletter preferences</SubTitle>
            </TitleWrapper>
            {errorState && (
              <ErrorText>
                {
                  ((errorMessage as unknown) as EvergentResponseError)?.failureMessage?.reduce(
                    (item) => item
                  )?.errorMessage
                }
              </ErrorText>
            )}
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
