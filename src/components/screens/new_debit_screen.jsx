import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity    } from 'react-native'
import React, { useState } from 'react'
import { Appbar } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native';

import FloatingButton from '../atoms/floating_button'
import CancelButton from '../atoms/cancel_button'
import SaveButton from '../atoms/save_button'
import FormLabelMandatory from '../molecules/form_label_mandatory';

export default function NewDebitScreen () {
  const navigation = useNavigation();

  const [debitName, setDebitName] = useState('');
  const [errorDebitName, setErrorDebitName] = useState('');

  const [payedDate, setPayedDate] = useState('');
  const [errorPayedDate, setErrorPayedDate] = useState('');

  const [creationDate, setCreationDate] = useState('');
  const [errorCreationDate, setErrorCreationDate] = useState('');

  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState('');

  const [isPayed, setIsPayed] = useState(false)
  
  return (
    <View style={styles.screen}>

      <View>
        <FormLabelMandatory text='Nome da dívida'/>
        <TextInput
          style={styles.input}
          value={debitName}
          onChangeText={value => {
            setDebitName(value)
          }}
        />
      </View>

      <View style={styles.rowForm}>
      <View>
          <FormLabelMandatory text='Data de criação'/>
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
          <FormLabelMandatory text='Valor'/>
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

        <TouchableOpacity style={styles.row} onPress={()=>setIsPayed(!isPayed)}>
        { !isPayed 
          ? <Image
            source={require('../../../assets/icons/box_uncheck.png')}
            style={{ width: 20, height: 20, marginRight: 5, tintColor: '#62A856' }}
          /> 
          : <Image
              source={require('../../../assets/icons/box_check.png')}
              style={{ width: 20, height: 20, marginRight: 5, tintColor: '#62A856' }}
            />}
        <Text style={styles.isPayedText}>Dívida já está paga</Text>
      </TouchableOpacity>

      { isPayed
        ? <View>
            <FormLabelMandatory text='Data do pagamento'/>
            <TextInputMask
              value={payedDate}
              style={styles.inputHalfScreen}
              keyboardType='numeric'
              type={'datetime'}
              options={{format: 'DD/MM/YYYY'}}
              onChangeText={value => {
                setPayedDate(value)
              }}
            />
          </View>
        : null
      }


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
  row: {
    flexDirection: 'row',
    marginTop: 15,
    paddingBottom: 15
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
