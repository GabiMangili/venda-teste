import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const InfoModal = ({ text, onClose }) => {
  const [isModalVisible, setModalVisible] = useState(true);

  return (
    <Modal
      animationType="slide"
      isVisible={true}
      overlayStyle={styles.overlay}
    >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
            <TouchableOpacity onPress={() => {
                onClose()
              }}>
                <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButtonText: {
    textAlign: 'center',
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: '#62A856',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
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
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  modalText: {
    textAlign: 'center',
    color: '#404040',
    fontFamily: 'OpenSans',
    fontSize: 16,
    marginBottom: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default InfoModal;
