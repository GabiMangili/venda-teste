
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

import FormClientData from '../templates/form_client_data'
import { removeSpaces, transformDate, validateCPFNumber, validateEmail, validateInputDate, validateRequired } from '../../utils';
import CancelButton from '../atoms/cancel_button';
import SaveConfirmButton from '../atoms/save_confirm_button';

const EditClientScreen = ({route}) => {

    console.log('client ---> ')
    console.log(route.params)
    var client = route.params;

    console.log('client nome: ' + client.nome)
    console.log('client cpf: ' + client.cpf)
    console.log('client email: ' + client.email)
    console.log('client dataNascimento: ' + client.dataNascimento)


    const navigation = useNavigation();

    const [cpf, setCpf] = useState(client.cpf);
    const [errorCpf, setErrorCpf] = useState('');

    const [birthDate, setBirthDate] = useState(transformDate(client.dataNascimento.substring(0, 10)));
    const [errorBirthDate, setErrorBirthDate] = useState('');

    const [name, setName] = useState(client.nome);
    const [errorName, setErrorName] = useState('');

    const [email, setEmail] = useState(client.email);
    const [errorEmail, setErrorEmail] = useState('');

    const [haveEmptyInput, setHaveEmptyInput] = useState(!client)
  
    var errorFormMessages = {
      name: errorName,
      cpf: errorCpf,
      birthDate: errorBirthDate,
      email: errorEmail
    }
    
    const [errorFormMessagesData, setErrorFormMessagesData] = useState(errorFormMessages)

    const handleFormChange = (formData) => {
        console.log('FormData PUT: '); 
        console.log(formData);

        setCpf(formData.cpf)
        setBirthDate(formData.birthDate)
        setName(formData.name)
        setEmail(formData.email)
      };

      useEffect(() => {
        console.log("useEffect edit");
        console.log(errorName);
        console.log(errorEmail);
        console.log(errorCpf);
        console.log(errorBirthDate);

        console.log("nome e birthdate");
        console.log(name)
        console.log(birthDate)
      
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
      <FormClientData onFormChange={handleFormChange} client={client} errorFormData={errorFormMessagesData}/>
      <View style={styles.rowButtons}>
          <CancelButton onPress={() => navigation.goBack()}/>
          <SaveConfirmButton isAble={!haveEmptyInput} onPress={onPressSaveButton}/>
        </View>
    </View>
  )
}

export default EditClientScreen

const styles = StyleSheet.create({
    screen: {
        padding: 30,
        height: Dimensions.get('screen').height,
        flex: 1,
        justifyContent: 'space-between'
    },
    rowButtons: {
      flexDirection: 'row',
      alignSelf: 'center'
    },
})