import * as React from 'react';

export const analyticsRef: React.RefObject<{
  onTrackEvent: (data: Record<string, unknown>) => void;
}> = React.createRef();
