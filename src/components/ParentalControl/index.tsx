import React, { useEffect, useMemo, useState } from 'react';
import { Text } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BottomSheetWrapper, Headline, Paragraph } from '@components/Layout';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ThemeProps } from '@store/modules/theme/types';
import { withTheme } from 'styled-components';
import { validateParentalControl } from '@src/services/Video';
import { Access, ValidateParentalControlResponse } from '@src/services/Video/types';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { ParagraphChecking, ParagraphError, WrapperPin } from './styles';

interface CellProps {
  index: number;
  symbol: string;
  isFocused: boolean;
}

type Props = {
  item: MassiveSDKModelItemSummary | undefined;
  onSuccess: (data: ValidateParentalControlResponse) => void;
  readonly theme: ThemeProps;
};

const BLUE_COLOR = '#202634';

const ParentalControl = React.forwardRef(({ theme, item, onSuccess }: Props, ref) => {
  const { t } = useTranslation('layout');
  const user = useSelector((state: AppState) => state.user);
  const [errorValuePin, setErrorValuePin] = useState(false);
  const [checkingParentalControl, setCheckingParentalControl] = useState(false);
  const [valuePin, setValuePin] = useState('');
  const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: valuePin,
    setValue: setValuePin,
  });

  const refPin = useBlurOnFulfill({ value: valuePin, cellCount: 4 });

  const cell = useMemo(
    () => ({
      width: 60,
      height: 60,
      lineHeight: 50,
      fontSize: 30,
      borderRadius: 10,
      marginHorizontal: 15,
      borderWidth: 2,
      borderColor: BLUE_COLOR,
      backgroundColor: BLUE_COLOR,
      color: theme.SECONDARY_FOREGROUND_COLOR,
      textAlign: 'center',
      overflow: 'hidden',
    }),
    [theme]
  );

  const focusCell = useMemo(
    () => ({
      borderColor: theme.SECONDARY_FOREGROUND_COLOR,
    }),
    [theme]
  );

  const customStyles = useMemo(
    () => ({
      container: {
        maxWidth: 400,
        alignItems: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      },
      wrapper: {
        alignItems: 'center',
      },
      draggableIcon: {
        backgroundColor: theme.PRIMARY_TEXT_COLOR_OPAQUE,
        width: 50,
        marginTop: 20,
      },
    }),
    [theme]
  );

  const renderCell = ({ index, symbol, isFocused }: CellProps) => {
    let textChild = null;
    if (symbol) {
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

  useEffect(() => {
    if (valuePin !== '' && valuePin.length === 4) {
      setErrorValuePin(false);
      setCheckingParentalControl(true);
      validateParentalControl(user?.access as Access, item, valuePin)
        .then((r) => {
          if (onSuccess) {
            setCheckingParentalControl(false);
            setErrorValuePin(false);
            setValuePin('');
            onSuccess({ ...r });
          }
        })
        .catch(() => {
          setCheckingParentalControl(false);
          setErrorValuePin(true);
          setValuePin('');
        });
    }
  }, [item, onSuccess, user?.access, valuePin]);

  return (
    <RBSheet
      ref={ref}
      height={280}
      closeOnDragDown
      closeOnPressMask={false}
      {...{ customStyles }}
      onClose={() => setErrorValuePin(false)}
    >
      <BottomSheetWrapper>
        <Headline center color={theme.PRIMARY_TEXT_COLOR}>
          {t('myaccount:parentalcontrols:title')}
        </Headline>
        <WrapperPin>
          <Paragraph>{t('myaccount:parentalcontrols:enter')}</Paragraph>
          <CodeField
            ref={refPin}
            {...codeProps}
            value={valuePin}
            onChangeText={setValuePin}
            cellCount={4}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          {checkingParentalControl && (
            <ParagraphChecking>{t('myaccount:parentalcontrols:checking')}</ParagraphChecking>
          )}
          {errorValuePin && (
            <ParagraphError>{t('myaccount:parentalcontrols:errorpin')}</ParagraphError>
          )}
        </WrapperPin>
      </BottomSheetWrapper>
    </RBSheet>
  );
});

export default withTheme(ParentalControl);
