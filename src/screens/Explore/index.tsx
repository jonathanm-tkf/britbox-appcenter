import React from 'react';
import ExploreMenu from '@components/ExploreMenu';
import { SafeAreaView, Linking, Alert } from 'react-native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { Header } from '@store/modules/core/types';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';

const Explore = () => {
  const menu = useSelector((state: AppState) => state.core.menu);
  const { t } = useTranslation('layout');

  const openURLButton = async (link: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile

      Alert.alert(
        t('openinbrowser'),
        '',
        [
          { text: t('cancel'), onPress: () => {}, style: 'cancel' },
          { text: t('open'), onPress: () => Linking.openURL(link.trim()) },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(`Don't know how to open this URL: ${link}`);
    }
  };

  const goToScreen = (item: Header) => {
    if (item.label === 'Help') {
      return openURLButton(item?.path || '');
    }

    const type = 'link';

    const newItem = { type, ...item };
    return navigateByPath(newItem);
  };

  return (
    <SafeAreaView>
      <Container>
        <ExploreMenu data={menu?.navigation.header || []} onPress={(item) => goToScreen(item)} />
      </Container>
    </SafeAreaView>
  );
};

export default Explore;
