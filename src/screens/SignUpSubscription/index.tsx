/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Button } from '@components/Button';
import HeaderCustom from '@components/HeaderCustom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsRequest, profile } from '@store/modules/user/saga';
import { loggedInRequest, profileRequestSuccess } from '@store/modules/user/actions';
import { ProductsResponse } from '@store/modules/user/types';
import { AppState } from '@store/modules/rootReducer';
import Orientation from 'react-native-orientation-locker';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Html5Entities } from 'html-entities';
import * as RNIap from 'react-native-iap';
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
} from './styles';

const htmlEntities = new Html5Entities();

const flex = {
  flex: 1,
};

const productsResponse: ProductsResponse[] = [];

const SignUpSubscription = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation('signup');
  const theme = useSelector((state: AppState) => state.theme.theme);
  const user = useSelector((state: AppState) => state.user);

  const cancelStyle = { marginTop: 15, borderWidth: 0 };
  const textLeft = { textAlign: 'left' };
  const activeRadio = {
    backgroundColor: theme.SECONDARY_COLOR,
    borderColor: theme.SECONDARY_COLOR,
  };

  const [loading, setLoading] = useState(false);
  const [packageData, setPackageData] = useState(productsResponse);
  const [packageIndex, setPackageIndex] = useState(0);

  const initialConnection = async () => {
    try {
      await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
    } catch (error) {
      //
    }

    // console.tron.log(user.access.accessToken);
    // const subscriptionResponse = await addSubscriptionRequest(user.access.accessToken, {
    //   rateType: 'App Store Billing',
    //   priceCharged: 64.99,
    //   appServiceID: 'US MONTHLY TRIAL SVOD',
    //   serviceType: 'PRODUCT',
    //   paymentmethodInfo: {
    //     label: 'App Store Billing',
    //     transactionReferenceMsg: {
    //       amount: 64.99,
    //       txID:
    //         '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',
    //       txMsg: 'Success',
    //     },
    //   },
    // });

    // alert(JSON.stringify(subscriptionResponse));
  };

  useEffect(() => {
    // Orientation.lockToPortrait();
    initialConnection();
    getProducts();
  }, []);

  const getProducts = async () => {
    if (Platform.OS === 'ios') {
      await RNIap.getProducts([
        'com.britbox.us.staging.subscription.annual.freetrial',
        'com.britbox.us.subscription.annual',
        'com.britbox.us.subscription',
      ]);
    } else {
      await RNIap.getSubscriptions([
        'com.britbox.stage.subscription.annual',
        'com.britbox.us.staging.subscription.notrial',
      ]);
    }

    const { response } = await getProductsRequest();
    if (response && Number(response.responseCode) === 1) {
      setPackageData(response.productsResponseMessage);
    }
  };

  const initiateIAPRequest = async () => {
    setLoading(true);
    try {
      const purchase = await RNIap.requestSubscription(
        Platform.OS === 'ios'
          ? 'com.britbox.us.staging.subscription.annual.freetrial'
          : 'com.britbox.stage.subscription.annual'
      );

      // if (Platform.OS === 'ios') {
      //   receiptValidateIOS(purchase.transactionReceipt);
      // }

      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          if (Platform.OS === 'ios') {
            await RNIap.finishTransactionIOS(purchase.transactionId);
          } else if (Platform.OS === 'android') {
            await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
          }

          await RNIap.finishTransaction(purchase);

          receiptValidateIOS(purchase.transactionReceipt);
        } catch (ackErr) {
          //
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const receiptValidateIOS = async () => {
    try {
      // const receiptBody = {
      //   'receipt-data': receipt,
      //   password: '8b0228ae3d5a489e8b406f83be73762d',
      // };

      // await RNIap.validateReceiptIos(receiptBody, true);

      // const subscriptionResponse = await addSubscriptionRequest(user.access.accessToken, {
      //   rateType: 'App Store Billing',
      //   // priceCharged: packageData[packageIndex]?.retailPrice,
      //   priceCharged: 69.99,
      //   appServiceID: 'com.britbox.us.subscription.annual',
      //   serviceType: 'PRODUCT',
      //   paymentmethodInfo: {
      //     label: 'App Store Billing',
      //     transactionReferenceMsg: {
      //       amount: 69.99,
      //       txID: receipt,
      //       txMsg: 'Success',
      //     },
      //   },
      // });

      // if (subscriptionResponse) {
      const responseProfile = await profile(user.access?.accessToken);
      dispatch(loggedInRequest());
      dispatch(profileRequestSuccess(responseProfile));
      // }
    } catch (err) {
      //
    }

    setLoading(false);
  };

  return (
    <>
      <HeaderCustom
        isBack
        shadow
        rightComponent={
          <Button
            link
            onPress={() => navigation.navigate('Login')}
            color={theme.PRIMARY_FOREGROUND_COLOR}
          >
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
                <Paragraph>You've Successfully Created Your Account</Paragraph>
                <SubTitle>Choose Subscription</SubTitle>
              </TitleWrapper>
              <RowWrapper>
                {packageData.map((item: ProductsResponse, index: number) => {
                  return (
                    <RadioBox
                      key={index}
                      onPress={() => setPackageIndex(index)}
                      style={packageIndex === index && activeRadio}
                    >
                      <RadioBoxContent>
                        <SubTitle style={textLeft}>{item.productDescription}</SubTitle>
                        <DescriptionText style={[textLeft, { marginBottom: 10 }]}>
                          {item.displayName}
                        </DescriptionText>
                      </RadioBoxContent>
                      {packageIndex === index ? (
                        <RadioCheckedIconView />
                      ) : (
                        <RadioUnCheckedIconView />
                      )}
                    </RadioBox>
                  );
                })}
              </RowWrapper>
              <PaddingHorizontalView>
                <RadioBottomText>
                  Prices may be subject to local sales tax, where applicable.
                </RadioBottomText>
                <Paragraph>
                  Please tap 'Start free trial' button to proceed with payment for your
                  Subscription, so you can start enjoying BritBox.
                </Paragraph>
                <SmallText>Total</SmallText>
                <PriceTitle>
                  {/* {`\uFE69`} */}
                  {htmlEntities.decode(packageData[packageIndex]?.currencySymbol)}{' '}
                  {packageData[packageIndex]?.retailPrice}
                </PriceTitle>
                <DescriptionText>per month after free trial ends</DescriptionText>
                <Button
                  onPress={() => initiateIAPRequest()}
                  stretch
                  loading={loading}
                  size="big"
                  fontWeight="medium"
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                >
                  Start free trial
                </Button>
                <Button
                  outline
                  size="big"
                  fontWeight="medium"
                  style={cancelStyle}
                  onPress={() => navigation.navigate('Login')}
                >
                  <CancelText>Cancel</CancelText>
                </Button>
              </PaddingHorizontalView>
            </Container>
            <Wrapper>
              <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
              <Paragraph>Available from noon-midnight EST</Paragraph>
              <EmailTitle>support-us@britbox.com</EmailTitle>
            </Wrapper>
          </ScrollView>
        </KeyboardAvoidingView>
      </Gradient>
    </>
  );
};

export default SignUpSubscription;
