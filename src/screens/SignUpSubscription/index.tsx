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
import { getProductsRequest, addSubscriptionRequest } from '@store/modules/user/saga';
import { loggedInRequest, getProfileRequest } from '@store/modules/user/actions';
import { BritboxDataEvergentModelsGetProductsResponseMessageBaseProductsResponseMsg } from '@src/sdks/Britbox.API.Account.TS/api';
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

const productsResponse: BritboxDataEvergentModelsGetProductsResponseMessageBaseProductsResponseMsg[] = [];

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

      await RNIap.finishTransaction(purchase);

      receiptValidateIOS(purchase?.transactionReceipt);
    } catch (err) {
      setLoading(false);
    }
  };

  const receiptValidateIOS = async (receipt: string) => {
    _doSuccessSubscription();
    // try {
    // const receiptBody = {
    //   'receipt-data': receipt,
    //   password: '8b0228ae3d5a489e8b406f83be73762d',
    // };
    // await RNIap.validateReceiptIos(receiptBody, true);
    // const subscriptionResponse = await addSubscriptionRequest(user?.access?.accessToken || '', {
    //   rateType: 'App Store Billing',
    //   priceCharged: 69.99,
    //   appServiceID: 'BritBox_monthly_subscription',
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
    // _doSuccessSubscription();
    // }
    // } catch (err) {
    //   //
    // }

    setLoading(false);
  };

  const _doSuccessSubscription = async () => {
    dispatch(loggedInRequest());
    dispatch(getProfileRequest());
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
                  }
                )}
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
                  onPress={() => _doSuccessSubscription()}
                  outline
                  size="big"
                  fontWeight="medium"
                  style={cancelStyle}
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
