import React from 'react';
import { Linking, Text, Platform } from 'react-native';

import { Headline } from '@components/Typography';
import { getTextInConfigJSON } from '@src/utils/object';
import { Container, LinkTitle, LogoContainer, Logo } from './styles';

const VersionUpgrade = () => {
  const renderLink = (str: string) => {
    const splitStr = str.split('|');

    if (splitStr[0] && splitStr[1]) {
      return (
        <LinkTitle
          onPress={() =>
            Linking.openURL(
              Platform.OS === 'ios'
                ? getTextInConfigJSON(['force-upgrade', 'apple-link'], '')
                : getTextInConfigJSON(['force-upgrade', 'android-link'], '')
            )
          }
        >
          {splitStr[0]}
        </LinkTitle>
      );
    }

    return null;
  };

  const upgradeTextArr = getTextInConfigJSON(['force-upgrade', 'upgrade message'], '').split(
    '[LINK]'
  );

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Headline fontSize={28} lineHeight={40} center>
        {(upgradeTextArr || []).map((item: string) => {
          return <Text key={item}>{item.includes('|') ? renderLink(item) : item}</Text>;
        })}
      </Headline>
    </Container>
  );
};

export default VersionUpgrade;
