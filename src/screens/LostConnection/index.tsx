import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/Button';
import CodePush from 'react-native-code-push';
import { Container, SafeArea, Title, Paragraph } from './styles';
import { Logo, LostConnectionImage } from '../../../assets/icons';

const LostConnection = () => {
  const { t } = useTranslation('layout');
  return (
    <SafeArea>
      <Logo width={130} />
      <Container>
        <LostConnectionImage width={290} height={250} />
        <Title>{t('offline.title')}</Title>
        <Paragraph>{t('offline.message')}</Paragraph>
        <Button onPress={() => CodePush.restartApp()} size="big" fontWeight="medium" stretch>
          {t('offline.button')}
        </Button>
      </Container>
    </SafeArea>
  );
};

export default LostConnection;
