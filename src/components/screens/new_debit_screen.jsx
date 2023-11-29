import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity    } from 'react-native'
import React, { useState } from 'react'
import { Appbar } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native';

import FloatingButton from '../atoms/floating_button'
import CancelButton from '../atoms/cancel_button'
import SaveButton from '../atoms/save_button'

export default function NewDebitScreen () {
  const navigation = useNavigation();

  const [cpf, setCpf] = useState(null);
  const [errorCpf, setErrorCpf] = useState(null);

  const [payedDate, setPayedDate] = useState(null);
  const [errorPayedDate, setErrorPayedDate] = useState(null);

  const [creationDate, setCreationDate] = useState(null);
  const [errorCreationDate, setErrorCreationDate] = useState(null);

  const [price, setPrice] = useState(null);
  const [errorPrice, setErrorPrice] = useState(null);
  
  return (
    <View style={styles.screen}>

      <View>
        <Text style={styles.label}>Nome da dívida</Text>
        <TextInput style={styles.input}/>
      </View>

      <View style={styles.rowForm}>
      <View>
          <Text style={styles.label}>Data de criação</Text>
          <TextInputMask
            value={creationDate}
            style={styles.inputHalfScreen}
            keyboardType='numeric'
            type={'datetime'}
            options={{format: 'DD/MM/YYYY'}}
            onChangeText={value => {
              setCreationDate(value)
              setErrorCreationDate(null)
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Valor</Text>
          <TextInputMask
          type={'money'}
            value={price}
            style={styles.inputHalfScreen}
            keyboardType='numeric'
            onChangeText={value => {
              setPrice('')
              setPrice(value)
              setErrorPrice(null)
            }}
          />
        </View>
        
      </View>

      <View>
          <Text style={styles.label}>Data do pagamento</Text>
          <TextInputMask
            value={payedDate}
            style={styles.inputHalfScreen}
            keyboardType='numeric'
            type={'datetime'}
            options={{format: 'DD/MM/YYYY'}}
            onChangeText={value => {
              setPayedDate(value)
              setErrorPayedDate(null)
            }}
          />
        </View>

      <View style={styles.debitContainer}>
        <View style={styles.rowButtons}>
          <CancelButton onPress={() => console.warn('cancelado')}/>
          <SaveButton onPress={() => console.warn('salvo')}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    height: Dimensions.get('screen').height,
    flex: 1
  },
  input:{
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 10,
    padding: 5,
  },
  inputHalfScreen: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 10,
    padding: 5,
    width: ((Dimensions.get('window').width)-80) /2 
  },
  rowForm: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowButtons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    color: '#62A856',
    fontFamily: "OpenSans SemiBold"
  },
  title: {
    fontSize: 16,
    fontFamily: 'OpenSans Bold',
    color: "#62A856",
    marginTop: 20
  },
  debitContainer:{
    flex: 1,
    justifyContent: 'flex-end'
  },
  noDebitsText: {
    fontSize: 16,
    color: '#404040',
    fontFamily: 'OpenSans',
    alignItems: 'center'
  },
  debits:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }

})
