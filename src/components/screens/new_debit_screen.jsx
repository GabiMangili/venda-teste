import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity    } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Appbar } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import CancelButton from '../atoms/cancel_button'
import SaveConfirmButton from '../atoms/save_confirm_button'
import FormLabelMandatory from '../molecules/form_label_mandatory';
import { removeSpaces, transformDateBR, transformDate, validateInputDate, validateRequired } from '../../utils';
import DebitController from '../../controllers/debit_controller';
import InfoModal from '../organisms/modals/info_modal';
import SuccessModal from '../organisms/modals/success_modal';

export default function NewDebitScreen ({route}) {

  var debit = route.params.debit ?? null
  const { client } = route.params || {};
  const { refreshClientDebits } = route.params || {}

  var isEdit = !debit ? false : true
  console.log('debit newDebitScreen: ' + debit)

  const navigation = useNavigation();
  const today = new Date()
  
  const createDateToday = dayjs(today).format('DD/MM/YYYY').toString()

  const [debitName, setDebitName] = useState(isEdit ? debit.descricao : '');
  const [errorDebitName, setErrorDebitName] = useState('');

  const [payedDate, setPayedDate] = useState(isEdit && debit.dataPagamento ? transformDateBR(debit.dataPagamento) : '');
  const [errorPayedDate, setErrorPayedDate] = useState('');

  const [creationDate, setCreationDate] = useState(isEdit ? transformDateBR(debit.criadoEm) : createDateToday);
  const [errorCreationDate, setErrorCreationDate] = useState('');

  const [price, setPrice] = useState(isEdit ? debit.valor : '');
  const [errorPrice, setErrorPrice] = useState('');

  const [haveEmptyInput, setHaveEmptyInput] = useState(true)

  const [saveButtonPressed, setSaveButtonPressed] = useState(false)

  const [isPayed, setIsPayed] = useState(!payedDate ? false : true)

  const [isVisibleErrorDebitModal, setVisibleErrorDebitModal] = useState(false);
  const [isVisibleDebitSuccessModal, setVisibleDebitSuccessModal] = useState(false);

  useEffect(() => {
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
    setSaveButtonPressed(true)
  }

  const payedDateValidation = () => {
    console.log(errorPayedDate)
    if((isPayed && !errorPayedDate) || !isPayed){
      return true
    }
    return false
  }

  useEffect(() => {
    if((!errorDebitName && !errorCreationDate && !errorPrice && payedDateValidation) && !errorPayedDate && saveButtonPressed){
      createDebit()
      setSaveButtonPressed(false)
    }
  }, [errorDebitName, errorCreationDate, errorPrice, errorPayedDate, saveButtonPressed])

  async function createDebit(){
    let formattedPayedDate;

    if(isPayed){
      const dateParts = payedDate.split('/');
      formattedPayedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
    }

    try{
      const debit = {
      "valor": parseFloat(price.replaceAll('R$', '').replaceAll('.', '').replaceAll(',', '.')),
      "dataPagamento": isPayed ? formattedPayedDate.toISOString() : null,
      "descricao": debitName,
      "clienteId": client.id
      }
      const debitController = new DebitController()
      const response = await debitController.createDebit(debit)
      setVisibleDebitSuccessModal(true)
    } catch (error) {
      setVisibleErrorDebitModal(true)
      console.log('Erro ao criar débito -> newDebitScreen')
      console.log(error)
    }
  }

  const hideModalCreateDebitError = () => {
    setVisibleErrorDebitModal(false)
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

        <TouchableOpacity style={styles.row} onPress={()=>{
            if(isPayed){
              setErrorPayedDate('')
            }
            setIsPayed(!isPayed)
            console.log('errorpayedDate: ' + errorPayedDate)
          }}>
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

      {isVisibleErrorDebitModal && (
        <InfoModal text='Algo deu errado ao tentar criar dívida. Tente novamente mais tarde.' onClose={() => {
          navigation.goBack()
        }}/>
      )}

      {isVisibleDebitSuccessModal && (
        <SuccessModal
          text="Dívida criada com sucesso!"
          onClose={() => {
            refreshClientDebits()
            navigation.goBack()
          }}
        />
      )}

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
