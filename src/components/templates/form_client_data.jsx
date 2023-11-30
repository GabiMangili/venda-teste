import { StyleSheet, Text, View, TextInput, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInputMask } from 'react-native-masked-text'

const FormClientData = ({onFormChange}) => {
    const [cpf, setCpf] = useState('');
    const [errorCpf, setErrorCpf] = useState('');

    const [birthDate, setBirthDate] = useState('');
    const [errorBirthDate, setErrorBirthDate] = useState('');

    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');


    const handleFormChange = () => {
        // Enviar os dados do formulário para a tela principal
        onFormChange({
              cpf: cpf,
              birthDate: birthDate,
              clientName: clientName,
              clientEmail: clientEmail
        });
      };

      useEffect(() => {
        handleFormChange()
      }, [clientName, clientEmail, cpf, birthDate])

  return (
    <View>
      <View>
        <Text style={styles.label}>Nome</Text>
        <TextInput
            value={clientName}
            style={styles.input}
            onChangeText={(value) => {
                setClientName(value)
            }
            }
        />
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
        <TextInput
            value={clientEmail}
            style={styles.input}
            keyboardType='email-address'
            onChangeText={value => {
                setClientEmail(value)
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