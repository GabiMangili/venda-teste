import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity    } from 'react-native'
import React, { useState } from 'react'
import { Appbar } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native';

import FloatingButton from '../atoms/floating_button'
import CancelButton from '../atoms/cancel_button'
import SaveButton from '../atoms/save_button'

export default function RegisterClientScreen () {
  const navigation = useNavigation();

  const [cpf, setCpf] = useState(null);
  const [errorCpf, setErrorCpf] = useState(null);

  const [birthDate, setBirthDate] = useState(null);
  const [errorBirthDate, setErrorBirthDate] = useState(null);

  var clientName;
  var clientEmail;
  
  return (
    <View style={styles.screen}>

      <View>
        <Text style={styles.label}>Nome</Text>
        <TextInput value={clientName} style={styles.input}/>
      </View>

      <View style={styles.rowForm}>
        <View>
          <Text style={styles.label}>CPF</Text>
          <TextInputMask
            value={cpf}
            type={'cpf'}
            style={styles.inputHalfScreen}
            keyboardType='numeric'
            onChangeText={value => {
              setCpf(value)
              setErrorCpf(null)
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Nascimento</Text>
          <TextInputMask
            value={birthDate}
            style={styles.inputHalfScreen}
            keyboardType='numeric'
            type={'datetime'}
            options={{format: 'DD/MM/YYYY'}}
            onChangeText={value => {
              setBirthDate(value)
              setErrorBirthDate(null)
            }}
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>E-mail</Text>
        <TextInput value={clientEmail} style={styles.input} keyboardType='email-address'/>
      </View>

      <View style={styles.debitContainer}>
        <Text style={styles.title}>Dívidas</Text>
        <View style={styles.debits}>
          <Text style={styles.noDebitsText}>Cliente não possui dívidas.</Text>
        </View>
        <View style={styles.rowButtons}>
          <CancelButton onPress={() => console.warn('cancelado')}/>
          <SaveButton onPress={() => console.warn('salvo')}/>
        </View>
      </View>

      <FloatingButton spaceBottom={80} onPress={() => navigation.navigate("NewDebitScreen") }/>
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
    alignSelf: 'center'
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
