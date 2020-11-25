import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';

class ModalPicker extends Component<
  {
    ref: any;
    data: any[];
    label: string;
    value: string;
    onValueChange: (value: string) => void;
  },
  {
    dataSource: any[];
    modalVisible: boolean;
  }
> {
  constructor(
    props: Readonly<{
      ref: any;
      data: any[];
      label: string;
      value: string;
      onValueChange: (value: string) => void;
    }>
  ) {
    super(props);
    const { data } = this.props;
    this.state = {
      dataSource: data,
      modalVisible: false,
    };
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  togglePicker() {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
  }

  render() {
    const { modalVisible, dataSource } = this.state;
    const { label, value, onValueChange } = this.props;
    return (
      <View style={styles.wrapper}>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.container}>
            <FlatList
              data={dataSource}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.setModalVisible(false);
                      onValueChange(item[value]);
                    }}
                  >
                    <Text style={styles.itemText}>{item[label]}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(_, index) => `${index}`}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    flex: 1,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
  },
  itemText: {
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 16,
    color: '#222',
  },
});

export default React.memo(ModalPicker);
