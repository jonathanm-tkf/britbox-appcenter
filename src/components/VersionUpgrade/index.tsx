import React from 'react';
import { Linking, Text, Platform } from 'react-native';

import { useSelector } from 'react-redux';
import { Headline } from '@components/Typography';
import { AppState } from '@store/modules/rootReducer';
import { Container, LinkTitle, LogoContainer, Logo } from './styles';

const VersionUpgrade = () => {
  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment?.toLocaleLowerCase() || 'us';

  const renderLink = (str: string) => {
    const splitStr = str.split('|');

    if (splitStr[0] && splitStr[1]) {
      return (
        <LinkTitle
          onPress={() =>
            Linking.openURL(
              Platform.OS === 'ios'
                ? britboxConfig && britboxConfig[country]['force-upgrade']['apple-link']
                : britboxConfig && britboxConfig[country]['force-upgrade']['android-link']
            )
          }
        >
          {splitStr[0]}
        </LinkTitle>
      );
    }

    return null;
  };

  const upgradeTextArr = (
    (britboxConfig && britboxConfig[country]['force-upgrade']['upgrade message']) ||
    ''
  ).split('[LINK]');

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
