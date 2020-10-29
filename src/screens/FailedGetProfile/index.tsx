import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/Button';
import CodePush from 'react-native-code-push';
import { getTextInConfigJSON } from '@src/utils/object';
import { Container, SafeArea, Title } from './styles';
import { Logo } from '../../../assets/icons';

const FailedGetProfile = () => {
  const { t } = useTranslation('layout');
  return (
    <SafeArea>
      <Logo width={130} />
      <Container>
        <Title>
          {getTextInConfigJSON(['login', 'error-messages', 'error-message'], t('error'))}
        </Title>
        <Button onPress={() => CodePush.restartApp()} size="big" fontWeight="medium" stretch>
          {t('error.button')}
        </Button>
      </Container>
    </SafeArea>
  );
};

export default FailedGetProfile;
