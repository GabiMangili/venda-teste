import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const SureModal = ({ text, onClose, onSure }) => {
  const [isModalVisible, setModalVisible] = useState(true);

  useEffect(() => {

  }, []);

  return (
    <Modal
      animationType="slide"
      isVisible={isModalVisible}
      overlayStyle={styles.overlay}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.row}>
            <TouchableOpacity><Text style={styles.noButtonText} onPress={() => onClose(true)}>NÃO</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.yesButtonText} onPress={() => onSure()}>SIM</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
    alignItems: 'center',
  },
  yesButtonText: {
    textAlign: 'center',
    fontFamily: 'OpenSans',
    fontSize: 14,
    marginLeft: 40,
    color: '#62A856'
  },
  noButtonText: {
    textAlign: 'center',
    color: '#404040',
    fontFamily: 'OpenSans',
    fontSize: 14,
    marginRight: 40,
    color: '#CE2929'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    color: '#404040',
    fontFamily: 'OpenSans',
    fontSize: 16,
    marginBottom: 10,
  },
  circleIcon: {
    backgroundColor: '#62A856',
    borderRadius: 50,
    padding: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SureModal;
