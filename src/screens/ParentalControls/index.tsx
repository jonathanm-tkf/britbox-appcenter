/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Text, Alert, Linking } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  validateContactPasswordRequest,
  getParentalControlDetail,
  updateParentalControlDetailsRequest,
} from '@store/modules/user/saga';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import HeaderCustom from '@components/HeaderCustom';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { useNavigation } from '@react-navigation/native';
import { EvergentResponseError } from '@store/modules/user/types';
import {
  BritboxDataEvergentModelsGetParentalControlDetailsResponseMessageBaseResponse,
  BritboxAPIAccountModelsProfileUpdateParentalControlDetailsRequest,
} from '@src/sdks/Britbox.API.Account.TS/api';
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
  ErrorText,
  DisabledOverlay,
} from './styles';

const CELL_COUNT = 4;

interface CellProps {
  index: number;
  symbol: string;
  isFocused: boolean;
}

const evergentResponseError: EvergentResponseError = {
  responseCode: 0,
  failureMessage: [],
};

const defaultParentalControlDetail: BritboxDataEvergentModelsGetParentalControlDetailsResponseMessageBaseResponse = {};

export default function ParentalControls() {
  const { t } = useTranslation(['myaccount', 'signup', 'layout']);
  const { navigate } = useNavigation();
  const [password, setPassword] = useState('');
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [parentalControlDetail, setParentalControlDetail] = useState(defaultParentalControlDetail);
  const [multiSliderValue, setMultiSliderValue] = useState(100);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const user = useSelector((state: AppState) => state.user);
  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment.toLocaleLowerCase() || 'us';

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
      // textChild = enableMask ? '•' : symbol;
      textChild = symbol;
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

  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(evergentResponseError);

  const openURLButton = async (link: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile

      Alert.alert(
        t('layout:openinbrowser'),
        '',
        [
          { text: t('layout:cancel'), onPress: () => {}, style: 'cancel' },
          { text: t('layout:open'), onPress: () => Linking.openURL(link.trim()) },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(`Don't know how to open this URL: ${link}`);
    }
  };

  const validateContactPassword = async () => {
    setLoading(true);
    setErrorState(false);
    setErrorMessage(evergentResponseError);

    const response = await validateContactPasswordRequest(
      user?.access?.accessToken || '',
      password
    );

    if (response) {
      const { response: responseData } = response;
      if (responseData && Number(responseData.responseCode) === 1) {
        updateParentalDetail();
      } else {
        setErrorMessage(responseData);
        setErrorState(true);
        setLoading(false);
      }
    }
  };

  const updateParentalDetail = async () => {
    const {
      response: { getParentalControlDetailsResponseMessage: parentalDetail },
    } = await getParentalControlDetail(user?.access?.accessToken || '');
    if (parentalDetail && Number(parentalDetail.responseCode) === 1) {
      setParentalControlDetail(parentalDetail);
      setValue(parentalDetail?.parentalControlPIN || '');
      if (
        parentalDetail?.parentalControlLevel ===
        britboxConfig[country]['parental-controls']?.levels[1].id
      ) {
        setMultiSliderValue(75);
      } else if (
        parentalDetail?.parentalControlLevel ===
        britboxConfig[country]['parental-controls']?.levels[2].id
      ) {
        setMultiSliderValue(50);
      } else if (
        parentalDetail?.parentalControlLevel ===
        britboxConfig[country]['parental-controls']?.levels[3].id
      ) {
        setMultiSliderValue(25);
      } else if (
        parentalDetail?.parentalControlLevel ===
        britboxConfig[country]['parental-controls']?.levels[4].id
      ) {
        setMultiSliderValue(1);
      } else {
        setMultiSliderValue(100);
      }

      setLoading(false);
      setLoadingSave(false);
      setIsAuthorize(true);
    } else {
      setErrorMessage(parentalDetail);
      setErrorState(true);
    }
  };

  const updateParentalControlDetail = async (parentalControl: string) => {
    if (parentalControl === 'true') {
      setLoadingSave(true);
    } else {
      setLoading(true);
    }

    setErrorState(false);
    setErrorMessage(evergentResponseError);

    let parmas: BritboxAPIAccountModelsProfileUpdateParentalControlDetailsRequest = {
      parentalControl,
    };

    if (parentalControl === 'true') {
      let parentalControlLevel: number = 0;
      if (multiSliderValue === 75) {
        parentalControlLevel = parseInt(britboxConfig[country]['parental-controls']?.levels[1].id);
      } else if (multiSliderValue === 50) {
        parentalControlLevel = parseInt(britboxConfig[country]['parental-controls']?.levels[2].id);
      } else if (multiSliderValue === 25) {
        parentalControlLevel = parseInt(britboxConfig[country]['parental-controls']?.levels[3].id);
      } else if (multiSliderValue === 75) {
        parentalControlLevel = parseInt(britboxConfig[country]['parental-controls']?.levels[4].id);
      }
      parmas = {
        ...parmas,
        parentalControlLevel,
        newParentalControlPin: value,
        oldParentalControlPin: parentalControlDetail?.parentalControlPIN,
      };
    } else {
      parmas = {
        ...parmas,
        oldParentalControlPin: parentalControlDetail?.parentalControlPIN,
      };
    }
    const response = await updateParentalControlDetailsRequest(
      user?.access?.accessToken || '',
      parmas
    );

    if (response) {
      const {
        response: { updateParentalControlDetailsResponseMessage: responseData },
      } = response;
      if (responseData && Number(responseData.responseCode) === 1) {
        updateParentalDetail();
      } else {
        setErrorMessage(responseData);
        setErrorState(true);
      }
    }
    if (parentalControl === 'true') {
      setLoadingSave(false);
    } else {
      setLoading(false);
    }
  };

  const tabBottomView = () => (
    <Gradient>
      <Wrapper>
        <FooterTitle>
          {t('signup:field.customerservice')}:{' '}
          {britboxConfig[country]['customer-service']?.phone || ''}
        </FooterTitle>
        <Paragraph>{britboxConfig[country]['customer-service']?.availability || ''}</Paragraph>
        <LinkTitle>{britboxConfig[country]['customer-service']?.email || ''}</LinkTitle>
      </Wrapper>
    </Gradient>
  );

  return (
    <Container>
      <HeaderCustom isBack shadow />
      {!isAuthorize ? (
        <ScrollableContainer>
          <TitleWrapper>
            <Title>{britboxConfig[country]['parental-controls']?.title || ''}</Title>
          </TitleWrapper>
          <Paragraph>{britboxConfig[country]['parental-controls']?.description || ''}</Paragraph>
          <TitleWrapper>
            <Title>{t('parentalcontrols.screentitle')}</Title>
          </TitleWrapper>
          {errorState && (
            <ErrorText>
              {
                ((errorMessage as unknown) as EvergentResponseError)?.failureMessage?.reduce(
                  (item) => item
                )?.errorMessage
              }
            </ErrorText>
          )}
          <PasswordContainer>
            <Input
              label={t('signup:field.password')}
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              onPress={() => validateContactPassword()}
              stretch
              loading={loading}
              size="big"
              fontWeight="medium"
              color={theme.PRIMARY_FOREGROUND_COLOR}
            >
              {t('signup:continue')}
            </Button>
          </PasswordContainer>
          {tabBottomView()}
        </ScrollableContainer>
      ) : (
        <ScrollableContainer scrollEnabled={!isSliding}>
          <TitleWrapper>
            <Title>{britboxConfig[country]['parental-controls']?.title || ''}</Title>
          </TitleWrapper>
          <Paragraph>{britboxConfig[country]['parental-controls']?.description || ''}</Paragraph>
          {parentalControlDetail?.parentalControl && (
            <PinBtnView>
              <PinBtnText>{t('parentalcontrols.parentalcontrolsset')}</PinBtnText>
              <Button
                onPress={() => updateParentalControlDetail('false')}
                style={turnOffPinStyle}
                link
                color={theme.SECONDARY_COLOR}
                loading={loading}
                size="big"
                fontWeight="medium"
              >
                {t('parentalcontrols.turnoffPIN')}
              </Button>
            </PinBtnView>
          )}
          {errorState && (
            <ErrorText>
              {
                ((errorMessage as unknown) as EvergentResponseError)?.failureMessage?.reduce(
                  (item) => item
                )?.errorMessage
              }
            </ErrorText>
          )}
          <SubTitle>{t('parentalcontrols.setPINText')}</SubTitle>
          <Paragraph>{t('parentalcontrols.setPINDesc')}</Paragraph>
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
          {value !== '' && (
            <Button
              onPress={() => setValue('')}
              link
              color={theme.SECONDARY_COLOR}
              size="big"
              fontWeight="medium"
            >
              {t('parentalcontrols.clearall')}
            </Button>
          )}
          {value !== '' && value.length !== 4 && (
            <PINErrorText>{t('parentalcontrols.PINerror')}</PINErrorText>
          )}
          <Gradient>
            <SubTitle>{t('parentalcontrols.levelText')}</SubTitle>
            <Paragraph>
              {multiSliderValue === 100 &&
                britboxConfig[country]['parental-controls']?.levels[0]['message-top']}
              {multiSliderValue === 75 &&
                britboxConfig[country]['parental-controls']?.levels[1]['message-top']}
              {multiSliderValue === 50 &&
                britboxConfig[country]['parental-controls']?.levels[2]['message-top']}
              {multiSliderValue === 25 &&
                britboxConfig[country]['parental-controls']?.levels[3]['message-top']}
              {multiSliderValue === 1 &&
                britboxConfig[country]['parental-controls']?.levels[4]['message-top']}{' '}
              <LinkTitle
                onPress={() =>
                  openURLButton(britboxConfig[country]['parental-controls']['help-link'] || '')
                }
              >
                {britboxConfig[country]['parental-controls']['help-text'] || ''}
              </LinkTitle>
            </Paragraph>

            <TableMainContainer>
              <RowContainer>
                <RowLeftContainer
                  style={multiSliderValue <= 76 && activeContainer}
                  onPress={() => setMultiSliderValue(multiSliderValue === 75 ? 100 : 75)}
                >
                  <RowLeftTitle style={multiSliderValue <= 76 && activeText}>
                    {britboxConfig[country]['parental-controls']?.levels[1].name || ''}
                  </RowLeftTitle>
                  {multiSliderValue <= 76 ? <UnLockIconView /> : <LockIconView />}
                </RowLeftContainer>
                <RowContent>
                  <TableBtnContainer>
                    {britboxConfig[country]['parental-controls']?.levels[1]?.labels?.map(
                      (item, index) => (
                        <BtnContainer key={index}>
                          <BtnText>{item}</BtnText>
                        </BtnContainer>
                      )
                    )}
                  </TableBtnContainer>
                  <TableRightText numberOfLines={4}>
                    {britboxConfig[country]['parental-controls']?.levels[1]['message-box'] || ''}
                  </TableRightText>
                </RowContent>
              </RowContainer>
              <RowContainer>
                <RowLeftContainer
                  style={multiSliderValue <= 51 && activeContainer}
                  onPress={() => setMultiSliderValue(multiSliderValue === 50 ? 75 : 50)}
                >
                  <RowLeftTitle style={multiSliderValue <= 51 && activeText}>
                    {britboxConfig[country]['parental-controls']?.levels[2].name || ''}
                  </RowLeftTitle>
                  {multiSliderValue <= 51 ? <UnLockIconView /> : <LockIconView />}
                </RowLeftContainer>
                <RowContent>
                  <TableBtnContainer>
                    {britboxConfig[country]['parental-controls']?.levels[2]?.labels?.map(
                      (item, index) => (
                        <BtnContainer key={index}>
                          <BtnText>{item}</BtnText>
                        </BtnContainer>
                      )
                    )}
                  </TableBtnContainer>
                  <TableRightText numberOfLines={4}>
                    {britboxConfig[country]['parental-controls']?.levels[2]['message-box'] || ''}
                  </TableRightText>
                </RowContent>
              </RowContainer>
              <RowContainer>
                <RowLeftContainer
                  style={multiSliderValue <= 26 && activeContainer}
                  onPress={() => setMultiSliderValue(multiSliderValue === 25 ? 50 : 25)}
                >
                  <RowLeftTitle style={multiSliderValue <= 26 && activeText}>
                    {britboxConfig[country]['parental-controls']?.levels[3].name || ''}
                  </RowLeftTitle>
                  {multiSliderValue <= 26 ? <UnLockIconView /> : <LockIconView />}
                </RowLeftContainer>
                <RowContent>
                  <TableBtnContainer>
                    {britboxConfig[country]['parental-controls']?.levels[3]?.labels?.map(
                      (item, index) => (
                        <BtnContainer key={index}>
                          <BtnText>{item}</BtnText>
                        </BtnContainer>
                      )
                    )}
                  </TableBtnContainer>
                  <TableRightText numberOfLines={4}>
                    {britboxConfig[country]['parental-controls']?.levels[3]['message-box'] || ''}
                  </TableRightText>
                </RowContent>
              </RowContainer>
              <RowContainer>
                <RowLeftContainer
                  style={multiSliderValue <= 1 && activeContainer}
                  onPress={() => setMultiSliderValue(multiSliderValue === 1 ? 25 : 1)}
                >
                  <RowLeftTitle style={multiSliderValue <= 1 && activeText}>
                    {britboxConfig[country]['parental-controls']?.levels[4].name || ''}
                  </RowLeftTitle>
                  {multiSliderValue <= 1 ? <UnLockIconView /> : <LockIconView />}
                </RowLeftContainer>
                <RowContent>
                  <TableBtnContainer>
                    {britboxConfig[country]['parental-controls']?.levels[4]?.labels?.map(
                      (item, index) => (
                        <BtnContainer key={index}>
                          <BtnText>{item}</BtnText>
                        </BtnContainer>
                      )
                    )}
                  </TableBtnContainer>
                  <TableRightText numberOfLines={4}>
                    {britboxConfig[country]['parental-controls']?.levels[4]['message-box'] || ''}
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
            <Button
              onPress={() => updateParentalControlDetail('true')}
              style={saveStyle}
              loading={loadingSave}
              size="big"
              fontWeight="medium"
              color={theme.PRIMARY_FOREGROUND_COLOR}
            >
              {t('signup:save')}
            </Button>
            {value.length !== 4 && <DisabledOverlay />}
          </Gradient>
          {tabBottomView()}
        </ScrollableContainer>
      )}
    </Container>
  );
}
