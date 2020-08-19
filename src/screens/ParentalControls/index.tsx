/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Alert, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ThemeState } from '@store/modules/theme/types';
import { BackIcon, CelularIcon } from '@assets/icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
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
  RowContainer,
  RowContent,
  TableMainContainer,
  RowLeftContainer,
  RowLeftTitle,
  SliderContainer,
  TableBtnContainer,
  BtnContainer,
  BtnText,
  TableRightText,
  PinBtnView,
  PinBtnText,
  PINView,
  PINErrorText,
  LockIconView,
  UnLockIconView,
  PasswordContainer,
} from './styles';

const CELL_COUNT = 4;

interface CellProps {
  index: number;
  symbol: string;
  isFocused: boolean;
}

export default function ParentalControls() {
  const { navigate } = useNavigation();
  const [password, setPassword] = useState('');
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [multiSliderValue, setMultiSliderValue] = useState(100);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const loading = useSelector((state: AppState) => state.user.loading);

  const activeContainer = {
    backgroundColor: 'white',
  };

  const activeText = {
    color: theme.SECONDARY_COLOR,
  };

  const saveStyle = {
    width: '65%',
    alignItems: 'center',
    marginBottom: 30,
  };

  const turnOffPinStyle = {
    backgroundColor: theme.SECONDARY_FOREGROUND_COLOR,
    width: '100%',
    alignItems: 'center',
  };

  const cell = {
    width: 60,
    height: 60,
    lineHeight: 50,
    fontSize: 30,
    borderRadius: 10,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: '#202634',
    backgroundColor: '#202634',
    color: theme.SECONDARY_FOREGROUND_COLOR,
    textAlign: 'center',
    overflow: 'hidden',
  };

  const focusCell = {
    borderColor: theme.SECONDARY_FOREGROUND_COLOR,
  };

  const trackStyle = { backgroundColor: theme.SECONDARY_FOREGROUND_COLOR };

  const selectedStyle = { backgroundColor: theme.PRIMARY_TEXT_COLOR_OPAQUE };

  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask((f) => !f);

  const renderCell = ({ index, symbol, isFocused }: CellProps) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[cell, isFocused && focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };

  return (
    <Container>
      <HeaderCustom isBack shadow />
      {!isAuthorize ? (
        <ScrollableContainer>
          <TitleWrapper>
            <Title>Parental Controls</Title>
          </TitleWrapper>
          <Paragraph>Protect your family with the parental controls PIN</Paragraph>
          <TitleWrapper>
            <Title>Enter your password</Title>
          </TitleWrapper>
          <PasswordContainer>
            <Input label="Password" value={password} onChangeText={(text) => setPassword(text)} />
            <Button onPress={() => setIsAuthorize(true)} stretch loading={loading} size="big">
              Countinue
            </Button>
          </PasswordContainer>
          <Gradient>
            <Wrapper>
              <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
              <Paragraph>Available from noon-midnight EST</Paragraph>
              <LinkTitle>support-us@britbox.com</LinkTitle>
            </Wrapper>
          </Gradient>
        </ScrollableContainer>
      ) : (
        <ScrollableContainer scrollEnabled={!isSliding}>
          <TitleWrapper>
            <Title>Parental Controls</Title>
          </TitleWrapper>
          <Paragraph>Protect your family with the parental controls PIN</Paragraph>
          <PinBtnView>
            <PinBtnText>Parental controls set</PinBtnText>
            <Button
              onPress={() => {}}
              style={turnOffPinStyle}
              link
              color={theme.SECONDARY_COLOR}
              loading={loading}
              size="big"
              fontWeight="medium"
            >
              Turn Off PIN
            </Button>
          </PinBtnView>
          <SubTitle>Step 1: Set your 4 digit PIN</SubTitle>
          <Paragraph>
            Your PIN will be set across all browsers and devices when you access BritBox programmes.
          </Paragraph>
          <PINView>
            <CodeField
              ref={ref}
              {...codeProps}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
            />
          </PINView>
          <Button
            onPress={() => setValue('')}
            link
            color={theme.SECONDARY_COLOR}
            loading={loading}
            size="big"
            fontWeight="medium"
          >
            Clear all
          </Button>
          <PINErrorText>Pin must be 4 digits.</PINErrorText>
          <Gradient>
            <SubTitle>Step 2: Set level of viewing restriction</SubTitle>
            <Paragraph>
              Programmes for Teen and up will require PIN entery for viewing.{' '}
              <LinkTitle>Learn more about TV ratings</LinkTitle>
            </Paragraph>

            <TableMainContainer>
              <RowContainer>
                <RowLeftContainer
                  style={multiSliderValue <= 76 && activeContainer}
                  onPress={() => setMultiSliderValue(75)}
                >
                  <RowLeftTitle style={multiSliderValue <= 76 && activeText}>General</RowLeftTitle>
                  {multiSliderValue <= 76 ? <UnLockIconView /> : <LockIconView />}
                </RowLeftContainer>
                <RowContent>
                  <TableBtnContainer>
                    <BtnContainer>
                      <BtnText>TV-G</BtnText>
                    </BtnContainer>
                    <BtnContainer>
                      <BtnText>TV-Y</BtnText>
                    </BtnContainer>
                    <BtnContainer>
                      <BtnText>TV-Y7</BtnText>
                    </BtnContainer>
                  </TableBtnContainer>
                  <TableRightText>
                    Most parents would find this programs suitable for all ages.
                  </TableRightText>
                </RowContent>
              </RowContainer>
              <RowContainer>
                <RowLeftContainer
                  style={multiSliderValue <= 51 && activeContainer}
                  onPress={() => setMultiSliderValue(50)}
                >
                  <RowLeftTitle style={multiSliderValue <= 51 && activeText}>
                    Older Kids
                  </RowLeftTitle>
                  {multiSliderValue <= 51 ? <UnLockIconView /> : <LockIconView />}
                </RowLeftContainer>
                <RowContent>
                  <TableBtnContainer>
                    <BtnContainer>
                      <BtnText>TV-PG</BtnText>
                    </BtnContainer>
                  </TableBtnContainer>
                  <TableRightText>
                    This program contains material that parents may find unsuitable for younger
                    children.
                  </TableRightText>
                </RowContent>
              </RowContainer>
              <RowContainer>
                <RowLeftContainer
                  style={multiSliderValue <= 26 && activeContainer}
                  onPress={() => setMultiSliderValue(25)}
                >
                  <RowLeftTitle style={multiSliderValue <= 26 && activeText}>Teens</RowLeftTitle>
                  {multiSliderValue <= 26 ? <UnLockIconView /> : <LockIconView />}
                </RowLeftContainer>
                <RowContent>
                  <TableBtnContainer>
                    <BtnContainer>
                      <BtnText>TV-14</BtnText>
                    </BtnContainer>
                  </TableBtnContainer>
                  <TableRightText>
                    This program contains some material that parents would find unsuitable for
                    children under 14 years of age.
                  </TableRightText>
                </RowContent>
              </RowContainer>
              <RowContainer>
                <RowLeftContainer
                  style={multiSliderValue <= 1 && activeContainer}
                  onPress={() => setMultiSliderValue(1)}
                >
                  <RowLeftTitle style={multiSliderValue <= 1 && activeText}>Adults</RowLeftTitle>
                  {multiSliderValue <= 1 ? <UnLockIconView /> : <LockIconView />}
                </RowLeftContainer>
                <RowContent>
                  <TableBtnContainer>
                    <BtnContainer>
                      <BtnText>TV-MA</BtnText>
                    </BtnContainer>
                    <BtnContainer>
                      <BtnText>NR</BtnText>
                    </BtnContainer>
                  </TableBtnContainer>
                  <TableRightText>
                    This program is specifically designed to be viewed by adults and therefore may
                    be unsuitable for children under 18.
                  </TableRightText>
                </RowContent>
              </RowContainer>
              <SliderContainer>
                <MultiSlider
                  values={[multiSliderValue]}
                  sliderLength={600}
                  trackStyle={trackStyle}
                  selectedStyle={selectedStyle}
                  onValuesChange={(sliderValue: number[]) => {
                    setIsSliding(true);
                    setMultiSliderValue(sliderValue[0]);
                  }}
                  vertical
                  min={1}
                  max={100}
                  step={25}
                  allowOverlap
                  snapped
                  onValuesChangeFinish={() => {
                    setIsSliding(false);
                  }}
                />
              </SliderContainer>
            </TableMainContainer>
            <Button onPress={() => {}} style={saveStyle} loading={loading} size="big">
              Save
            </Button>
          </Gradient>
          <Gradient>
            <Wrapper>
              <FooterTitle>Customer Service: 1-888-636-7662</FooterTitle>
              <Paragraph>Available from noon-midnight EST</Paragraph>
              <LinkTitle>support-us@britbox.com</LinkTitle>
            </Wrapper>
          </Gradient>
        </ScrollableContainer>
      )}
    </Container>
  );
}
