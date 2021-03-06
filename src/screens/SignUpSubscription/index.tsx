/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  Linking,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import { Button } from '@components/Button';
import HeaderCustom from '@components/HeaderCustom';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getProductsRequest, addSubscriptionRequest } from '@store/modules/user/saga';
import { loginAfterRegister } from '@store/modules/user/actions';
import { atiEventTracking } from '@store/modules/layout/actions';
import {
  BritboxDataEvergentModelsGetProductsResponseMessageBaseProductsResponseMsg,
  BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels,
  BritboxDataEvergentModelsPaymentMethodInfo,
} from '@src/sdks/Britbox.API.Account.TS/api';
import { AppState } from '@store/modules/rootReducer';
import { getTextInConfigJSON, getSegment } from '@src/utils/object';
import { Config } from '@src/utils/config';
import { useTranslation } from 'react-i18next';
import { Html5Entities } from 'html-entities';
import * as RNIap from 'react-native-iap';
import { encode } from 'base-64';
import Analytics from 'appcenter-analytics';

import {
  Container,
  ScrollView,
  TitleWrapper,
  Title,
  SubTitle,
  Paragraph,
  Wrapper,
  RowWrapper,
  RadioBox,
  SmallText,
  DescriptionText,
  RadioBottomText,
  PriceTitle,
  FooterTitle,
  EmailTitle,
  CancelText,
  Gradient,
  RadioCheckedIconView,
  RadioUnCheckedIconView,
  RadioBoxContent,
  PaddingHorizontalView,
  ErrorText,
} from './styles';

const htmlEntities = new Html5Entities();

const flex = {
  flex: 1,
};

const productsResponse: BritboxDataEvergentModelsGetProductsResponseMessageBaseProductsResponseMsg[] = [];

type RootParamList = {
  SignUpSubscription: {
    account: boolean;
  };
};

type SubscriptionScreenRouteProp = RouteProp<RootParamList, 'SignUpSubscription'>;

