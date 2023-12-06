import { StyleSheet, Text, View, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect  } from 'react'
import { useNavigation } from '@react-navigation/native';

import FloatingButton from '../atoms/floating_button'
import DebitItem from '../organisms/debits_item'
import EditButton from '../atoms/edit_button'
import DeleteModal from '../organisms/modals/deleted_modal';
import SuccessModal from '../organisms/modals/success_modal';
import SureModal from '../organisms/modals/sure_modal';

const PaymentScreen = ({route}) => {
  const navigation = useNavigation()
  const { client } = route.params

  console.log('client:') 
  console.log(client)

  const handleDeleteClient = () => {
    navigation.navigate('StackRoutes', { clientToDelete: client });
  };

  const [isVisibleSureModal, setVisibleSureModal] = useState(false);
  const [isVisibleSuccessModal, setSuccessModalVisible] = useState(false);

  const showSureModal = () => {
    setVisibleSureModal(true);
  };

  const showSuccessModal = () => {
    setSuccessModalVisible(true);
  };

  const closeSureModal = (result) => {
    setVisibleSureModal(false);
  };

  const closeSuccessModal = (result) => {
    setSuccessModalVisible(false);
  };

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


const debits = [
  {
    id: 1,
    description: 'divida 1',
    price: 1200,
    paymentDate: null
  },
  {
    id: 2,
    description: 'divida 2',
    price: '12.000',
    paymentDate: '15-11-2023'
  },
  {
    id: 3,
    description: 'divida 3',
    price: 12.000,
    paymentDate: null
  },
  {
    id: 4,
    description: 'divida 4',
    price: 12.000,
    paymentDate: '20-11-2023'
  },
  {
    id: 5,
    description: 'divida 5',
    price: 12.000,
    paymentDate: null
  },
]

const renderItem = ({ item, index }) => (
  <View>
    <View style={{height: index == 0 ? 0 : 0}}/>
      <DebitItem item={item}/>
    <View style={{height: index == debits.length - 1 ? 20 : 0}}/>
  </View>
);

  return (
    <View style={styles.screen}>
      <View style={styles.dataContainer}>
        
        <View style={styles.singularDataContainer}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.dataText}>{client.name}</Text>
        </View>
        
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>CPF</Text>
            <Text style={styles.dataText}>{formatCPF(client.cpf)}</Text>
          </View>
          <View>
            <Text style={styles.label}>Nascimento</Text>
            <Text style={styles.dataText}>{(client.birthDate).replaceAll("-", "/")}</Text>
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
          <Text style={styles.titleUnderline}>Ver todas</Text>
        </View>
        <FlatList
          data={debits}
          renderItem={renderItem}
        />
      </View>

      <FloatingButton spaceBottom={80} onPress={() => navigation.navigate('NewDebitScreen')}/>

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

      {isVisibleSuccessModal && (
        <SuccessModal
          text="Excluído com sucesso!"
          onClose={() => navigation.goBack()}
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

const styles = StyleSheet.create({
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
  }
})