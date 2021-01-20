import React from 'react';

import { Button } from '@components/Button';
import { useTranslation } from 'react-i18next';
import { Headline, Paragraph } from '@components/Typography';
import { getTextInConfigJSON } from '@src/utils/object';
import { isTablet } from '@src/utils/tablet';
import { Container, Opaque, LogoContainer, Logo } from './styles';

type Props = {
  onPress: () => void;
};

const ErrorNotFound = ({ onPress }: Props) => {
  const { t } = useTranslation('layout');
  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Headline fontSize={isTablet() ? 28 : 22} lineHeight={isTablet() ? 40 : 34} center>
        {getTextInConfigJSON(['error-content-not-found', 'message-1'], t('error.subtitle'))}
      </Headline>
      <>
        <Opaque>
          <Paragraph fontSize={isTablet() ? 16 : 12} lineHeight={isTablet() ? 22 : 18}>
            {getTextInConfigJSON(['error-content-not-found', 'message-2'], t('error.description'))}
          </Paragraph>
        </Opaque>
        <Button size="big" stretch fontWeight="medium" onPress={onPress}>
          {getTextInConfigJSON(['error-content-not-found', 'ctas', '0'], t('error.button'))}
        </Button>
      </>
    </Container>
  );
};

export default ErrorNotFound;
