import React from 'react';

import { Button } from '@components/Button';
import { useTranslation } from 'react-i18next';
import { Title, Headline, Paragraph } from '@components/Typography';
import { Container, Opaque } from './styles';

type Props = {
  onPress: () => void;
  out?: boolean;
};

const ErrorLanding = ({ onPress, out = false }: Props) => {
  const { t } = useTranslation('layout');
  return (
    <Container>
      <Title fontSize={60} lineHeight={80}>
        {!out ? t('error.title') : t('errorOut.title')}
      </Title>
      <Headline fontSize={28} lineHeight={40} center>
        {!out ? t('error.subtitle') : t('errorOut.subtitle')}
      </Headline>
      {!out && (
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
      )}
    </Container>
  );
};

export default ErrorLanding;
