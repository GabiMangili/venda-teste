import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'


const EditButton = ({onPress}) => {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
        <Image
          source={require('../../../assets/icons/edit.png')}
          style={{ width: 20, height: 20, marginRight: 5, tintColor: '#62A856' }}
        />
        <Text style={styles.text}>Editar</Text>
    </TouchableOpacity>
  )
}

export default EditButton

const styles = StyleSheet.create({
    button: {
        padding: 8,
        //margin: 8,
        borderColor: '#62A856',
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    text: {
        fontSize: 14,
        color: '#62A856',
        fontFamily: "OpenSans SemiBold",
    }
})