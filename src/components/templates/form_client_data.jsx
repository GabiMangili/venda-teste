import { StyleSheet, Text, View, TextInput, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInputMask } from 'react-native-masked-text'
import FormLabelMandatory from '../molecules/form_label_mandatory'

const FormClientData = ({onFormChange, client, errorFormData}) => {
  var isEdit = client != null

  const [cpf, setCpf] = useState(isEdit ? client.cpf : '');
  const [errorCpf, setErrorCpf] = useState('');

  const [birthDate, setBirthDate] = useState(isEdit ? client.birthDate : '');
  const [errorBirthDate, setErrorBirthDate] = useState('');

  const [name, setName] = useState(isEdit ? client.name : '');
  const [errorName, setErrorName] = useState('');

  const [email, setEmail] = useState(isEdit ? client.email : '');
  const [errorEmail, setErrorEmail] = useState('');

  const handleFormChange = () => {
    // Enviar os dados do formulário para a tela principal
    onFormChange({
          cpf: cpf,
          birthDate: birthDate,
          name: name,
          email: email
    });
  };

  const getErrors = () => {
    setErrorName(errorFormData.errorName);
    setErrorCpf(errorFormData.errorCpf);
    setErrorBirthDate(errorFormData.errorBirthDate);
    setErrorEmail(errorFormData.errorEmail);
  }

  useEffect(() => {
    handleFormChange()
  }, [name, email, cpf, birthDate])

  useEffect(() => {
    getErrors()
  }, [errorFormData]);

  console.log("\nerrorformdata ↓↓")
  console.log(errorFormData)

  return (
    <View>
      <View>
      <FormLabelMandatory text='Nome'/>
        <TextInput
            value={name}
            style={!errorName ? styles.input : styles.inputError}
            onChangeText={(value) => {
                setName(value)
            }
            }
        />
        <Text style={styles.textError}>{errorName}</Text>
      </View>

      <View style={styles.rowForm}>
        <View>
        <FormLabelMandatory text='CPF'/>
          <TextInputMask
            value={cpf}
            type={'cpf'}
            style={!errorCpf ? styles.inputHalfScreen : styles.inputHalfScreenError}
            keyboardType='numeric'
            onChangeText={value => {
              setCpf(value)
              setErrorCpf(null)
            }}
          />
          <Text style={styles.textError}>{errorCpf}</Text>
        </View>
        <View>
          <FormLabelMandatory text='Nascimento'/>
          <TextInputMask
            value={birthDate}
            style={!errorBirthDate ? styles.inputHalfScreen : styles.inputHalfScreenError}
            keyboardType='numeric'
            type={'datetime'}
            options={{format: 'DD/MM/YYYY'}}
            onChangeText={value => {
              setBirthDate(value)
              setErrorBirthDate(null)
            }}
          />
          <Text style={styles.textError}>{errorBirthDate}</Text>
        </View>
      </View>

      <View>
      <FormLabelMandatory text='E-mail'/>
        <TextInput
            value={email}
            style={!errorEmail ? styles.input : styles.inputError}
            keyboardType='email-address'
            onChangeText={value => {
                setEmail(value)
              }}
        />
        <Text style={styles.textError}>{errorEmail}</Text>
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
        padding: 5,
        width: ((Dimensions.get('window').width)-80) /2 
      },
      inputHalfScreenError: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CE2929',
        borderRadius: 8,
        marginTop: 2,
        padding: 5,
        width: ((Dimensions.get('window').width)-80) /2 
      },
      input:{
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cecece',
        borderRadius: 8,
        marginTop: 2,
        padding: 5,
      },
      inputError:{
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CE2929',
        borderRadius: 8,
        marginTop: 2,
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
      textError:{
        fontSize: 10,
        color: '#CE2929',
        fontFamily: "OpenSans SemiBold",
        marginBottom: 5
      }
})