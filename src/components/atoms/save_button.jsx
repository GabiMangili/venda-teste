import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SaveButton = ({onPress}, isAble) => {

    const styles = StyleSheet.create({
        button: {
            padding: 10,
            margin: 8,
            backgroundColor: isAble ? '#62A856' : 'gray',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: 16,
            color: '#fff',
            fontFamily: 'OpenSans Bold'
        }
    })

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Salvar</Text>
    </TouchableOpacity>
  )
}

export default SaveButton