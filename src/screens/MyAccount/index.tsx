/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, Platform, Alert, Text, Switch } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ThemeState } from '@store/modules/theme/types';
import { BackIcon, CelularIcon } from '@assets/icons';
import HeaderCustom from '@components/HeaderCustom';
import TabsComponent from '@components/TabsComponent';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { useNavigation } from '@react-navigation/native';
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
} from './styles';

const updateBtnStyle = {
  marginBottom: 30,
};

export default function MyAccount() {
  const { navigate } = useNavigation();
  const user = useSelector((state: AppState) => state.user);
  const [firstName, setFirstName] = useState(user?.profile?.firstName || '');
  const [lastName, setLastName] = useState(user?.profile?.lastName || '');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isNewsletters, setIsNewsletters] = useState(false);

  const loading = useSelector((state: AppState) => state.user.loading);

  const DetailsRoute = () => {
    return (
      <ScrollableContainer>
        <ScrollContent>
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>Upgrade your Details</SubTitle>
            </TitleWrapper>
            <Input
              label="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <Input label="Last Name" value={lastName} onChangeText={(text) => setLastName(text)} />
            <Input label="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <Input label="Mobile" value={mobile} onChangeText={(text) => setMobile(text)} />
            <Button
              onPress={() => {}}
              stretch
              style={updateBtnStyle}
              loading={loading}
              size="big"
              fontWeight="medium"
            >
              Update
            </Button>
            <Paragraph>
              Your information will be used in accordance with our{' '}
              <LinkTitle>Privacy Policy</LinkTitle>.
            </Paragraph>
          </ScrollableContainerPaddingHorizontal>
          <Gradient>
            <Wrapper>
              <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
              <Paragraph>Available from noon-midnight EST</Paragraph>
              <LinkTitle>support-us@britbox.com</LinkTitle>
            </Wrapper>
          </Gradient>
        </ScrollContent>
      </ScrollableContainer>
    );
  };

  const PasswordRoute = () => {
    return (
      <ScrollableContainer>
        <ScrollContent>
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>Change Password</SubTitle>
            </TitleWrapper>
            <Input
              label="Current password"
              value={curPassword}
              onChangeText={(text) => setCurPassword(text)}
            />
            <Input
              label="New password"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <Input
              label="Confirm password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <Button onPress={() => {}} stretch loading={loading} size="big" fontWeight="medium">
              Update
            </Button>
          </ScrollableContainerPaddingHorizontal>
        </ScrollContent>
        <Gradient>
          <Wrapper>
            <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
            <Paragraph>Available from noon-midnight EST</Paragraph>
            <LinkTitle>support-us@britbox.com</LinkTitle>
          </Wrapper>
        </Gradient>
      </ScrollableContainer>
    );
  };

  const SubscriptionRoute = () => {
    return (
      <ScrollableContainer>
        <ScrollableContainerPaddingHorizontal>
          <TitleWrapper>
            <SubTitle>Your subscription</SubTitle>
          </TitleWrapper>
          <SubscriptionParagraph>
            You are subscribed directly via Android. Please go to Google Subscription to review or
            update your subscription and payment details.
          </SubscriptionParagraph>
        </ScrollableContainerPaddingHorizontal>
        <Gradient>
          <Wrapper>
            <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
            <Paragraph>Available from noon-midnight EST</Paragraph>
            <LinkTitle>support-us@britbox.com</LinkTitle>
          </Wrapper>
        </Gradient>
      </ScrollableContainer>
    );
  };
  const NewsletterRoute = () => {
    return (
      <ScrollableContainer>
        <ScrollContent>
          <ScrollableContainerPaddingHorizontal>
            <TitleWrapper>
              <SubTitle>Newsletter preferences</SubTitle>
            </TitleWrapper>
            <RowContainer>
              <SwitchContainer
                value={isNewsletters}
                onValueChange={(value: boolean) => setIsNewsletters(value)}
              />
              <RowContent>
                <NewsParagraph>BritBox newsletter, special promotions and offers.</NewsParagraph>
              </RowContent>
            </RowContainer>
            <Button
              onPress={() => {}}
              stretch
              style={updateBtnStyle}
              loading={loading}
              size="big"
              fontWeight="medium"
            >
              Update
            </Button>
            <Paragraph>
              Your information will be used in accordance with our{' '}
              <LinkTitle>Privacy Policy</LinkTitle>.
            </Paragraph>
          </ScrollableContainerPaddingHorizontal>
        </ScrollContent>
        <Gradient>
          <Wrapper>
            <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
            <Paragraph>Available from noon-midnight EST</Paragraph>
            <LinkTitle>support-us@britbox.com</LinkTitle>
          </Wrapper>
        </Gradient>
      </ScrollableContainer>
    );
  };

  const DATA = [
    {
      key: 'details',
      title: 'Your Details ',
      content: () => <DetailsRoute />,
    },
    { key: 'password', title: 'Password ', content: () => <PasswordRoute /> },
    {
      key: 'subscription',
      title: 'Subscription ',
      content: () => <SubscriptionRoute />,
    },
    {
      key: 'newsletter',
      title: 'Newsletter ',
      content: () => <NewsletterRoute />,
    },
  ];

  return (
    <Container>
      <HeaderCustom isBack shadow />
      <Container>
        <TitleWrapper>
          <Title>Account Details</Title>
        </TitleWrapper>
        <Container>
          <TabsComponent routes={DATA} />
        </Container>
      </Container>
    </Container>
  );
}
