
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import FormClientData from '../templates/form_client_data'

const EditClientScreen = ({route}) => {

    console.log('client::: : ')
    console.log(route.params)
    var client = route.params;

    const [cpf, setCpf] = useState(client.cpf);
    const [errorCpf, setErrorCpf] = useState('');

    const [birthDate, setBirthDate] = useState(client.birthDate);
    const [errorBirthDate, setErrorBirthDate] = useState('');

    const [name, setName] = useState(client.name);

    const [email, setEmail] = useState(client.email);

    const handleFormChange = (formData) => {
        console.log('FormData PUT: '); 
        console.log(formData);

        setCpf(formData.cpf)
        setBirthDate(formData.birthDate)
        setName(formData.name)
        setEmail(formData.email)
      };

  return (
    <View style={styles.screen}>
      <FormClientData onFormChange={handleFormChange} client={client}/>
    </View>
  )
}

export default EditClientScreen

const styles = StyleSheet.create({
    screen: {
        padding: 30,
        height: Dimensions.get('screen').height,
        flex: 1
    },
})