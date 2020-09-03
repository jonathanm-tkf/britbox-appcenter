/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, Platform, Alert, Text, ScrollView } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ThemeState } from '@store/modules/theme/types';
import { BackIcon, CelularIcon } from '@assets/icons';
import { updateProfileRequest, resetPasswordRequest } from '@store/modules/user/saga';
import { getProfileRequest } from '@store/modules/user/actions';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(['myaccount', 'signup']);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const user = useSelector((state: AppState) => state.user);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment.toLocaleLowerCase() || 'us';

  const error = {
    text: 'Field is required',
  };

  const matchError = {
    text: 'Should match to password',
  };

  const tabBottomView = () => (
    <Gradient>
      <Wrapper>
        <FooterTitle>
          {t('signup:field.customerservice')}:{' '}
          {britboxConfig[country]['customer-service']?.phone || ''}
        </FooterTitle>
        <Paragraph>{britboxConfig[country]['customer-service']?.availability || ''}</Paragraph>
        <LinkTitle>{britboxConfig[country]['customer-service']?.email || ''}</LinkTitle>
      </Wrapper>
    </Gradient>
  );

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
      const hasErrorFirstName = doValidateFirstName();
      const hasErrorLastName = doValidateLastName();
      const hasErrorEmail = doValidateEmail();

      if (hasErrorFirstName && hasErrorLastName && hasErrorEmail) {
        setLoading(true);
        setErrorState(false);
        setErrorMessage(evergentResponseError);

        const response = await updateProfileRequest(user?.access?.accessToken || '', {
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

    const doValidateEmail = () => {
      const hasErrorEmail = email.trim() === '';

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

    useEffect(() => {
      setErrorState(false);
      setErrorMessage(evergentResponseError);
    }, [firstName, lastName, email]);

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
      setErrorFirstName({
        text: '',
      });
      setErrorLastName({
        text: '',
      });
      setErrorEmail({
        text: '',
      });
    }, []);

    return (
      <Container>
        <ScrollableContainer>
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>{t('myaccount.yourdetails.screentitle')}</SubTitle>
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
              label={t('signup:field.firstname')}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              onBlur={() => doValidateFirstName()}
              error={errorFirstName}
            />
            <Input
              label={t('signup:field.lastname')}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              onBlur={() => doValidateLastName()}
              error={errorLastName}
            />
            <Input
              label={t('signup:field.email')}
              value={email}
              onChangeText={(text) => setEmail(text)}
              onBlur={() => doValidateEmail()}
              error={errorEmail}
            />
            <Input
              label={t('signup:field.mobile')}
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
              fontWeight="medium"
              color={theme.PRIMARY_FOREGROUND_COLOR}
            >
              {t('update')}
            </Button>
            <Paragraph>
              {t('myaccount.yourdetails.bottomtext')} <LinkTitle>{t('privacypolicy')}</LinkTitle>.
            </Paragraph>
          </ScrollableContainerPaddingHorizontal>
          {tabBottomView()}
        </ScrollableContainer>
      </Container>
    );
  };

  const PasswordRoute = () => {
    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const regexp = new RegExp(
      britboxConfig[country]?.registration?.validation['password-regex']
        .toString()
        .replace(/\//g, '')
    );

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
      const hasErrorCurPassword = doValidateCurPassword();
      const hasErrorNewPassword = doValidateNewPassword();
      const hasErrorConfirmPassword = doValidateConfirmPassword();

      if (hasErrorCurPassword && hasErrorNewPassword && hasErrorConfirmPassword) {
        setLoading(true);
        setErrorState(false);
        setErrorMessage(evergentResponseError);

        const response = await resetPasswordRequest(user?.access?.accessToken || '', {
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

    const doValidateCurPassword = () => {
      const hasErrorCurPassword = curPassword.trim() === '';
      const hasErrorRegexPassword = !regexp.test(curPassword);

      setErrorCurPassword(
        hasErrorCurPassword
          ? error
          : {
              text: '',
            }
      );

      if (!hasErrorCurPassword) {
        setErrorCurPassword(
          hasErrorRegexPassword
            ? {
                text: britboxConfig[country]?.registration?.validation?.messages['password-rule'],
              }
            : {
                text: '',
              }
        );
      }

      if (!hasErrorCurPassword && !hasErrorRegexPassword) {
        return true;
      }

      return false;
    };

    const doValidateNewPassword = () => {
      const hasErrorNewPassword = newPassword.trim() === '';
      const hasErrorRegexPassword = !regexp.test(newPassword);

      setErrorNewPassword(
        hasErrorNewPassword
          ? error
          : {
              text: '',
            }
      );

      if (!hasErrorNewPassword) {
        setErrorNewPassword(
          hasErrorRegexPassword
            ? {
                text: britboxConfig[country]?.registration?.validation?.messages['password-rule'],
              }
            : {
                text: '',
              }
        );
      }

      if (!hasErrorNewPassword && !hasErrorRegexPassword) {
        return true;
      }

      return false;
    };

    const doValidateConfirmPassword = () => {
      const hasErrorConfirmPassword = confirmPassword.trim() === '';
      const hasErrorConfirmPasswordMatch = confirmPassword.trim() !== newPassword.trim();

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
      setErrorMessage(evergentResponseError);
    }, [curPassword, newPassword, confirmPassword]);

    useEffect(() => {
      doValidateCurPassword();
    }, [curPassword]);

    useEffect(() => {
      doValidateNewPassword();
    }, [newPassword]);

    useEffect(() => {
      doValidateConfirmPassword();
    }, [confirmPassword]);

    useEffect(() => {
      setErrorCurPassword({
        text: '',
      });
      setErrorNewPassword({
        text: '',
      });
      setErrorConfirmPassword({
        text: '',
      });
    }, []);

    return (
      <ScrollableContainer>
        <ScrollContent>
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>{t('myaccount.password.screentitle')}</SubTitle>
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
              label={t('signup:field.currentpassword')}
              value={curPassword}
              onChangeText={(text) => setCurPassword(text)}
              onBlur={() => doValidateCurPassword()}
              secureTextEntry
              error={errorCurPassword}
            />
            <Input
              label={t('signup:field.newpassword')}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              onBlur={() => doValidateNewPassword()}
              secureTextEntry
              error={errorNewPassword}
            />
            <Input
              label={t('signup:field.confirmpassword')}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              onBlur={() => doValidateConfirmPassword()}
              secureTextEntry
              error={errorConfirmPassword}
            />
            <Button
              onPress={() => updatePassword()}
              stretch
              loading={loading}
              size="big"
              fontWeight="medium"
              color={theme.PRIMARY_FOREGROUND_COLOR}
            >
              {t('update')}
            </Button>
          </ScrollableContainerPaddingHorizontal>
        </ScrollContent>
        {tabBottomView()}
      </ScrollableContainer>
    );
  };

  const SubscriptionRoute = () => {
    return (
      <ScrollableContainer>
        <ScrollableContainerPaddingHorizontal>
          <TitleWrapper>
            <SubTitle>{t('myaccount.subscription.screentitle')}</SubTitle>
          </TitleWrapper>
          <SubscriptionParagraph>
            You are subscribed directly via Android. Please go to Google Subscription to review or
            update your subscription and payment details.
          </SubscriptionParagraph>
        </ScrollableContainerPaddingHorizontal>
        {tabBottomView()}
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

      const response = await updateProfileRequest(user?.access?.accessToken || '', {
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
              <SubTitle>{t('myaccount.newsletter.newsletterpreferences')}</SubTitle>
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
                <NewsParagraph>{t('myaccount.newsletter.description')}</NewsParagraph>
              </RowContent>
            </RowContainer>
            <Button
              onPress={() => updateProfile()}
              stretch
              style={updateBtnStyle}
              loading={loading}
              size="big"
              fontWeight="medium"
              color={theme.PRIMARY_FOREGROUND_COLOR}
            >
              {t('update')}
            </Button>
            <Paragraph>
              {t('myaccount.newsletter.bottomtext')} <LinkTitle>{t('privacypolicy')}</LinkTitle>.
            </Paragraph>
          </ScrollableContainerPaddingHorizontal>
          {tabBottomView()}
        </ScrollableContainer>
      </Container>
    );
  };

  const DATA = [
    {
      key: 'details',
      title: `${t('myaccount.yourdetails.title')} `,
      content: () => <DetailsRoute />,
    },
    {
      key: 'password',
      title: `${t('myaccount.password.title')} `,
      content: () => <PasswordRoute />,
    },
    {
      key: 'subscription',
      title: `${t('myaccount.subscription.title')} `,
      content: () => <SubscriptionRoute />,
    },
    {
      key: 'newsletter',
      title: `${t('myaccount.newsletter.title')} `,
      content: () => <NewsletterRoute />,
    },
  ];

  return (
    <Container>
      <HeaderCustom isBack shadow />
      <Container>
        <TitleWrapper>
          <Title>{t('myaccount.screentitle')}</Title>
        </TitleWrapper>
        <Container>
          <TabsComponent routes={DATA} />
        </Container>
      </Container>
    </Container>
  );
}
