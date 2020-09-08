/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import HeaderCustom from '@components/HeaderCustom';
import { useSelector, useDispatch } from 'react-redux';
import { signupRequest } from '@store/modules/user/saga';
import { registerRequestSuccess } from '@store/modules/user/actions';
import { EvergentSignupResponseError } from '@store/modules/user/types';
import { AppState } from '@store/modules/rootReducer';
import { useTranslation } from 'react-i18next';

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
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation(['signup', 'signin']);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCheckPrivacy, setIsCheckPrivacy] = useState(false);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment.toLocaleLowerCase() || 'us';

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
    const hasErrorFirstName = doValidateFirstName();
    const hasErrorLastName = doValidateLastName();
    const hasErrorEmail = doValidateEmail();
    const hasErrorPassword = doValidatePassword();
    const hasErrorConfirmPassword = doValidateConfirmPassword();

    if (
      hasErrorFirstName &&
      hasErrorLastName &&
      hasErrorEmail &&
      hasErrorPassword &&
      hasErrorConfirmPassword
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
          dispatch(registerRequestSuccess(responseData));
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

  const doValidateFirstName = () => {
    const hasErrorFirstName = firstName.trim() === '';

    setErrorFirstName(
      hasErrorFirstName
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorFirstName) {
      return true;
    }

    return false;
  };

  const doValidateLastName = () => {
    const hasErrorLastName = lastName.trim() === '';

    setErrorLastName(
      hasErrorLastName
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorLastName) {
      return true;
    }

    return false;
  };

  const validateEmail = (mail: string) => {
    if (
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  };

  const doValidateEmail = () => {
    const hasErrorEmail = !validateEmail(email.trim());
    setErrorEmail(
      hasErrorEmail
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorEmail) {
      return true;
    }

    return false;
  };

  const doValidatePassword = () => {
    const regexp = new RegExp(
      britboxConfig[country]?.registration?.validation['password-regex']
        .toString()
        .replace(/\//g, '')
    );

    const hasErrorPassword = password.trim() === '';
    const hasErrorRegexPassword = !regexp.test(password);

    setErrorPassword(
      hasErrorPassword
        ? error
        : {
            text: '',
          }
    );

    if (!hasErrorPassword) {
      setErrorPassword(
        hasErrorRegexPassword
          ? {
              text: britboxConfig[country]?.registration?.validation?.messages['password-rule'],
            }
          : {
              text: '',
            }
      );
    }

    if (!hasErrorPassword && !hasErrorRegexPassword) {
      return true;
    }

    return false;
  };

  const doValidateConfirmPassword = () => {
    const hasErrorConfirmPassword = confirmPassword.trim() === '';
    const hasErrorConfirmPasswordMatch = confirmPassword.trim() !== password.trim();

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

    if (!hasErrorConfirmPassword && !hasErrorConfirmPasswordMatch) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    setErrorState(false);
    setErrorMessage(evergentSignupResponseError);
  }, [firstName, lastName, email, password, confirmPassword]);

  useEffect(() => {
    doValidateFirstName();
  }, [firstName]);

  useEffect(() => {
    doValidateLastName();
  }, [lastName]);

  useEffect(() => {
    doValidateEmail();
  }, [email]);

  useEffect(() => {
    doValidatePassword();
  }, [password]);

  useEffect(() => {
    doValidateConfirmPassword();
  }, [confirmPassword]);

  useEffect(() => {
    setErrorFirstName({
      text: '',
    });
    setErrorLastName({
      text: '',
    });
    setErrorEmail({
      text: '',
    });
    setErrorPassword({
      text: '',
    });
    setErrorConfirmPassword({
      text: '',
    });
  }, []);

  return (
    <>
      <HeaderCustom
        isBack
        shadow
        rightComponent={
          <Button link onPress={() => navigation.goBack()} color={theme.PRIMARY_FOREGROUND_COLOR}>
            {t('signin:signin')}
          </Button>
        }
      />
      <Gradient>
        <KeyboardAvoidingView style={flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView bounces={false}>
            <Container>
              <TitleWrapper>
                <Title>{britboxConfig[country]?.registration?.title || ''}</Title>
                <Paragraph>{britboxConfig[country]?.registration?.description || ''}</Paragraph>
                <SubTitle>{britboxConfig[country]?.registration['description-2'] || ''}</SubTitle>
              </TitleWrapper>
              {errorState && (
                <ErrorText>
                  {
                    ((errorMessage as unknown) as EvergentSignupResponseError)?.failureMessage?.reduce(
                      (item) => item
                    )?.errorMessage
                  }
                </ErrorText>
              )}
              <Input
                label={t('field.firstname')}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                onBlur={() => doValidateFirstName()}
                error={errorFirstName}
              />
              <Input
                label={t('field.lastname')}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                onBlur={() => doValidateLastName()}
                error={errorLastName}
              />
              <Input
                label={t('field.email')}
                value={email}
                onChangeText={(text) => setEmail(text)}
                onBlur={() => doValidateEmail()}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errorEmail}
              />
              <Input
                label={t('field.createpassword')}
                value={password}
                onChangeText={(text) => setPassword(text)}
                onBlur={() => doValidatePassword()}
                secureTextEntry
                error={errorPassword}
              />
              <Input
                label={t('field.confirmpassword')}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                onBlur={() => doValidateConfirmPassword()}
                secureTextEntry
                error={errorConfirmPassword}
              />
              <Button
                onPress={() => {
                  signup();
                }}
                stretch
                loading={loading}
                size="big"
                fontWeight="medium"
                color={theme.PRIMARY_FOREGROUND_COLOR}
              >
                {t('createaccount')}
              </Button>
              <Button outline size="big" style={cancelStyle} onPress={() => navigation.goBack()}>
                <CancelText>{t('cancel')}</CancelText>
              </Button>
            </Container>
            <Wrapper>
              <CheckBoxView onPress={() => setIsCheckPrivacy(!isCheckPrivacy)}>
                {isCheckPrivacy ? <RadioCheckedIconView /> : <RadioUnCheckedIconView />}
              </CheckBoxView>
              <RowWrapper>
                <WrapperParagraph>
                  By Clicking 'Create Account' you agree to the BritBox{' '}
                  <LinkText onPress={() => navigation.navigate('Terms')}>
                    Terms and Conditions
                  </LinkText>{' '}
                  and our{' '}
                  <LinkText onPress={() => navigation.navigate('PrivacyPolicy')}>
                    Privacy Policy
                  </LinkText>
                  . We'll send you regular BritBox newsletters, along with other special offers and
                  promotions. You can opt out at any time by clicking on the unsubscribe link in our
                  emails.
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
