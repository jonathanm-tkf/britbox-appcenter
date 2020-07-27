/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Button } from '@components/Button';
import HeaderCustom from '@components/HeaderCustom';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Orientation from 'react-native-orientation-locker';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
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
} from './styles';

const flex = {
  flex: 1,
};

const SignUpSubscription = () => {
  const navigation = useNavigation();
  const { t } = useTranslation('signup');
  const theme = useSelector((state: AppState) => state.theme.theme);
  const cancelStyle = { marginTop: 15, borderWidth: 0 };
  const textLeft = { textAlign: 'left' };
  const activeRadio = {
    backgroundColor: theme.SECONDARY_COLOR,
    borderColor: theme.SECONDARY_COLOR,
  };
  const loading = useSelector((state: AppState) => state.user.loading);
  const [packageName, setPackageName] = useState('monthly');

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <>
      <HeaderCustom
        isBack
        shadow
        rightComponent={
          <Button link onPress={() => navigation.navigate('Login')} color="#FFF">
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
                <RadioBox
                  onPress={() => setPackageName('monthly')}
                  style={packageName === 'monthly' && activeRadio}
                >
                  <SubTitle style={textLeft}>Monthly</SubTitle>
                  <DescriptionText style={textLeft}>$6.99 per month</DescriptionText>
                </RadioBox>
                <RadioBox
                  onPress={() => setPackageName('annual')}
                  style={packageName === 'annual' && activeRadio}
                >
                  <SubTitle style={textLeft}>Annual</SubTitle>
                  <DescriptionText style={[textLeft, { marginBottom: 0 }]}>
                    $69.99 per month
                  </DescriptionText>
                  <RadioBottomText style={[textLeft, { marginTop: 5 }]}>
                    12 months for the price of 10
                  </RadioBottomText>
                </RadioBox>
              </RowWrapper>
              <RadioBottomText>
                Prices may be subject to local sales tax, where applicable.
              </RadioBottomText>
              <Paragraph>
                Please tap 'Start free trial' button to proceed with payment for your Subscription,
                so you can start enjoying BritBox.
              </Paragraph>
              <SmallText>Total</SmallText>
              <PriceTitle>$6.99</PriceTitle>
              <DescriptionText>per month after free trial ends</DescriptionText>
              <Button
                onPress={() => {}}
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
