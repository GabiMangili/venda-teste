import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';import React from 'react'
import { ReactNativeModal } from 'react-native-modal'
import { useState } from 'react'

const DeleteModal = () => {

  const [isModalVisible, setModalVisible] = useState(true);

    // Se o modal foi aberto, agende o fechamento após 3 segundos
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);

  return (
    <ReactNativeModal
        animationType="slide" visible={isModalVisible}
        backdropColor="black"
        backdropOpacity={0.6}
    >
         <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Deletado com sucesso!</Text>
            <View style={styles.circleIcon}>
                <Image
                  source={require('../../../../assets/icons/delete.png')}
                  style={{ width: 15, height: 15, tintColor: '#CE2929' }}
                />
            </View>
            
          </View>
        </View>
    </ReactNativeModal>
  )
}

export default DeleteModal

const styles = StyleSheet.create({

      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
        marginBottom: 10
      },
      circleIcon: {
        borderWidth: 1,
        borderColor: '#CE2929',
        borderRadius: 30,
        padding: 2.5
      }
})