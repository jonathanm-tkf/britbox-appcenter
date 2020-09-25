import React from 'react';
import WebViewComponent from '@components/WebView';
import { getTextInConfigJSON, getSegment } from '@src/utils/object';
import { Container } from './styles';

export default function Terms() {
  const country: string = getSegment();

  return (
    <Container>
      <WebViewComponent
        uri={getTextInConfigJSON(
          ['urls', 'terms'],
          `https://www.britbox.com/${country}/terms-and-conditions`
        )}
      />
    </Container>
  );
}
