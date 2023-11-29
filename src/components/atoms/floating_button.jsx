import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const FloatingButton = ({onPress, spaceBottom}) => {

  const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#62A856',
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: spaceBottom,
        right: 15
      },
})

  return (
    <View>
      <TouchableOpacity style={styles.fab} onPress={onPress}>
        <Image
          source={require('../../../assets/icons/plus.png')}
          style={{ tintColor: "white", width: 20, height: 20}}
        />
      </TouchableOpacity>
    </View>
  )
}

export default FloatingButton