import { StyleSheet, Text, View, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect, useRef, useEffect  } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';

import FloatingButton from '../atoms/floating_button'
import DebitItem from '../organisms/debit_item'
import EditButton from '../atoms/edit_button'
import DeleteModal from '../organisms/modals/deleted_modal';
import SuccessModal from '../organisms/modals/success_modal';
import SureModal from '../organisms/modals/sure_modal';
import CancelButton from '../atoms/cancel_button';
import SaveConfirmButton from '../atoms/save_confirm_button';
import InfoModal from '../organisms/modals/info_modal';
import { transformDateBR } from '../../utils';
import dayjs from 'dayjs';
import DebitController from '../../controllers/debit_controller';
import { is } from 'date-fns/locale';

const PaymentScreen = ({route}) => {
  const navigation = useNavigation()
  const { client } = route.params || {};
  const { refreshLists } = route.params

  console.log('client:') 
  console.log(client)

  const handleDeleteClient = () => {
    navigation.navigate('StackRoutes', { clientToDelete: client });
  };

  const [haveDebitOpen, setHaveDebitOpen] = useState(false)

  const [isVisibleSureModal, setVisibleSureModal] = useState(false);
  const [isVisibleDeleteSuccessModal, setDeleteSuccessModalVisible] = useState(false);
  const [isVisiblePaySuccessModal, setPaySuccessModalVisible] = useState(false);
  const [isVisibleDebtLimitModal, setVisibleDebtLimitModal] = useState(false);
  const [isErrorPayModalVisible, setErrorPayModalVisible] = useState(false);

  const [debitOpen, setDebitOpen] = useState(null)
  const [isPayedDebitOpen, setPayedDebitOpen] = useState(false)
  
  const [isButtonPlusClicked, setButtonPlusClicked] = useState(false); 

  const [debits, setListClientDebits] = useState([])

  const showSureModal = () => {
    setVisibleSureModal(true);
  };

  const showSuccessModal = () => {
    setDeleteSuccessModalVisible(true);
  };

  const closeSureModal = (result) => {
    setVisibleSureModal(false);
  };

  const closeSuccessModal = (result) => {
    setDeleteSuccessModalVisible(false);
  };

  const debitController = new DebitController()

  getDebitClients = async () => {
    const debitsClientAllData = await debitController.getDebitsByClientId(client.id)
    const debitsClientOnlyDebit = debitsClientAllData.map((debitWithClient) => {
      return {
        id: debitWithClient.id,
        criadoEm: debitWithClient.criadoEm,
        dataPagamento: debitWithClient.dataPagamento,
        descricao: debitWithClient.descricao,
        ultimaAlteracao: debitWithClient.ultimaAlteracao,
        valor: debitWithClient.valor
      }
    })
    console.log('---------------------------- debits ' + client.nome)

    setListClientDebits(debitsClientOnlyDebit)
    setDebitOpen(debitsClientOnlyDebit.find((debit) => !debit.dataPagamento))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={showSureModal}
        >
          <Image
            source={require('../../../assets/icons/delete.png')}
            style={{ width: 25, height: 25, tintColor: '#CE2929' }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if(isButtonPlusClicked){
      if(!haveDebitOpen){
        navigation.navigate('NewDebitScreen', {})
      } else {
        setVisibleDebtLimitModal(true)
      }
      setButtonPlusClicked(false)
  }
  }, [haveDebitOpen, isButtonPlusClicked])


  useEffect(() => {
    getDebitClients()
  }, [])

  const onPressPlusButton = () => {
    setButtonPlusClicked(true)

    const filteredDebits = debits.filter(debit => debit.dataPagamento == null);
    console.log(filteredDebits.length)

    if(filteredDebits.length > 0){
      setHaveDebitOpen(true);
    } else {
      setHaveDebitOpen(false)
    }

    console.log("haveDebitOpen: " +  haveDebitOpen)
  }

  const hideModalDebitOpen = () => {
    console.log('setando setVisivleDebitLimitmModal -> false')
    setVisibleDebtLimitModal(false)
  }

  const hideModalPayError = () => {
    setErrorPayModalVisible(false)
  }

  const modalizeRef = useRef(null);

  onOpen = (event) => {
    event.persist();
    if (modalizeRef.current) {
      console.log('opened');
      modalizeRef.current.open();
    } else {
      console.error('Modalize is not initialized or mounted.');
    }
  };

  async function payDebit()  {
    try{
      const response = await debitController.payDebit(debitOpen.id)
      console.log(payDebit)
      refreshLists()
      setPaySuccessModalVisible(true)
      setPayedDebitOpen(true)
    } catch (error){
      setErrorPayModalVisible(true)
    }
  }


  const renderItem = ({ item, index }) => (
    <View>
      <View style={{height: index == 0 ? 0 : 0}}/>
        <DebitItem item={item} onClickButton={onOpen} isPayed={isPayedDebitOpen} isDebitOpen={!debitOpen ? false : item.id === debitOpen.id}/>
      <View style={{height: index == debits.length - 1 ? 20 : 0}}/>
    </View>
  );

  const debitsSorted = debits.sort((debitA, debitB) => {
    if (debitA.dataPagamento === null && debitB.dataPagamento !== null) {
      return -1;
    } else if (debitA.dataPagamento !== null && debitB.dataPagamento === null) {
      return 1;
    }
    return 0;
  });


  return (
    <View style={styles.screen}>
      <View style={styles.dataContainer}>
        
        <View style={styles.singularDataContainer}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.dataText}>{client.nome}</Text>
        </View>
        
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>CPF</Text>
            <Text style={styles.dataText}>{formatCPF(client.cpf)}</Text>
          </View>
          <View>
            <Text style={styles.label}>Nascimento</Text>
            <Text style={styles.dataText}>
              {dayjs(client.dataNascimento).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.dataText}>{client.email}</Text>
          </View>
          <EditButton onPress={() => navigation.navigate('EditClientScreen', client)}/>
        </View>
        
      </View>
      
      <View style={styles.debitContainer}>
        <View style={styles.rowTitle}>
          <Text style={styles.title}>Dívidas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ShowAllDebitsScreen', {debits})}>
            <Text style={styles.titleUnderline}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={debits}
          renderItem={renderItem}
        />
      </View>

      <FloatingButton spaceBottom={80} onPress={onPressPlusButton}/>

      <Modalize
        ref={modalizeRef}
        snapPoint={200}
        panGestureEnabled={false}
        onContentSizeChange={(width, height) => {
          console.log('Layout do Modalize:', { width, height });
        }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Ao confirmar, essa dívida será quitada. Deseja realmente confirmar?</Text>
          <View style={styles.rowButtons}>
            <CancelButton onPress={() => modalizeRef.current.close()}/>
            <SaveConfirmButton isAble={true} onPress={() => {
                setPaySuccessModalVisible(true)
                modalizeRef.current.close()
                payDebit()
              }} text='Confirmar'/>
          </View>
        </View>
      </Modalize>

      {isVisibleSureModal && (
        <SureModal
          text="Tem certeza que deseja excluir esse registo de cliente?"
          onClose={closeSureModal}
          onSure={() => {
            console.log("cliente excluído: " + client.name)
            closeSureModal()
            showSuccessModal()
          }}
        />
      )}

      {isVisibleDeleteSuccessModal && (
        <SuccessModal
          text="Excluído com sucesso!"
          onClose={() => navigation.goBack()}
        />
      )}

      {isVisibleDeleteSuccessModal && (
        <SuccessModal
          text="Excluído com sucesso!"
          onClose={() => navigation.goBack()}
        />
      )}

      {isVisibleDebtLimitModal && (
        <InfoModal text='Um cliente não pode ter mais de uma dívida em aberto' onClose={hideModalDebitOpen}/>
      )}

      {isErrorPayModalVisible && (
        <InfoModal text='Ococrreu um erro ao entar pagar. Tente novamente mais tarde' onClose={hideModalPayError}/>
      )}

      {isVisiblePaySuccessModal && (
        <SuccessModal
          text="Dívida paga com sucesso!"
          onClose={() => {
            setPaySuccessModalVisible(false)
          }}
        />
      )}  
      
    </View>
  )
}

const formatCPF = (cpf) => {
  const formattedCPF = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  return formattedCPF;
};

export default PaymentScreen

//() => navigation.navigate('ShowAllDebitsScreen', {debits})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    height: 200,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "OpenSans SemiBold",
    marginBottom: 20
  },
  screen: {
    height: Dimensions.get('screen').height,
    flex: 1
  },
  dataContainer: {
    padding: 30,
  },
  inputHalfScreen: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 10,
    width: ((Dimensions.get('window').width)-80) /2 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center'
  },
  rowEdit: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  label: {
    fontSize: 14,
    color: '#62A856',
    fontFamily: "OpenSans SemiBold",
  },
  dataText: {
    fontSize: 14,
    color: '#404040',
    fontFamily: "OpenSans",
  },
  title: {
    fontSize: 16,
    fontFamily: 'OpenSans Bold',
    color: "#62A856",
    marginTop: 20,
  },
  titleUnderline: {
    fontSize: 16,
    fontFamily: 'OpenSans Bold',
    color: "#62A856",
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  debitContainer:{
    flex: 1,
    //backgroundColor: 'gray'
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
  singularDataContainer: {
    marginBottom: 25
  },
  rowButtons: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
})