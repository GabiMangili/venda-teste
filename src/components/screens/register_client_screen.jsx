import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity    } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Appbar } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native';

import FloatingButton from '../atoms/floating_button'
import CancelButton from '../atoms/cancel_button'
import SaveButton from '../atoms/save_button'
import FormClientData from '../templates/form_client_data';
import { transformDate, validateCPFNumber, validateEmail, validateInput, validateInputDate, validateRequired } from '../../utils';
import { transform } from 'typescript';

export default function RegisterClientScreen () {
  const navigation = useNavigation();

  const [cpf, setCpf] = useState('');
  const [errorCpf, setErrorCpf] = useState('');

  const [birthDate, setBirthDate] = useState('');
  const [errorBirthDate, setErrorBirthDate] = useState('');

  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const handleFormChange = (formData) => {
    console.log('FormData POST: '); 
    console.log(formData);

    setCpf(formData.cpf)
    setBirthDate(formData.birthDate)
    setName(formData.name)
    setEmail(formData.email)
  };

  useEffect(() => {
    console.log("useEffect")
    console.log(errorName)
    console.log(errorEmail)
    console.log(errorCpf),
    console.log(errorBirthDate)
  }, [errorName, errorEmail, errorCpf, errorBirthDate])

  const validateForm = () => {
    setErrorName(validateRequired(name))
    setErrorEmail(validateEmail(email))
    setErrorCpf(validateCPFNumber(cpf))
    setErrorBirthDate(validateInputDate(transformDate(birthDate)))
  }

  
  return (
    <View style={styles.screen}>

      <FormClientData onFormChange={handleFormChange}/>

      <View style={styles.debitContainer}>
        <Text style={styles.title}>Dívidas</Text>
        <View style={styles.debits}>
          <Text style={styles.noDebitsText}>Cliente não possui dívidas.</Text>
        </View>
        <View style={styles.rowButtons}>
          <CancelButton onPress={() => console.warn('cancelado')}/>
          <SaveButton onPress={() => validateForm()}/>
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
  rowButtons: {
    flexDirection: 'row',
    alignSelf: 'center'
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