import React from 'react';
import { Linking } from 'react-native';

import { Button } from '@components/Button';
import { useTranslation } from 'react-i18next';
import { Headline, Paragraph } from '@components/Typography';
import { getTextInConfigJSON, getGlobalTextInConfigJSON } from '@src/utils/object';
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
      <Headline fontSize={28} lineHeight={40} center>
        {!out
          ? t('error.subtitle')
          : getGlobalTextInConfigJSON(['out-of-region', 'message'], t('errorOut.subtitle'))}
      </Headline>
      {!out ? (
        <>
          <Opaque>
            <Paragraph fontSize={16} lineHeight={22}>
              {t('error.description')}
            </Paragraph>
          </Opaque>
          <Button size="big" stretch fontWeight="medium" onPress={onPress}>
            {t('error.button')}
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
