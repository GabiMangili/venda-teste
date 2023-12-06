import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity    } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Appbar } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native';

import { removeSpaces, transformDate, validateCPFNumber, validateEmail, validateInputDate, validateRequired } from '../../utils';
import FloatingButton from '../atoms/floating_button'
import CancelButton from '../atoms/cancel_button'
import SaveButton from '../atoms/save_button'
import FormClientData from '../templates/form_client_data';

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

  const [haveEmptyInput, setHaveEmptyInput] = useState(true)
  
  var errorFormMessages = {
    name: errorName,
    cpf: errorCpf,
    birthDate: birthDate,
    email: errorEmail
  }
  
  const [errorFormMessagesData, setErrorFormMessagesData] = useState(errorFormMessages)
  
  const handleFormChange = (formData) => {
    console.log('FormData POST: ');
    console.log(formData);

    setCpf(formData.cpf)
    setBirthDate(formData.birthDate)
    setName(formData.name)
    setEmail(formData.email)
  };

  useEffect(() => {
    console.log("useEffect register");
    console.log(errorName);
    console.log(errorEmail);
    console.log(errorCpf);
    console.log(errorBirthDate);
  
    setHaveEmptyInput(!removeSpaces(name) || !removeSpaces(email) || !cpf || !birthDate);
    
    setErrorFormMessagesData({
      errorName: errorName,
      errorCpf: errorCpf,
      errorBirthDate: errorBirthDate,
      errorEmail: errorEmail,
    });
  
  }, [errorName, errorEmail, errorCpf, errorBirthDate, name, email, cpf, birthDate]);
  

  const validateForm = () => {
    setErrorName(validateRequired(removeSpaces(name)))
    setErrorEmail(validateEmail(removeSpaces(email)))
    setErrorCpf(validateCPFNumber(cpf))
    setErrorBirthDate(validateInputDate(transformDate(birthDate)))
  }

  const onPressSaveButton = () => {
    if(!haveEmptyInput){
      validateForm()
    }
  }
  
  return (
    <View style={styles.screen}>
      <FormClientData onFormChange={handleFormChange} errorFormData={errorFormMessagesData}/>
      <View style={styles.debitContainer}>
        <Text style={styles.title}>Dívidas</Text>
        <View style={styles.debits}>
          <Text style={styles.noDebitsText}>Cliente não possui dívidas.</Text>
        </View>
        <View style={styles.rowButtons}>
          <CancelButton onPress={() => navigation.goBack()}/>
          <SaveButton isAble={!haveEmptyInput} onPress={onPressSaveButton}/>
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
