import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Modal = () => {
  const { goBack } = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity style={{ backgroundColor: 'white', padding: 20 }} onPress={() => goBack()}>
        <Text>Modal me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Modal;
