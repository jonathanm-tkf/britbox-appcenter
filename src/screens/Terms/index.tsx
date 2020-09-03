import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import WebViewComponent from '@components/WebView';
import { Container } from './styles';

export default function Terms() {
  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment.toLocaleLowerCase() || 'us';

  return (
    <Container>
      <WebViewComponent
        uri={
          (britboxConfig && britboxConfig[country]?.urls?.terms) ||
          `https://www.britbox.com/${country}/terms-and-conditions`
        }
      />
    </Container>
  );
}