const SignUpSubscription = () => {
  const dispatch = useDispatch();
  const { params } = useRoute<SubscriptionScreenRouteProp>();
  const account: boolean | undefined = params?.account;
  const { t } = useTranslation('signup');
  const theme = useSelector((state: AppState) => state.theme.theme);
  const user = useSelector((state: AppState) => state.user);
  const country: string = getSegment();

  const cancelStyle = { marginTop: 15, width: '100%', alignItems: 'center' };
  const textLeft = { textAlign: 'left' };
  const activeRadio = {
    backgroundColor: theme.SECONDARY_COLOR,
    borderColor: theme.SECONDARY_COLOR,
  };

  const [loading, setLoading] = useState(false);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [packageData, setPackageData] = useState(productsResponse);
  const [packageIndex, setPackageIndex] = useState(0);
  const [packageName, setPackageName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const initialConnection = async () => {
    try {
      await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
    } catch (error) {
      //
    }
  };

  const handleBackButtonClick = () => {
    trackEvent('cancel');
    _doSuccessSubscription(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      setIsLoadingPackages(true);
    };
  }, []);

  useEffect(() => {
    initialConnection();
    getProducts();
  }, []);

  useEffect(() => {
    if (packageData) {
      changePackageName();
      setErrorMsg('');
    }
  }, [packageData, packageIndex]);

  const getProducts = async () => {
    const { response } = await getProductsRequest(country);

    Analytics.trackEvent('getProducts', {
      products: JSON.stringify(response),
    });

    if (response && Number(response?.responseCode) === 1) {
      if (response?.productsResponseMessage?.length > 0) {
        setPackageData(response?.productsResponseMessage);

        const productApple: string[] = [];
        const productGoogle: string[] = [];

        response?.productsResponseMessage.forEach(
          (element: BritboxDataEvergentModelsGetProductsResponseMessageBaseProductsResponseMsg) => {
            const appIDApple:
              | BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels
              | undefined = element?.appChannels?.find(
              (e: BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels) =>
                e.appChannel === 'App Store Billing'
            );
            const appIDGoogle:
              | BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels
              | undefined = element?.appChannels?.find(
              (e: BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels) =>
                e.appChannel === 'Google Wallet'
            );

            if (appIDApple) {
              const appIDAppleName: string | undefined = appIDApple?.appID;
              productApple.push(String(appIDAppleName));
            }

            if (appIDGoogle) {
              const appIDGoogleName: string | undefined = appIDGoogle?.appID;
              productGoogle.push(String(appIDGoogleName));
            }
          }
        );

        if (Platform.OS === 'ios') {
          await RNIap.getProducts(productApple);
        } else {
          await RNIap.getSubscriptions(productGoogle);
        }
        setIsLoadingPackages(false);
      } else {
        setErrorMsg("Couldn't get products");
        setIsLoadingPackages(false);
      }
    } else {
      setErrorMsg("Couldn't get products");
      setIsLoadingPackages(false);
    }
  };

  const changePackageName = () => {
    const appIDApple:
      | BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels
      | undefined = packageData[packageIndex]?.appChannels?.find(
      (e: BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels) =>
        e.appChannel === 'App Store Billing'
    );
    const appIDGoogle:
      | BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels
      | undefined = packageData[packageIndex]?.appChannels?.find(
      (e: BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels) =>
        e.appChannel === 'Google Wallet'
    );

    if (Platform.OS === 'ios') {
      if (appIDApple) {
        setPackageName(appIDApple?.appID || '');
      }
    } else if (Platform.OS === 'android') {
      if (appIDGoogle) {
        setPackageName(appIDGoogle?.appID || '');
      }
    }
  };

  const initiateIAPRequest = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      let packageId: string | undefined = '';

      const appIDApple:
        | BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels
        | undefined = packageData[packageIndex]?.appChannels?.find(
        (e: BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels) =>
          e.appChannel === 'App Store Billing'
      );
      const appIDGoogle:
        | BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels
        | undefined = packageData[packageIndex]?.appChannels?.find(
        (e: BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels) =>
          e.appChannel === 'Google Wallet'
      );

      if (Platform.OS === 'ios') {
        if (appIDApple) {
          packageId = appIDApple?.appID;
        }
      } else if (Platform.OS === 'android') {
        if (appIDGoogle) {
          packageId = appIDGoogle?.appID;
        }
      }

      Analytics.trackEvent('packageId', {
        packageId: JSON.stringify(packageId),
      });

      trackEvent(`2_details_${packageData[packageIndex]?.productDescription}`);

      const purchase = await RNIap.requestSubscription(String(packageId));

      Analytics.trackEvent('purchase', {
        purchase: JSON.stringify(purchase),
      });

      await RNIap.finishTransaction(purchase);

      receiptValidateIOS(purchase?.transactionReceipt);
    } catch (err) {
      if (err && err?.code === 'E_USER_CANCELLED') {
        setLoading(false);
        return true;
      }

      Analytics.trackEvent('error catch purchase', {
        err: JSON.stringify(err),
      });

      if (err && err?.code === 'E_UNKNOWN') {
        setErrorMsg(getTextInConfigJSON(['login', 'error-messages', 'error-message'], ''));
        setLoading(false);
        return true;
      }

      trackEvent(err?.message);
      setErrorMsg(err?.message);
      setLoading(false);
    }
  };

  const receiptValidateIOS = async (receipt: string) => {
    try {
      const receiptBody = {
        'receipt-data': receipt,
        password: '8b0228ae3d5a489e8b406f83be73762d',
      };
      await RNIap.validateReceiptIos(receiptBody, Config.ENVIRONMENT === 'STAGING');

      const paymentmethodInfo: BritboxDataEvergentModelsPaymentMethodInfo = {
        label: Platform.OS === 'ios' ? 'App Store Billing' : 'Google Wallet',
        transactionReferenceMsg: {
          amount: packageData[packageIndex]?.retailPrice,
          txID: Platform.OS === 'ios' ? receipt : encode(receipt),
          txMsg: 'Success',
        },
      };

      const subscriptionResponse = await addSubscriptionRequest(user?.access?.accessToken || '', {
        rateType: Platform.OS === 'ios' ? 'App Store Billing' : 'Google Wallet',
        priceCharged: packageData[packageIndex]?.retailPrice,
        appServiceID: packageName,
        serviceType: 'PRODUCT',
        paymentmethodInfo,
      });

      Analytics.trackEvent('subscriptionResponse', {
        subscriptionResponse: JSON.stringify(subscriptionResponse),
      });

      let error = false;

      if (subscriptionResponse) {
        const { errorCode } = subscriptionResponse[0] || {};

        if (errorCode) {
          error = true;
        }
      }

      if (
        subscriptionResponse &&
        (subscriptionResponse?.response?.responseCode || '0').toString() === '1'
      ) {
        _doSuccessSubscription(true);
      } else if (subscriptionResponse && error) {
        setLoading(false);

        if (subscriptionResponse[0]?.errorCode === ('eV2365' || 'eV2402')) {
          setErrorMsg(getTextInConfigJSON(['plan-selection', 'errors', 'already-purchased'], ''));
        } else {
          setErrorMsg(subscriptionResponse[0]?.errorMessage || 'Something went wrong.');
        }
      } else {
        trackEvent(
          `${subscriptionResponse[0]?.errorCode}: ${subscriptionResponse[0]?.errorMessage}`
        );
        setErrorMsg(
          (subscriptionResponse && subscriptionResponse[0]?.errorMessage) ||
            "Subscription couldn't be done."
        );
        setLoading(false);
      }
    } catch (err) {
      Analytics.trackEvent('receiptValidate', {
        receiptValidate: JSON.stringify(err),
      });
      setErrorMsg('Something went wrong.');
    }
  };

  const _doSuccessSubscription = (isPurchase: boolean) => {
    dispatch(loginAfterRegister(isPurchase, account));
  };

  const trackEvent = (result: string) => {
    dispatch(
      atiEventTracking('submit', 'bb_sub_flow', {
        is_background: false,
        container: 'Application',
        result,
        source: 'Britbox~App',
        metadata: '',
      })
    );
  };

  return (
    <>
      <HeaderCustom isBack shadow onBack={() => _doSuccessSubscription(false)} />
      <Gradient style={{ marginBottom: account ? 90 : 0 }}>
        <KeyboardAvoidingView style={flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView bounces={false}>
            <Container>
              <TitleWrapper>
                <Title>{getTextInConfigJSON(['plan-selection', 'title'], '')}</Title>
                <Paragraph>{getTextInConfigJSON(['plan-selection', 'description'], '')}</Paragraph>
                <SubTitle>{getTextInConfigJSON(['plan-selection', 'description-2'], '')}</SubTitle>
              </TitleWrapper>

              {isLoadingPackages ? (
                <ActivityIndicator size={52} color={theme.PRIMARY_FOREGROUND_COLOR} />
              ) : (
                <>
                  <RowWrapper>
                    {packageData.map(
                      (
                        item: BritboxDataEvergentModelsGetProductsResponseMessageBaseProductsResponseMsg,
                        index: number
                      ) => {
                        return (
                          <RadioBox
                            key={index}
                            disabled={loading}
                            onPress={() => setPackageIndex(index)}
                            style={packageIndex === index && activeRadio}
                          >
                            <RadioBoxContent>
                              <SubTitle style={textLeft}>{item?.productDescription}</SubTitle>
                              <DescriptionText
                                style={[textLeft, { marginBottom: 5, fontWeight: 'bold' }]}
                              >
                                {htmlEntities.decode(item?.currencySymbol)}
                                {item?.retailPrice}{' '}
                                <Text style={{ fontWeight: 'normal' }}>
                                  / {item?.period?.replace('(s)', '')}
                                </Text>
                              </DescriptionText>
                              <DescriptionText
                                style={[textLeft, { marginBottom: 10, fontSize: 12 }]}
                              >
                                {item?.channelPartnerDescription}
                              </DescriptionText>
                            </RadioBoxContent>
                            {packageIndex === index ? (
                              <RadioCheckedIconView />
                            ) : (
                              <RadioUnCheckedIconView />
                            )}
                          </RadioBox>
                        );
                      }
                    )}
                  </RowWrapper>
                  <PaddingHorizontalView>
                    <RadioBottomText>
                      {getTextInConfigJSON(['plan-selection', 'legal'], '')}
                    </RadioBottomText>
                    <Paragraph>{getTextInConfigJSON(['plan-selection', 'summary'], '')}</Paragraph>
                    {packageData.length > 0 && (
                      <>
                        <SmallText>{t('total')}</SmallText>
                        <PriceTitle>
                          {htmlEntities.decode(packageData[packageIndex]?.currencySymbol)}{' '}
                          {packageData[packageIndex]?.retailPrice}
                        </PriceTitle>
                        <DescriptionText>
                          {getTextInConfigJSON(['plan-selection', 'sub-price'], '')}
                        </DescriptionText>
                      </>
                    )}
                    {errorMsg !== '' && <ErrorText>{errorMsg}</ErrorText>}
                    <Button
                      disabled={loading}
                      onPress={() => initiateIAPRequest()}
                      stretch
                      loading={loading}
                      size="big"
                      fontWeight="medium"
                      color={theme.PRIMARY_FOREGROUND_COLOR}
                    >
                      {getTextInConfigJSON(['plan-selection', 'ctas', '0'], '')}
                    </Button>
                    <Button
                      disabled={loading}
                      onPress={() => {
                        trackEvent('cancel');
                        _doSuccessSubscription(false);
                      }}
                      outline
                      size="big"
                      fontWeight="medium"
                      style={cancelStyle}
                    >
                      <CancelText>
                        {getTextInConfigJSON(['plan-selection', 'ctas', '1'], '')}
                      </CancelText>
                    </Button>
                  </PaddingHorizontalView>
                </>
              )}
            </Container>
            <Gradient>
              <Wrapper>
                <FooterTitle>{getTextInConfigJSON(['customer-service', 'title'], '')}</FooterTitle>
                <EmailTitle
                  onPress={() =>
                    Linking.openURL(`${getTextInConfigJSON(['customer-service', 'link-url'], '')}`)
                  }
                >
                  {getTextInConfigJSON(['customer-service', 'link'], '')}
                </EmailTitle>
              </Wrapper>
            </Gradient>
          </ScrollView>
        </KeyboardAvoidingView>
      </Gradient>
    </>
  );
};

export default SignUpSubscription;
