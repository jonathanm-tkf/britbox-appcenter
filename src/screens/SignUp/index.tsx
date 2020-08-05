/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import HeaderCustom from '@components/HeaderCustom';
import { useSelector } from 'react-redux';
import { signupRequest } from '@store/modules/user/saga';
import { AppState } from '@store/modules/rootReducer';
import Orientation from 'react-native-orientation-locker';
import { useTranslation } from 'react-i18next';
import { EvergentSignupResponseError } from '@store/modules/user/types';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  ScrollView,
  TitleWrapper,
  Title,
  SubTitle,
  Paragraph,
  WrapperParagraph,
  Wrapper,
  CheckBoxView,
  RowWrapper,
  CancelText,
  Gradient,
  RadioCheckedIconView,
  RadioUnCheckedIconView,
  LinkText,
  ErrorText,
} from './styles';

const flex = {
  flex: 1,
};
const evergentSignupResponseError: EvergentSignupResponseError = {
  responseCode: 0,
  failureMessage: [],
};

const cancelStyle = { marginTop: 15, borderWidth: 0 };

const SignUp = () => {
  const navigation = useNavigation();
  const { t } = useTranslation('signup');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCheckPrivacy, setIsCheckPrivacy] = useState(false);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [loading, setLoading] = useState(false);

  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(evergentSignupResponseError);

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

  const [errorPassword, setErrorPassword] = useState<{
    text: string;
  }>({
    text: '',
  });

  const [errorConfirmPassword, setErrorConfirmPassword] = useState<{
    text: string;
  }>({
    text: '',
  });

  const error = {
    text: 'Field is required',
  };

  const matchError = {
    text: 'Should match to password',
  };

  const signup = async () => {
    const hasErrorFirstName = firstName.trim() === '';
    const hasErrorLastName = lastName.trim() === '';
    const hasErrorEmail = email.trim() === '';
    const hasErrorPassword = password.trim() === '';
    const hasErrorConfirmPassword = confirmPassword.trim() === '';
    const hasErrorConfirmPasswordMatch = confirmPassword.trim() !== password.trim();

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

    setErrorPassword(
      hasErrorPassword
        ? error
        : {
            text: '',
          }
    );

    setErrorConfirmPassword(
      hasErrorConfirmPassword
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorConfirmPassword) {
      if (hasErrorConfirmPasswordMatch) {
        setErrorConfirmPassword(matchError);
      }
    }

    if (
      !hasErrorFirstName &&
      !hasErrorLastName &&
      !hasErrorEmail &&
      !hasErrorPassword &&
      !hasErrorConfirmPassword &&
      !hasErrorConfirmPasswordMatch
    ) {
      setLoading(true);
      setErrorState(false);
      setErrorMessage(evergentSignupResponseError);

      const response = await signupRequest({
        firstName,
        lastName,
        email,
        password,
        alertNotificationEmail: email,
      });

      if (response) {
        const { response: responseData } = response;
        if (responseData && Number(responseData.responseCode) === 1) {
          navigation.navigate('SignUpSubscription');
        } else {
          const responseError: EvergentSignupResponseError = {
            responseCode: 0,
            failureMessage: response,
          };
          setErrorMessage(responseError);
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
    if (password.trim() !== '') {
      setErrorPassword({
        text: '',
      });
    }
    if (confirmPassword.trim() !== '' || confirmPassword.trim() === password.trim()) {
      setErrorConfirmPassword({
        text: '',
      });
    }

    setErrorState(false);
    setErrorMessage(evergentSignupResponseError);
  }, [firstName, lastName, email, password, confirmPassword]);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <>
      <HeaderCustom
        isBack
        shadow
        rightComponent={
          <Button link onPress={() => navigation.goBack()} color={theme.PRIMARY_FOREGROUND_COLOR}>
            Signin
          </Button>
        }
      />
      <Gradient>
        <KeyboardAvoidingView style={flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView bounces={false}>
            <Container>
              <TitleWrapper>
                <Title>{t('subscribetobritbox')}</Title>
                <Paragraph>Start your free trial then pay $69.99/year or $6.99/month</Paragraph>
                <SubTitle>Step 1 of 2: Create Your Account</SubTitle>
              </TitleWrapper>
              {errorState && (
                <ErrorText>
                  {
                    ((errorMessage as unknown) as EvergentSignupResponseError).failureMessage.reduce(
                      (item) => item
                    ).errorMessage
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
                label="Create Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                error={errorPassword}
              />
              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
                error={errorConfirmPassword}
              />
              <Button
                onPress={() => signup()}
                stretch
                loading={loading}
                size="big"
                color={theme.PRIMARY_FOREGROUND_COLOR}
              >
                Create Account
              </Button>
              <Button outline size="big" style={cancelStyle} onPress={() => navigation.goBack()}>
                <CancelText>Cancel</CancelText>
              </Button>
            </Container>
            <Wrapper>
              <CheckBoxView onPress={() => setIsCheckPrivacy(!isCheckPrivacy)}>
                {isCheckPrivacy ? <RadioCheckedIconView /> : <RadioUnCheckedIconView />}
              </CheckBoxView>
              <RowWrapper>
                <WrapperParagraph>
                  By Clicking 'Create Account' you agree to the BritBox{' '}
                  <LinkText>Terms and Conditions</LinkText> and our{' '}
                  <LinkText>Privacy Policy</LinkText>. We'll send you regular BritBox newsletters,
                  along with other special offers and promotions. You can opt out at any time by
                  clicking on the unsubscribe link in our emails.
                </WrapperParagraph>
              </RowWrapper>
            </Wrapper>
          </ScrollView>
        </KeyboardAvoidingView>
      </Gradient>
    </>
  );
};

export default SignUp;
