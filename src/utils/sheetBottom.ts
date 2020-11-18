import * as React from 'react';

export const sheetRef: React.RefObject<{
  open: () => void;
  close: () => void;
}> = React.createRef();

export function showSheet() {
  setTimeout(() => {
    sheetRef.current!.open();
  }, 50);
}
export function hideSheet() {
  setTimeout(() => {
    sheetRef.current!.close();
  }, 50);
}
