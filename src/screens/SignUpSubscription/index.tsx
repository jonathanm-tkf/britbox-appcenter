/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { Button } from '@components/Button';
import HeaderCustom from '@components/HeaderCustom';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { getProductsRequest, addSubscriptionRequest } from '@store/modules/user/saga';
import { loggedInRequest, getProfileRequest } from '@store/modules/user/actions';
import {
  BritboxDataEvergentModelsGetProductsResponseMessageBaseProductsResponseMsg,
  BritboxDataEvergentModelsGetProductsResponseMessageBaseAppChannels,
  BritboxDataEvergentModelsPaymentMethodInfo,
} from '@src/sdks/Britbox.API.Account.TS/api';
import { AppState } from '@store/modules/rootReducer';
import { useTranslation } from 'react-i18next';
import { Html5Entities } from 'html-entities';
import * as RNIap from 'react-native-iap';
import { encode } from 'base-64';
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
  const navigation = useNavigation();
  const { params } = useRoute<SubscriptionScreenRouteProp>();
  const account: boolean | undefined = params?.account;
  const { t } = useTranslation('signup');
  const theme = useSelector((state: AppState) => state.theme.theme);
  const user = useSelector((state: AppState) => state.user);
  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment?.toLocaleLowerCase() || 'us';

  const cancelStyle = { marginTop: 15, borderWidth: 0 };
  const textLeft = { textAlign: 'left' };
  const activeRadio = {
    backgroundColor: theme.SECONDARY_COLOR,
    borderColor: theme.SECONDARY_COLOR,
  };

  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    initialConnection();
    getProducts();
  }, []);

  useEffect(() => {
    if (packageData) {
      changePackageName();
    }
  }, [packageData, packageIndex]);

  const getProducts = async () => {
    const { response } = await getProductsRequest(country);

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
      } else {
        setErrorMsg("Couldn't get products");
      }
    } else {
      setErrorMsg("Couldn't get products");
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

      const purchase = await RNIap.requestSubscription(String(packageId));

      await RNIap.finishTransaction(purchase);

      receiptValidateIOS(purchase?.transactionReceipt);
    } catch (err) {
      setErrorMsg(err?.message);
      setLoading(false);
    }
  };

  const receiptValidateIOS = async (receipt: string) => {
    // _doSuccessSubscription();
    try {
      const receiptBody = {
        'receipt-data': receipt,
        password: '8b0228ae3d5a489e8b406f83be73762d',
      };
      await RNIap.validateReceiptIos(receiptBody, true);

      const paymentmethodInfo: BritboxDataEvergentModelsPaymentMethodInfo = {
        label: Platform.OS === 'ios' ? 'App Store Billing' : 'Google Wallet',
        transactionReferenceMsg: {
          amount: packageData[packageIndex]?.retailPrice,
          txID: Platform.OS === 'ios' ? receipt : encode(receipt.purchaseToken),
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

      if (subscriptionResponse && subscriptionResponse?.status) {
        _doSuccessSubscription();
      } else {
        setErrorMsg(
          (subscriptionResponse && subscriptionResponse[0]?.errorMessage) ||
            "Subscription couldn't be done."
        );
      }
    } catch (err) {
      setErrorMsg('Something went wrong.');
    }

    setLoading(false);
  };

  const _doSuccessSubscription = async () => {
    dispatch(getProfileRequest());
    if (account) {
      navigation.goBack();
    } else {
      dispatch(loggedInRequest());
    }
  };

  return (
    <>
      <HeaderCustom isBack shadow />
      <Gradient style={{ marginBottom: account ? 90 : 0 }}>
        <KeyboardAvoidingView style={flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView bounces={false}>
            <Container>
              <TitleWrapper>
                <Title>{britboxConfig[country]['plan-selection']?.title || ''}</Title>
                <Paragraph>{britboxConfig[country]['plan-selection']?.description || ''}</Paragraph>
                <SubTitle>
                  {britboxConfig[country]['plan-selection']['description-2'] || ''}
                </SubTitle>
              </TitleWrapper>
              <RowWrapper>
                {packageData.map(
                  (
                    item: BritboxDataEvergentModelsGetProductsResponseMessageBaseProductsResponseMsg,
                    index: number
                  ) => {
                    return (
                      <RadioBox
                        key={index}
                        onPress={() => setPackageIndex(index)}
                        style={packageIndex === index && activeRadio}
                      >
                        <RadioBoxContent>
                          <SubTitle style={textLeft}>{item?.productDescription}</SubTitle>
                          <DescriptionText style={[textLeft, { marginBottom: 10 }]}>
                            {item?.displayName}
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
                  {britboxConfig[country]['plan-selection']?.legal || ''}
                </RadioBottomText>
                <Paragraph>{britboxConfig[country]['plan-selection']?.summary || ''}</Paragraph>
                {packageData.length > 0 && (
                  <>
                    <SmallText>{t('total')}</SmallText>
                    <PriceTitle>
                      {htmlEntities.decode(packageData[packageIndex]?.currencySymbol)}{' '}
                      {packageData[packageIndex]?.retailPrice}
                    </PriceTitle>
                    <DescriptionText>
                      {britboxConfig[country]['plan-selection']['sub-price'] || ''}
                    </DescriptionText>
                  </>
                )}
                {errorMsg !== '' && <ErrorText>{errorMsg}</ErrorText>}
                <Button
                  onPress={() => initiateIAPRequest()}
                  stretch
                  loading={loading}
                  size="big"
                  fontWeight="medium"
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                >
                  {britboxConfig[country]['plan-selection']?.ctas[0] || ''}
                </Button>
                <Button
                  onPress={() => _doSuccessSubscription()}
                  outline
                  size="big"
                  fontWeight="medium"
                  style={cancelStyle}
                >
                  <CancelText>{britboxConfig[country]['plan-selection']?.ctas[1] || ''}</CancelText>
                </Button>
              </PaddingHorizontalView>
            </Container>
            <Wrapper>
              <FooterTitle>
                {t('field.customerservice')}:{' '}
                {britboxConfig[country]['customer-service']?.phone || ''}
              </FooterTitle>
              <Paragraph>
                {britboxConfig[country]['customer-service']?.availability || ''}
              </Paragraph>
              <EmailTitle
                onPress={() =>
                  Linking.openURL(
                    `mailto:${britboxConfig[country]['customer-service']?.email || ''}`
                  )
                }
              >
                {britboxConfig[country]['customer-service']?.email || ''}
              </EmailTitle>
            </Wrapper>
          </ScrollView>
        </KeyboardAvoidingView>
      </Gradient>
    </>
  );
};

export default SignUpSubscription;
