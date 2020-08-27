/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginRequestErrorClear } from '@store/modules/user/actions';
import { forgotPasswordRequest } from '@store/modules/user/saga';
import { AppState } from '@store/modules/rootReducer';
import { ThemeProps } from '@store/modules/theme/types';
import { EvergentLoginResponseError } from '@store/modules/user/types';
import Orientation from 'react-native-orientation-locker';
import { CloseIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import ModalCustom from '@components/ModalCustom';
import {
  Container,
  ErrorText,
  ScrollView,
  CloseButton,
  TitleWrapper,
  Title,
  Paragraph,
  Wrapper,
  SuscribeText,
  Gradient,
  ForgotContainer,
  ForgotText,
  ForgotModalContainer,
  ModalTitle,
  ModalSubTitle,
  EmailLink,
} from './styles';

interface Props {
  screenProps: {
    theme: ThemeProps;
  };
}

const flex = {
  flex: 1,
};

const suscribeStyle = { paddingLeft: 65, paddingRight: 65, marginTop: 30 };
const cancelStyle = { marginTop: 20, marginBottom: 10 };

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation('signin');
  const theme = useSelector((state: AppState) => state.theme.theme);

  const [user, setUser] = useState(__DEV__ ? 'maximilianor@takeoffmedia.com' : '');
  const [password, setPassword] = useState(__DEV__ ? '8Ub4cYAiM77EzJY' : '');

  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotModalLoading, setIsForgotModalLoading] = useState(false);
  const [isForgotModalSuccess, setIsForgotModalSuccess] = useState(false);
  const [isForgotModalVisible, setIsForgotModalVisible] = useState(false);

  const loading = useSelector((state: AppState) => state.user.loading);
  const { error: errorState, access } = useSelector((state: AppState) => state.user);

  const [errorUsername, setErrorUsername] = useState<{
    text: string;
  }>({
    text: '',
  });
  const [errorPassword, setErrorPassword] = useState<{
    text: string;
  }>({
    text: '',
  });
  const [errorForgotEmail, setErrorForgotEmail] = useState<{
    text: string;
  }>({
    text: '',
  });

  const error = {
    text: 'Field is required',
  };

  const login = () => {
    const hasErrorUsername = user.trim() === '';
    const hasErrorPassword = password.trim() === '';

    setErrorUsername(
      hasErrorUsername
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

    if (!hasErrorUsername && !hasErrorPassword) {
      dispatch(
        loginRequest({
          user,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (user.trim() !== '') {
      setErrorUsername({
        text: '',
      });
    }
    if (password.trim() !== '') {
      setErrorPassword({
        text: '',
      });
    }

    if (errorState) {
      dispatch(loginRequestErrorClear());
    }
  }, [user, password]);

  useEffect(() => {
    if (user.trim() !== '') {
      setErrorForgotEmail({
        text: '',
      });
    }
  }, [forgotEmail]);

  useEffect(() => {
    setErrorForgotEmail({
      text: '',
    });
    setForgotEmail('');
    setIsForgotModalLoading(false);
    setIsForgotModalSuccess(false);
  }, [isForgotModalVisible]);

  const forgorPassword = async () => {
    const hasErrorForgotEmail = forgotEmail.trim() === '';

    setErrorForgotEmail(
      hasErrorForgotEmail
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorForgotEmail) {
      setIsForgotModalLoading(true);

      const response = await forgotPasswordRequest({
        email: forgotEmail,
      });

      if (response) {
        const { response: responseData } = response;
        if (responseData && Number(responseData.responseCode) === 1) {
          setIsForgotModalSuccess(true);
        } else {
          setErrorForgotEmail({
            text: responseData?.failureMessage[0]?.errorMessage || '',
          });
        }
      }
      setIsForgotModalLoading(false);
    }
  };

  useEffect(() => {
    // Orientation.lockToPortrait();
  }, []);

  return (
    <>
      <CloseButton onPress={() => navigation.goBack()}>
        <CloseIcon width={32} height={32} />
      </CloseButton>
      <Gradient>
        <KeyboardAvoidingView style={flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView bounces={false}>
            <Container>
              <TitleWrapper>
                <Title>{t('signin')}</Title>
              </TitleWrapper>
              {errorState && (
                <ErrorText>
                  {
                    ((access as unknown) as EvergentLoginResponseError)?.failureMessage?.reduce(
                      (item) => item
                    )?.errorMessage
                  }
                </ErrorText>
              )}
              <Input
                label="Username"
                value={user}
                onChangeText={(text) => setUser(text)}
                error={errorUsername}
              />
              <Input
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                error={errorPassword}
              />
              <ForgotContainer>
                <TouchableOpacity activeOpacity={1} onPress={() => setIsForgotModalVisible(true)}>
                  <ForgotText>Forgot your Password?</ForgotText>
                </TouchableOpacity>
              </ForgotContainer>
              <Button
                onPress={() => login()}
                stretch
                loading={loading}
                size="big"
                fontWeight="medium"
                color={theme.PRIMARY_FOREGROUND_COLOR}
              >
                Sign In
              </Button>
            </Container>

            <Wrapper>
              <Title>New to Britbox?</Title>
              <Paragraph>
                Glad you're here. Let's get you set with the best of British TV.
              </Paragraph>
              <Paragraph>
                Star your 7-day FREE trial, then just $6.99/month or %69.99/year
              </Paragraph>

              <Button
                outline
                size="big"
                fontWeight="medium"
                style={suscribeStyle}
                onPress={() => navigation.navigate('SignUp')}
              >
                <SuscribeText>Suscribe now</SuscribeText>
              </Button>
            </Wrapper>
          </ScrollView>
        </KeyboardAvoidingView>
        <ModalCustom
          isVisible={isForgotModalVisible}
          onClose={() => setIsForgotModalVisible(false)}
        >
          <ForgotModalContainer>
            <ModalTitle>Forgot your password?</ModalTitle>
            {isForgotModalSuccess ? (
              <>
                <ModalSubTitle>
                  We have sent a password reset link to <EmailLink>{forgotEmail}</EmailLink> Please
                  click this link to reset your password. If you don't see this email, please check
                  your junk mail folder.
                </ModalSubTitle>
                <Button
                  onPress={() => setIsForgotModalVisible(false)}
                  stretch
                  size="big"
                  fontWeight="medium"
                  style={cancelStyle}
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                >
                  Ok, got it.
                </Button>
              </>
            ) : (
              <>
                <ModalSubTitle>
                  Enter you registered email address and we send you a link to reset your password.
                </ModalSubTitle>
                <Input
                  label="Email"
                  value={forgotEmail}
                  onChangeText={(text) => setForgotEmail(text)}
                  error={errorForgotEmail}
                />
                <Button
                  onPress={() => forgorPassword()}
                  stretch
                  loading={isForgotModalLoading}
                  size="big"
                  fontWeight="medium"
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                >
                  Submit
                </Button>
                <Button
                  outline
                  stretch
                  size="big"
                  fontWeight="medium"
                  style={cancelStyle}
                  onPress={() => setIsForgotModalVisible(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </ForgotModalContainer>
        </ModalCustom>
      </Gradient>
    </>
  );
};

export default Login;
