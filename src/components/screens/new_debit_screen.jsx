import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity    } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Appbar } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import CancelButton from '../atoms/cancel_button'
import SaveConfirmButton from '../atoms/save_confirm_button'
import FormLabelMandatory from '../molecules/form_label_mandatory';
import { removeSpaces, transformDataForBR, transformDate, validateInputDate, validateRequired } from '../../utils';

export default function NewDebitScreen ({route}) {
  var debit = route.params.debit

  var isEdit = debit === null ? false : true
  console.log('debito ')
  console.log({debit})

  const navigation = useNavigation();
  const today = new Date()
  
  const createDateToday = dayjs(today).format('DD/MM/YYYY').toString()

  const [debitName, setDebitName] = useState(isEdit ? debit.description : '');
  const [errorDebitName, setErrorDebitName] = useState('');

  const [payedDate, setPayedDate] = useState(isEdit ? debit.paymentDate : '');
  const [errorPayedDate, setErrorPayedDate] = useState('');

  const [creationDate, setCreationDate] = useState(isEdit ? debit.creationDate : createDateToday);
  const [errorCreationDate, setErrorCreationDate] = useState('');

  const [price, setPrice] = useState(isEdit ? debit.price : '');
  const [errorPrice, setErrorPrice] = useState('');

  const [haveEmptyInput, setHaveEmptyInput] = useState(true)

  const [isPayed, setIsPayed] = useState(!payedDate ? false : true)

  useEffect(() => {
    console.log("isPayed------------------------------")
    console.log(isPayed)
    console.log(errorDebitName)
    console.log(errorCreationDate)
    console.log(errorPrice),
    console.log(errorPayedDate)

    setHaveEmptyInput(!removeSpaces(debitName) || !creationDate || !price || (isPayed && !payedDate));
  }, [errorDebitName, errorCreationDate, errorPrice, errorPayedDate, debitName, creationDate, price, payedDate])

  const validateForm = () => {
    setErrorDebitName(validateRequired(removeSpaces(debitName)))
    setErrorCreationDate(validateInputDate(transformDate(creationDate)))
    setErrorPrice(validateRequired(price))
    if(isPayed){
      setErrorPayedDate(validateInputDate(transformDate(payedDate)))
    }
  }

  onPressSaveButton = () => {
      validateForm()
  }
  
  return (
    <View style={styles.screen}>

      <View>
        <FormLabelMandatory text='Nome da dívida'/>
        <TextInput
          style={!errorDebitName ? styles.input : styles.inputError}
          value={debitName}
          onChangeText={value => {
            setDebitName(value)
          }}
        />
      </View>
      <Text style={styles.textError}>{errorDebitName}</Text>

      <View style={styles.rowForm}>
      <View>
          <FormLabelMandatory text='Data de criação'/>
          <TextInputMask
            value={creationDate}
            style={!errorCreationDate ? styles.inputHalfScreen : styles.inputHalfScreenError}
            keyboardType='numeric'
            type={'datetime'}
            options={{format: 'DD/MM/YYYY'}}
            onChangeText={value => {
              setCreationDate(value)
              setErrorCreationDate(null)
            }}
          />
          <Text style={styles.textError}>{errorCreationDate}</Text>
        </View>
        <View>
          <FormLabelMandatory text='Valor'/>
          <TextInputMask
          type={'money'}
            value={price}
            style={!errorPrice ? styles.inputHalfScreen : styles.inputHalfScreenError}
            keyboardType='numeric'
            onChangeText={value => {
              setPrice('')
              setPrice(value)
              setErrorPrice(null)
            }}
          />
          <Text style={styles.textError}>{errorPrice}</Text>
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
              style={!errorPayedDate ? styles.inputHalfScreen : styles.inputHalfScreenError}
              keyboardType='numeric'
              type={'datetime'}
              options={{format: 'DD/MM/YYYY'}}
              onChangeText={value => {
                setPayedDate(value)
              }}
            />
            <Text style={styles.textError}>{errorPayedDate}</Text>
          </View>
        : null
      }

      <View style={styles.debitContainer}>
        <View style={styles.rowButtons}>
          <CancelButton onPress={() => navigation.goBack()}/>
          <SaveConfirmButton onPress={onPressSaveButton} isAble={!haveEmptyInput}/>
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
  row: {
    flexDirection: 'row',
    marginTop: 5,
    paddingBottom: 10
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
  },
  textError:{
    fontSize: 10,
    color: '#CE2929',
    fontFamily: "OpenSans SemiBold",
    marginBottom: 5
  }
})
