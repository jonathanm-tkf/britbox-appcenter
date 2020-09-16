/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { CloseIcon } from '@assets/icons';
import { ModalCenterView, ModalView, CloseModalButton, EmptyView } from './styles';

interface Props {
  children?: any;
  isVisible?: boolean;
  onClose?: Function;
}

export default function ModalCustom({
  children = <EmptyView />,
  isVisible = false,
  onClose = () => null,
}: Props) {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <ModalCenterView>
        <ModalView>
          <CloseModalButton onPress={() => onClose()}>
            <CloseIcon width={32} height={32} fill={theme.PRIMARY_TEXT_COLOR} />
          </CloseModalButton>
          <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </ModalView>
      </ModalCenterView>
    </Modal>
  );
}
