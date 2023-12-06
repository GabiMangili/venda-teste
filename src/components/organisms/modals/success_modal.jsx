import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

const SuccessModal = ({ text, onClose }) => {
  const [isModalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setModalVisible(false);
      onClose()
    }, 3000);

    // Limpeza do timeout no desmonte do componente
    return () => clearTimeout(timeoutId);
  }, []); // O segundo argumento vazio faz com que o useEffect só seja executado uma vez (equivalente ao componentDidMount)

  return (
    <Modal
      animationType="slide"
      isVisible={isModalVisible}
      overlayStyle={styles.overlay}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <View>
            <Image
              source={require('../../../../assets/icons/check.png')}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </View>
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

export default SuccessModal;
