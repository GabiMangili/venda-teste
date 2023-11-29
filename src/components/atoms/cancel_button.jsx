import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CancelButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Cancelar</Text>
    </TouchableOpacity>
  )
}

export default CancelButton

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 8,
        borderColor: '#62A856',
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: '#62A856',
        fontFamily: 'OpenSans Bold'
    }
})