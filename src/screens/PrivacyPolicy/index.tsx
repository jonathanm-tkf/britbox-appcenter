import React from 'react';
import WebViewComponent from '@components/WebView';
import { getTextInConfigJSON, getSegment } from '@src/utils/object';
import { Container } from './styles';

export default function PrivacyPolicy() {
  const country: string = getSegment();

  return (
    <Container>
      <WebViewComponent
        uri={getTextInConfigJSON(['urls', 'privacy'], `https://www.britbox.com/${country}/privacy`)}
      />
    </Container>
  );
}
