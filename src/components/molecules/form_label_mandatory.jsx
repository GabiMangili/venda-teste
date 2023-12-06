import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FormLabelMandatory = ({text}) => {
  return (
    <Text style={styles.container}>
      <Text style={styles.label}>{text}  </Text>
      <Text style={styles.required}>*</Text>
    </Text>
  )
}

export default FormLabelMandatory

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
      },
      label: {
        fontSize: 14,
        color: '#62A856',
        fontFamily: "OpenSans SemiBold"
      },
      required: {
        fontSize: 14,
        color: '#CE2929',
        fontFamily: "OpenSans SemiBold"
      },
})