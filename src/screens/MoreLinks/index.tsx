import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import WebViewComponent from '@components/WebView';
import { Container } from './styles';

type ParamList = {
  MoreLinks: {
    url: string;
  };
};

type MoreLinksScreenRouteProp = RouteProp<ParamList, 'MoreLinks'>;

export default function MoreLinks() {
  const { params } = useRoute<MoreLinksScreenRouteProp>();
  const { url } = params || undefined;

  return (
    <Container>
      <WebViewComponent uri={url} />
    </Container>
  );
}
