/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Linking } from 'react-native';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginRequestErrorClear } from '@store/modules/user/actions';
import { atiEventTracking } from '@store/modules/layout/actions';
import { forgotPasswordRequest } from '@store/modules/user/saga';
import { AppState } from '@store/modules/rootReducer';
import { EvergentLoginResponseError } from '@store/modules/user/types';
import { getTextInConfigJSON } from '@src/utils/object';
import { CloseIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import ModalCustom from '@components/ModalCustom';
import { validateEmail } from '@src/utils/validations';
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
  GradientWrapper,
  FooterTitle,
  EmailTitle,
} from './styles';

const flex = {
  flex: 1,
};

const suscribeStyle = { paddingLeft: 65, paddingRight: 65, marginTop: 30 };
const cancelStyle = { marginTop: 20, marginBottom: 10 };

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation(['signin', 'signup']);
  const theme = useSelector((state: AppState) => state.theme.theme);

  const [user, setUser] = useState(__DEV__ ? 'maximilianor@takeoffmedia.com' : '');
  const [password, setPassword] = useState(__DEV__ ? '8Ub4cYAiM77EzJY' : '');

  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotModalLoading, setIsForgotModalLoading] = useState(false);
  const [isForgotModalSuccess, setIsForgotModalSuccess] = useState(false);
  const [isForgotModalVisible, setIsForgotModalVisible] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

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
    text: ' ',
  };

  const login = () => {
    const hasErrorUsername = doValidateUsername();
    const hasErrorPassword = doValidatePassword();

    if (hasErrorUsername && hasErrorPassword) {
      Keyboard.dismiss();
      dispatch(
        loginRequest({
          user,
          password,
        })
      );
    }
  };

  const doValidateUsername = () => {
    const hasErrorUsername = user.trim() === '';
    const hasErrorValidUsername = !validateEmail(user.trim());

    setErrorUsername(
      hasErrorUsername
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorUsername) {
      setErrorUsername(
        hasErrorValidUsername
          ? {
              text: getTextInConfigJSON(
                ['account-details', 'validation', 'messages', 'email-invalid'],
                ''
              ),
            }
          : {
              text: '',
            }
      );
    }

    if (!hasErrorUsername && !hasErrorValidUsername) {
      return true;
    }

    return false;
  };

  const doValidatePassword = () => {
    const hasErrorPassword = password.trim() === '';

    setErrorPassword(
      hasErrorPassword
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorPassword) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (doValidateUsername() && doValidatePassword()) {
      setIsDisabled(false);
    }

    if (errorState) {
      dispatch(loginRequestErrorClear());
    }
  }, [user, password]);

  useEffect(() => {
    doValidateUsername();
  }, [user]);

  useEffect(() => {
    doValidatePassword();
  }, [password]);

  useEffect(() => {
    doValidateForgotEmail();
  }, [forgotEmail]);

  useEffect(() => {
    setErrorForgotEmail({
      text: '',
    });
    setForgotEmail('');
    setIsForgotModalLoading(false);
    setIsForgotModalSuccess(false);
  }, [isForgotModalVisible]);

  const doValidateForgotEmail = () => {
    const hasErrorForgotEmail = forgotEmail.trim() === '';
    const hasErrorValidEmail = !validateEmail(forgotEmail.trim());

    setErrorForgotEmail(
      hasErrorForgotEmail
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorForgotEmail) {
      setErrorForgotEmail(
        hasErrorValidEmail
          ? {
              text: getTextInConfigJSON(
                ['account-details', 'validation', 'messages', 'email-invalid'],
                ''
              ),
            }
          : {
              text: '',
            }
      );
    }

    if (!hasErrorForgotEmail && !hasErrorValidEmail) {
      return true;
    }

    return false;
  };

  const forgorPassword = async () => {
    const hasErrorEmail = doValidateForgotEmail();

    if (hasErrorEmail) {
      Keyboard.dismiss();
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

  const navigateToSignUp = () => {
    dispatch(
      atiEventTracking('submit', 'bb_sub_flow', {
        is_background: false,
        container: 'Application',
        result: 'Subscribe now',
        source: 'Britbox~App',
        metadata: '',
      })
    );
    navigation.navigate('SignUp');
  };

  useEffect(() => {
    setErrorUsername({
      text: '',
    });
    setErrorPassword({
      text: '',
    });

    dispatch(loginRequestErrorClear());
  }, []);

  const contentContainer = {
    flexgrow: 1,
    backgroundColor: theme.PRIMARY_COLOR,
  };

  return (
    <>
      <CloseButton onPress={() => navigation.goBack()}>
        <CloseIcon width={32} height={32} />
      </CloseButton>
      <KeyboardAvoidingView style={flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={contentContainer} keyboardShouldPersistTaps="handled" bounces={false}>
          <Gradient>
            <Container>
              <TitleWrapper>
                <Title>{t('signin')}</Title>
              </TitleWrapper>
              <Input
                label={t('signup:field.username')}
                value={user}
                autoCapitalize="none"
                onChangeText={(text) => setUser(text)}
                onBlur={() => doValidateUsername()}
                error={errorUsername}
              />
              <Input
                label={t('signup:field.password')}
                value={password}
                onChangeText={(text) => setPassword(text)}
                onBlur={() => doValidatePassword()}
                secureTextEntry
                error={errorPassword}
              />
              <ForgotContainer>
                <TouchableOpacity activeOpacity={1} onPress={() => setIsForgotModalVisible(true)}>
                  <ForgotText>{t('forgotpassword.title')}</ForgotText>
                </TouchableOpacity>
              </ForgotContainer>
              {errorState && (
                <ErrorText>
                  {((access as unknown) as EvergentLoginResponseError)?.failureMessage?.reduce(
                    (item) => item
                  )?.errorMessage ||
                    getTextInConfigJSON(['login', 'error-messages', 'error-message'], t('error'))}
                </ErrorText>
              )}
              <Button
                onPress={() => login()}
                stretch
                disabled={isDisabled}
                loading={loading}
                size="big"
                fontWeight="medium"
                color={theme.PRIMARY_FOREGROUND_COLOR}
              >
                {getTextInConfigJSON(['login', 'ctas', '0'], '')}
              </Button>
            </Container>
            <Wrapper>
              <Title>{getTextInConfigJSON(['login', 'title'], '')}</Title>
              <Paragraph>{getTextInConfigJSON(['login', 'description'], '')}</Paragraph>
              <Paragraph>{getTextInConfigJSON(['login', 'description-2'], '')}</Paragraph>
              <Button
                outline
                size="big"
                fontWeight="medium"
                style={suscribeStyle}
                onPress={() => navigateToSignUp()}
              >
                <SuscribeText>{getTextInConfigJSON(['login', 'ctas', '1'], '')}</SuscribeText>
              </Button>
            </Wrapper>

            <GradientWrapper>
              <FooterTitle>{getTextInConfigJSON(['customer-service', 'title'], '')}</FooterTitle>
              <EmailTitle
                onPress={() =>
                  Linking.openURL(`${getTextInConfigJSON(['customer-service', 'link-url'], '')}`)
                }
              >
                {getTextInConfigJSON(['customer-service', 'link'], '')}
              </EmailTitle>
            </GradientWrapper>
          </Gradient>
        </ScrollView>
      </KeyboardAvoidingView>
      <ModalCustom isVisible={isForgotModalVisible} onClose={() => setIsForgotModalVisible(false)}>
        <ForgotModalContainer>
          <ModalTitle>{t('forgotpassword.title')}</ModalTitle>
          {isForgotModalSuccess ? (
            <>
              <ModalSubTitle>
                {getTextInConfigJSON(['login', 'forgot-password', 'post-message'], '').split(
                  '[EMAIL-ADDRESS]'
                )[0] || t('forgotpassword.description1')}
                <EmailLink>{forgotEmail}</EmailLink>
                {getTextInConfigJSON(['login', 'forgot-password', 'post-message'], '').split(
                  '[EMAIL-ADDRESS]'
                )[1] || t('forgotpassword.description2')}
              </ModalSubTitle>
              <Button
                onPress={() => setIsForgotModalVisible(false)}
                stretch
                size="big"
                fontWeight="medium"
                style={cancelStyle}
                color={theme.PRIMARY_FOREGROUND_COLOR}
              >
                {t('forgotpassword.okgotit')}
              </Button>
            </>
          ) : (
            <>
              <ModalSubTitle>
                {getTextInConfigJSON(
                  ['login', 'forgot-password', 'pre-message'],
                  t('forgotpassword.description3')
                )}
              </ModalSubTitle>
              <Input
                label={t('signup:field.email')}
                value={forgotEmail}
                onChangeText={(text) => setForgotEmail(text)}
                onBlur={() => doValidateForgotEmail()}
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
                {t('forgotpassword.submit')}
              </Button>
              <Button
                outline
                stretch
                size="big"
                fontWeight="medium"
                style={cancelStyle}
                onPress={() => setIsForgotModalVisible(false)}
              >
                {t('signup:cancel')}
              </Button>
            </>
          )}
        </ForgotModalContainer>
      </ModalCustom>
    </>
  );
};

export default Login;
