import React from 'react';
import { Linking } from 'react-native';

import { useSelector } from 'react-redux';
import { Button } from '@components/Button';
import { useTranslation } from 'react-i18next';
import { Title, Headline, Paragraph } from '@components/Typography';
import { AppState } from '@store/modules/rootReducer';
import { Container, Opaque, BottomParagraph, LinkTitle, LogoContainer, Logo } from './styles';

type Props = {
  onPress: () => void;
  out?: boolean;
};

const ErrorLanding = ({ onPress, out = false }: Props) => {
  const { t } = useTranslation('layout');

  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Title fontSize={60} lineHeight={80}>
        {!out ? t('error.title') : t('errorOut.title')}
      </Title>
      <Headline fontSize={28} lineHeight={40} center>
        {!out ? t('error.subtitle') : britboxConfig['out-of-region']?.message || ''}
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
          <LinkTitle onPress={() => Linking.openURL('https://help.britbox.com/')}>
            {t('helpsupport')}
          </LinkTitle>
        </BottomParagraph>
      )}
    </Container>
  );
};

export default ErrorLanding;
