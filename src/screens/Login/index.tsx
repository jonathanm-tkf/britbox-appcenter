/* eslint-disable react-hooks/exhaustive-deps */
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
  const { t } = useTranslation(['signin', 'signup']);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment?.toLocaleLowerCase() || 'us';

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
    text: 'Field is required',
  };

  const login = () => {
    const hasErrorUsername = doValidateUsername();
    const hasErrorPassword = doValidatePassword();

    if (hasErrorUsername && hasErrorPassword) {
      dispatch(
        loginRequest({
          user,
          password,
        })
      );
    }
  };

  const doValidateUsername = () => {
    const hasErrorUsername = !validateEmail(user.trim());
    setErrorUsername(
      hasErrorUsername
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorUsername) {
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
    setErrorUsername({
      text: '',
    });
    setErrorPassword({
      text: '',
    });
  }, []);

  return (
    <>
      <CloseButton onPress={() => navigation.goBack()}>
        <CloseIcon width={32} height={32} />
      </CloseButton>
      <KeyboardAvoidingView style={flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView bounces={false}>
          <Gradient>
            <Container>
              <TitleWrapper>
                <Title>{t('signin')}</Title>
              </TitleWrapper>
              {errorState && (
                <ErrorText>
                  {((access as unknown) as EvergentLoginResponseError)?.failureMessage?.reduce(
                    (item) => item
                  )?.errorMessage ||
                    britboxConfig[country]?.login['error-messages']['error-message'] ||
                    t('error')}
                </ErrorText>
              )}
              <Input
                label={t('signup:field.username')}
                value={user}
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
              <Button
                onPress={() => login()}
                stretch
                disabled={isDisabled}
                loading={loading}
                size="big"
                fontWeight="medium"
                color={theme.PRIMARY_FOREGROUND_COLOR}
              >
                {britboxConfig[country]?.login?.ctas[0] || ''}
              </Button>
            </Container>

            <Wrapper>
              <Title>{britboxConfig[country]?.login?.title || ''}</Title>
              <Paragraph>{britboxConfig[country]?.login?.description || ''}</Paragraph>
              <Paragraph>{britboxConfig[country]?.login['description-2'] || ''}</Paragraph>

              <Button
                outline
                size="big"
                fontWeight="medium"
                style={suscribeStyle}
                onPress={() => navigation.navigate('SignUp')}
              >
                <SuscribeText>{britboxConfig[country]?.login?.ctas[1] || ''}</SuscribeText>
              </Button>
            </Wrapper>
          </Gradient>
        </ScrollView>
      </KeyboardAvoidingView>
      <ModalCustom isVisible={isForgotModalVisible} onClose={() => setIsForgotModalVisible(false)}>
        <ForgotModalContainer>
          <ModalTitle>{t('forgotpassword.title')}</ModalTitle>
          {isForgotModalSuccess ? (
            <>
              <ModalSubTitle>
                {t('forgotpassword.description1')} <EmailLink>{forgotEmail}.</EmailLink>{' '}
                {t('forgotpassword.description2')}
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
              <ModalSubTitle>{t('forgotpassword.description3')}</ModalSubTitle>
              <Input
                label={t('signup:field.email')}
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
