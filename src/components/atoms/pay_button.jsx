import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const PayButton = ({onPress}) => {

  return (
    <TouchableOpacity style={styles.button} onPress={(event) => onPress(event)}>
        <Text style={styles.text}>Pagar</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        backgroundColor: '#CE2929',
        width: 74,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'OpenSans Bold',
        alignSelf: 'center',
        alignContent: 'center'
    }
})

export default PayButton