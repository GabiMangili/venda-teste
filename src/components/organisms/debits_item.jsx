import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import SaveButton from '../atoms/save_button'
import PayButton from '../atoms/pay_button'

const DebitItem = (item) => {

  //const item = item.params

  const debit = item.item
  console.log(debit)

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.descText}>{debit.description}</Text>
        {debit.paymentDate == null
        ? <PayButton/> 
        : <Image
            source={require('../../../assets/icons/check.png')}
            style={{ width: 20, height: 20 }}
           />} 
      </View>
      <View style={styles.row}>
      <Text style={styles.priceIndicatorText}>Valor da dívida:</Text>
      <Text style={styles.priceText}>RS {debit.price}</Text>
      </View>
    </View>
  )
}

export default DebitItem

const styles = StyleSheet.create({
  card: {
    height: 85,
        padding: 10,
        margin: 30,
        backgroundColor: '#fff',
        borderColor: '#000',
        elevation: 10,
        borderRadius: 8,
        justifyContent:'space-between',
        marginTop: 12,
        marginBottom:  12
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  descText: {
    color: '#AFDA51',
    fontSize: 16,
    fontFamily: 'OpenSans Bold'
  },
  priceIndicatorText: {
    color: '#404040',
    fontSize: 16,
    fontFamily: 'OpenSans Bold'
  },
  priceText: {
    color: '#707070',
    fontSize: 16,
    fontFamily: 'OpenSans Bold'
  }
})