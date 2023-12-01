import { StyleSheet, Text, View, TextInput, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInputMask } from 'react-native-masked-text'
import FormLabelMandatory from '../molecules/form_label_mandatory'

const FormClientData = ({onFormChange, client}) => {
  var isEdit = client != null

    const [cpf, setCpf] = useState(isEdit ? client.cpf : '');
    const [errorCpf, setErrorCpf] = useState('');

    const [birthDate, setBirthDate] = useState(isEdit ? client.birthDate : '');
    const [errorBirthDate, setErrorBirthDate] = useState('');

    const [name, setName] = useState(isEdit ? client.name : '');
    const [email, setEmail] = useState(isEdit ? client.email : '');


    const handleFormChange = () => {
        // Enviar os dados do formulário para a tela principal
        onFormChange({
              cpf: cpf,
              birthDate: birthDate,
              name: name,
              email: email
        });
      };

      useEffect(() => {
        handleFormChange()
      }, [name, email, cpf, birthDate])

  return (
    <View>
      <View>
      <FormLabelMandatory text='Nome'/>
        <TextInput
            value={name}
            style={styles.input}
            onChangeText={(value) => {
                setName(value)
            }
            }
        />
      </View>

      <View style={styles.rowForm}>
        <View>
        <FormLabelMandatory text='CPF'/>
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
        <FormLabelMandatory text='Nascimento'/>
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
      <FormLabelMandatory text='E-mail'/>
        <TextInput
            value={email}
            style={styles.input}
            keyboardType='email-address'
            onChangeText={value => {
                setEmail(value)
              }}
        />
      </View>
    </View>
  )
}

export default FormClientData

const styles = StyleSheet.create({
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
      input:{
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cecece',
        borderRadius: 8,
        marginTop: 2,
        marginBottom: 10,
        padding: 5,
      },
      rowForm: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      label: {
        fontSize: 14,
        color: '#62A856',
        fontFamily: "OpenSans SemiBold"
      },
})