/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Linking, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import {
  updateProfileRequest,
  resetPasswordRequest,
  getActiveSubscriptionRequest,
} from '@store/modules/user/saga';
import { BritboxDataEvergentModelsGetActiveSubscriptionsResponseMessageBaseAccountServiceMessage } from '@src/sdks/Britbox.API.Account.TS/api';
import { getProfileRequest } from '@store/modules/user/actions';
import { atiEventTracking, atiPageViewTracking } from '@store/modules/layout/actions';
import { useTranslation } from 'react-i18next';
import ErrorBlock from '@components/ErrorBlock';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { getTextInConfigJSON } from '@src/utils/object';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { EvergentResponseError } from '@store/modules/user/types';
import { validateEmail } from '@src/utils/validations';
import Tabs from './components/Tabs';
import {
  Container,
  TitleWrapper,
  SubTitle,
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
  SuscribeText,
} from './styles';

const updateBtnStyle = {
  marginBottom: 30,
};

const evergentResponseError: EvergentResponseError = {
  responseCode: 0,
  failureMessage: [],
};

type RootParamList = {
  MyAccount: {
    subscriptionSelected: boolean;
  };
};

type MyAccountScreenRouteProp = RouteProp<RootParamList, 'MyAccount'>;

export default function MyAccount() {
  const { params } = useRoute<MyAccountScreenRouteProp>();
  const { subscriptionSelected } = params || { subscriptionSelected: false };

  const { t } = useTranslation(['myaccount', 'signup']);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const user = useSelector((state: AppState) => state.user);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const isShowMiniController = useSelector((state: AppState) => state.layout.isShowMiniController);

  const error = {
    text: ' ',
  };

  const matchError = {
    text: getTextInConfigJSON(['registration', 'validation', 'messages', 'password-mismatch'], ''),
  };

  const tabBottomView = () => (
    <Gradient>
      <Wrapper isShowMiniController={isShowMiniController}>
        <FooterTitle>{getTextInConfigJSON(['customer-service', 'title'], '')}</FooterTitle>
        <LinkTitle
          onPress={() =>
            Linking.openURL(`${getTextInConfigJSON(['customer-service', 'link-url'], '')}`)
          }
        >
          {getTextInConfigJSON(['customer-service', 'link'], '')}
        </LinkTitle>
      </Wrapper>
    </Gradient>
  );

  const DetailsRoute = forwardRef((_, ref) => {
    const [firstName, setFirstName] = useState(user?.profile?.firstName || '');
    const [lastName, setLastName] = useState(user?.profile?.lastName || '');
    const [email, setEmail] = useState(user?.profile?.email || '');
    const [mobile, setMobile] = useState(user?.profile?.phoneNumber || '');
    const [loading, setLoading] = useState(false);

    const [errorState, setErrorState] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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

    useImperativeHandle(ref, () => ({
      clearError: () => {
        setErrorFirstName({
          text: '',
        });
        setErrorLastName({
          text: '',
        });
        setErrorEmail({
          text: '',
        });
        setErrorState(false);
        setErrorMessage(evergentResponseError);
      },
    }));

    const updateProfile = async () => {
      const hasErrorFirstName = doValidateFirstName();
      const hasErrorLastName = doValidateLastName();
      const hasErrorEmail = doValidateEmail();

      if (hasErrorFirstName && hasErrorLastName && hasErrorEmail) {
        Keyboard.dismiss();
        setLoading(true);
        setErrorState(false);
        setIsSuccess(false);
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
            setIsSuccess(true);
            dispatch(getProfileRequest());
            dispatch(
              atiEventTracking('submit', 'bb_profile_edit', {
                is_background: false,
                container: 'Application',
                result: 'Account Info Edit',
                source: 'Britbox~App',
                metadata: '',
              })
            );
          } else {
            setErrorState(true);
            if (
              responseData?.failureMessage &&
              responseData?.failureMessage[0]?.errorCode === 'eV2788'
            ) {
              responseData.failureMessage[0].errorMessage = getTextInConfigJSON(
                ['account-details', 'validation', 'messages', 'email-exists'],
                ''
              );
            }
            setErrorMessage(responseData);

            dispatch(
              atiEventTracking('error', 'bb_profile_edit', {
                is_background: false,
                container: 'Application',
                result: `${responseData?.failureMessage[0]?.errorCode}: ${responseData?.failureMessage[0]?.errorMessage}`,
                source: 'Britbox~App',
                metadata: '',
              })
            );
          }
        }
        setLoading(false);
      }
    };

    const doValidateFirstName = () => {
      const hasErrorFirstName = firstName.trim() === '';

      setErrorFirstName(
        hasErrorFirstName
          ? {
              text: getTextInConfigJSON(
                ['account-details', 'validation', 'messages', 'first-name'],
                ''
              ),
            }
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
          ? {
              text: getTextInConfigJSON(
                ['account-details', 'validation', 'messages', 'last-name'],
                ''
              ),
            }
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
      const hasErrorValidEmail = !validateEmail(email.trim());

      setErrorEmail(
        hasErrorEmail
          ? {
              text: getTextInConfigJSON(['account-details', 'validation', 'messages', 'email'], ''),
            }
          : {
              text: '',
            }
      );

      if (!hasErrorEmail) {
        setErrorEmail(
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

      if (!hasErrorEmail && !hasErrorValidEmail) {
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
      <>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? -150 : 0}
        >
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>{t('myaccount.yourdetails.screentitle')}</SubTitle>
            </TitleWrapper>
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
            <ErrorBlock
              key="error"
              visible={errorState}
              type="error"
              text={
                errorMessage?.failureMessage[0]?.errorMessage ||
                getTextInConfigJSON(['account-details', 'validation', 'error-message'], '')
              }
            />
            <ErrorBlock
              key="success"
              visible={isSuccess}
              type="success"
              text={getTextInConfigJSON(['account-details', 'validation', 'success-message'], '')}
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
              {t('myaccount.yourdetails.bottomtext')}{' '}
              <LinkTitle
                onPress={() => {
                  navigate('PrivacyPolicy');
                }}
              >
                {t('privacypolicy')}
              </LinkTitle>
              .
            </Paragraph>
          </ScrollableContainerPaddingHorizontal>
        </KeyboardAvoidingView>
        {tabBottomView()}
      </>
    );
  });

  const PasswordRoute = forwardRef((_, ref) => {
    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const regexp = new RegExp(
      getTextInConfigJSON(['registration', 'validation', 'password-regex'], '')
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

    useImperativeHandle(ref, () => ({
      clearError: () => {
        setErrorCurPassword({
          text: '',
        });
        setErrorNewPassword({
          text: '',
        });
        setErrorConfirmPassword({
          text: '',
        });
        setErrorState(false);
        setErrorMessage(evergentResponseError);
      },
    }));

    const updatePassword = async () => {
      const hasErrorCurPassword = doValidateCurPassword();
      const hasErrorNewPassword = doValidateNewPassword();
      const hasErrorConfirmPassword = doValidateConfirmPassword();

      if (hasErrorCurPassword && hasErrorNewPassword && hasErrorConfirmPassword) {
        Keyboard.dismiss();
        setLoading(true);
        setErrorState(false);
        setIsSuccess(false);
        setErrorMessage(evergentResponseError);

        const response = await resetPasswordRequest(user?.access?.accessToken || '', {
          oldPassword: curPassword,
          newPassword,
          confirmNewpassword: confirmPassword,
        });

        if (response) {
          const { response: responseData } = response;
          if (responseData && Number(responseData.responseCode) === 1) {
            setIsSuccess(true);
            dispatch(
              atiEventTracking('submit', 'bb_profile_edit', {
                is_background: false,
                container: 'Application',
                result: 'Account Info Edit',
                source: 'Britbox~App',
                metadata: '',
              })
            );
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

      setErrorCurPassword(
        hasErrorCurPassword
          ? error
          : {
              text: '',
            }
      );

      if (!hasErrorCurPassword) {
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
                text: getTextInConfigJSON(
                  ['registration', 'validation', 'messages', 'password-rule'],
                  ''
                ),
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
      if (!isSuccess) {
        doValidateCurPassword();
      }
    }, [curPassword]);

    useEffect(() => {
      if (!isSuccess) {
        doValidateNewPassword();
      }
    }, [newPassword]);

    useEffect(() => {
      if (!isSuccess) {
        doValidateConfirmPassword();
      }
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
      <>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? -150 : 0}
        >
          <ScrollContent>
            <ScrollableContainerPaddingHorizontal>
              <TitleWrapper>
                <SubTitle>{t('myaccount.password.screentitle')}</SubTitle>
              </TitleWrapper>
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
              {errorState && (
                <ErrorText>
                  {
                    ((errorMessage as unknown) as EvergentResponseError)?.failureMessage?.reduce(
                      (item) => item
                    )?.errorMessage
                  }
                </ErrorText>
              )}
              <ErrorBlock
                key="success"
                visible={isSuccess}
                type="success"
                text={getTextInConfigJSON(['account-details', 'validation', 'success-message'], '')}
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
        </KeyboardAvoidingView>
        {tabBottomView()}
      </>
    );
  });

  const SubscriptionRoute = () => {
    const [subscriptionDetail, setSubscriptionDetail] = useState<
      BritboxDataEvergentModelsGetActiveSubscriptionsResponseMessageBaseAccountServiceMessage
    >({});

    const getActiveSubscription = async () => {
      const { response } = await getActiveSubscriptionRequest(user?.access?.accessToken || '');

      if (response && Number(response?.responseCode) === 1) {
        if (response?.accountServiceMessage[0]) {
          setSubscriptionDetail(response?.accountServiceMessage[0]);
        }
      }
    };

    useEffect(() => {
      getActiveSubscription();
    }, []);

    const suscribeStyle = { paddingLeft: 65, paddingRight: 65, marginBottom: 30, marginTop: 20 };

    return (
      <>
        <ScrollableContainerPaddingHorizontal>
          <TitleWrapper>
            <SubTitle>{t('myaccount.subscription.screentitle')}</SubTitle>
          </TitleWrapper>
          {subscriptionDetail?.paymentMethod === 'Credit/Debit Card' ? (
            <SubscriptionParagraph>
              {getTextInConfigJSON(['account-subscription', 'web'], '')}
            </SubscriptionParagraph>
          ) : subscriptionDetail?.paymentMethod === 'Google Wallet' ? (
            <SubscriptionParagraph>
              {getTextInConfigJSON(['account-subscription', 'android'], '')}
            </SubscriptionParagraph>
          ) : subscriptionDetail?.paymentMethod === 'App Store Billing' ? (
            <SubscriptionParagraph>
              {getTextInConfigJSON(['account-subscription', 'ios'], '')}
            </SubscriptionParagraph>
          ) : subscriptionDetail?.paymentMethod === 'Roku Payment' ? (
            <SubscriptionParagraph>
              {getTextInConfigJSON(['account-subscription', 'roku'], '')}
            </SubscriptionParagraph>
          ) : (
            <>
              <FooterTitle>
                {getTextInConfigJSON(['account-subscription', 'not-purchased', '0'], '')}
              </FooterTitle>
              <Paragraph>
                {getTextInConfigJSON(['account-subscription', 'not-purchased', '1'], '')}
              </Paragraph>
              <Button
                outline
                size="big"
                fontWeight="medium"
                style={suscribeStyle}
                onPress={() => navigate('AccountSubscription', { account: true })}
              >
                <SuscribeText>
                  {getTextInConfigJSON(['account-subscription', 'not-purchased', '2'], '')}
                </SuscribeText>
              </Button>
            </>
          )}
        </ScrollableContainerPaddingHorizontal>
        {tabBottomView()}
      </>
    );
  };

  const NewsletterRoute = () => {
    const [isNewsletters, setIsNewsletters] = useState(
      user?.profile?.isAlertNotificationEmail === 'true' ? true : false || false
    );
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState(evergentResponseError);

    const updateProfile = async () => {
      setLoading(true);
      setErrorState(false);
      setIsSuccess(false);
      setErrorMessage(evergentResponseError);

      const response = await updateProfileRequest(user?.access?.accessToken || '', {
        firstName: user?.profile?.firstName || '',
        lastName: user?.profile?.lastName || '',
        mobileNumber: user?.profile?.phoneNumber || '',
        email: user?.profile?.email || '',
        alertNotificationEmail: isNewsletters,
      });

      if (response) {
        const { response: responseData } = response;
        if (responseData && Number(responseData.responseCode) === 1) {
          setIsSuccess(true);
          dispatch(
            atiEventTracking('submit', 'bb_newsletter_update', {
              is_background: false,
              container: 'Application',
              result: isNewsletters.toString(),
              source: 'Britbox~App',
              metadata: '',
            })
          );
        } else {
          setErrorState(true);
          setErrorMessage(responseData);
        }
      }
      setLoading(false);
    };

    return (
      <Container>
        <ScrollableContainerPaddingHorizontal>
          <TitleWrapper>
            <SubTitle>{t('myaccount.newsletter.newsletterpreferences')}</SubTitle>
          </TitleWrapper>
          <RowContainer>
            <SwitchContainer
              value={isNewsletters}
              onValueChange={(value: boolean) => setIsNewsletters(value)}
            />
            <RowContent>
              <NewsParagraph>{t('myaccount.newsletter.description')}</NewsParagraph>
            </RowContent>
          </RowContainer>
          <ErrorBlock
            key="error"
            visible={errorState}
            type="error"
            text={getTextInConfigJSON(['account-details', 'validation', 'error-message'], '')}
          />
          <ErrorBlock
            key="success"
            visible={isSuccess}
            type="success"
            text={getTextInConfigJSON(['account-details', 'validation', 'success-message'], '')}
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
            {t('myaccount.newsletter.bottomtext')}{' '}
            <LinkTitle
              onPress={() => {
                navigate('PrivacyPolicy');
              }}
            >
              {t('privacypolicy')}
            </LinkTitle>
            .
          </Paragraph>
        </ScrollableContainerPaddingHorizontal>
        {tabBottomView()}
      </Container>
    );
  };

  interface ComponentRefProps {
    clearError: () => void;
  }

  const detailRef = useRef<ComponentRefProps>();
  const passwordRef = useRef<ComponentRefProps>();

  const DATA = [
    {
      key: 'details',
      title: `${t('myaccount.yourdetails.title')} `,
      content: () => <DetailsRoute ref={detailRef} />,
    },
    {
      key: 'password',
      title: `${t('myaccount.password.title')} `,
      content: () => <PasswordRoute ref={passwordRef} />,
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

  const onTabChanged = (index: number) => {
    let pageName = '';
    if (index === 0) {
      pageName = 'MyAccount';
    } else if (index === 1) {
      pageName = 'MyAccount.Password';
    } else if (index === 2) {
      pageName = 'MyAccount.Subscription';
    } else if (index === 3) {
      pageName = 'MyAccount.Newsletter';
    }
    if (pageName) {
      dispatch(atiPageViewTracking(pageName));
      detailRef?.current?.clearError();
      passwordRef?.current?.clearError();
    }
  };

  return (
    <Container>
      <Tabs {...{ subscriptionSelected, onTabChanged }} routes={DATA} />
    </Container>
  );
}
