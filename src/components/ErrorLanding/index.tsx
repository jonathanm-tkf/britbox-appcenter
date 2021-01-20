import React from 'react';
import { Linking } from 'react-native';

import { Button } from '@components/Button';
import { useTranslation } from 'react-i18next';
import { Headline, Paragraph } from '@components/Typography';
import { getTextInConfigJSON, getGlobalTextInConfigJSON } from '@src/utils/object';
import { isTablet } from '@src/utils/tablet';
import { Container, Opaque, BottomParagraph, LinkTitle, LogoContainer, Logo } from './styles';

type Props = {
  onPress: () => void;
  out?: boolean;
};

const ErrorLanding = ({ onPress, out = false }: Props) => {
  const { t } = useTranslation('layout');
  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Headline fontSize={isTablet() ? 28 : 22} lineHeight={isTablet() ? 40 : 34} center>
        {!out
          ? getTextInConfigJSON(['error-page', 'message-1'], t('error.subtitle'))
          : getGlobalTextInConfigJSON(['out-of-region', 'message'], t('errorOut.subtitle'))}
      </Headline>
      {!out ? (
        <>
          <Opaque>
            <Paragraph fontSize={isTablet() ? 16 : 12} lineHeight={isTablet() ? 22 : 18}>
              {getTextInConfigJSON(['error-page', 'message-2'], t('error.description'))}
            </Paragraph>
          </Opaque>
          <Button size="big" stretch fontWeight="medium" onPress={onPress}>
            {getTextInConfigJSON(['error-page', 'ctas', '0'], t('error.button'))}
          </Button>
        </>
      ) : (
        <BottomParagraph>
          {t('visitour')}{' '}
          <LinkTitle
            onPress={() =>
              Linking.openURL(getTextInConfigJSON(['urls', 'help'], 'https://help.britbox.com/'))
            }
          >
            {t('helpsupport')}
          </LinkTitle>
        </BottomParagraph>
      )}
    </Container>
  );
};

export default ErrorLanding;
