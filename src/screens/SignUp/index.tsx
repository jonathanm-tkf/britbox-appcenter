/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
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
  WrapperParagraph,
  Wrapper,
  CheckBoxView,
  RowWrapper,
  CancelText,
  Gradient,
} from './styles';

const flex = {
  flex: 1,
};

const cancelStyle = { marginTop: 15, borderWidth: 0 };

const SignUp = () => {
  const { goBack, navigate } = useNavigation();
  const { t } = useTranslation('signup');
  const theme = useSelector((state: AppState) => state.theme.theme);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCheckPrivacy] = useState(false);

  const loading = useSelector((state: AppState) => state.user.loading);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <>
      <HeaderCustom
        isBack
        shadow
        rightComponent={
          <Button link onPress={() => goBack()} color="#FFF">
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
                <Paragraph>Start your free trial then pay $69.99/year or $6.99/month</Paragraph>
                <SubTitle>Step 1 of 2: Create Your Account</SubTitle>
              </TitleWrapper>
              <Input
                label="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
              <Input
                label="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
              <Input label="Email" value={email} onChangeText={(text) => setEmail(text)} />
              <Input
                label="Create Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <Button
                onPress={() => navigate('SignUpSubscription')}
                stretch
                loading={loading}
                size="big"
                color={theme.PRIMARY_FOREGROUND_COLOR}
              >
                Create Account
              </Button>
              <Button outline size="big" style={cancelStyle} onPress={() => goBack()}>
                <CancelText>Cancel</CancelText>
              </Button>
            </Container>
            <Wrapper>
              <CheckBoxView value={isCheckPrivacy} />
              <RowWrapper>
                <WrapperParagraph>
                  By Clicking 'Create Account' you agree to the BritBox Terms and Conditions and our
                  Privacy Policy. We'll send you regular BritBox newsletters, along with other
                  special offers and promotions. You can opt out at any time by clicking on the
                  unsubscribe link in our emails.
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
