/* eslint-disable */
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
import { profileRequestSuccess } from '@store/modules/user/actions';
import { ProductsResponse } from '@store/modules/user/types';
import { AppState } from '@store/modules/rootReducer';
import Orientation from 'react-native-orientation-locker';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Html5Entities } from 'html-entities';
import * as RNIap from 'react-native-iap';
// import { ReceiptValidationResponse } from 'react-native-iap/type/apple';
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
    await RNIap.initConnection();
  };

  useEffect(() => {
    Orientation.lockToPortrait();
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
        'com.britbox.us.staging.subscription.annual.freetrial'
      );
      if (Platform.OS === 'ios') {
        receiptValidateIOS(purchase.transactionReceipt);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const receiptValidateIOS = async (receipt: string) => {
    try {
      const receiptBody = {
        'receipt-data': receipt,
        password: '8b0228ae3d5a489e8b406f83be73762d',
      };

      await RNIap.validateReceiptIos(receiptBody, true);

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
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                >
                  Start free trial
                </Button>
                <Button
                  outline
                  size="big"
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
