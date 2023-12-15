import { StyleSheet, Text, View, FlatList, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import ClientCardItem from '../organisms/client_card_item';
import FloatingButton from '../atoms/floating_button';
import ClientController from '../../controllers/client_controller';
import DebitController from '../../controllers/debit_controller';

  const ClientsScreen = () => {

    const [clients, setClients] = useState(null);
    const [debitsOpen, setDebitsOpen] = useState(null)
    const [runGets, setRunGets] = useState(true)
    const [clientWithDebits, setClientWithDebits] = useState(null)

    const getClients = async () => {
      try {
        const clientControllerInstance = new ClientController();
        const clienteData = await clientControllerInstance.getAllClients();

        setClients(clienteData);
      } catch (error){
        console.error('Erro ao buscar cliente:', error);
      }
    }

    const getDebitsOpen = async () => {
      try {
        const debitController = new DebitController()
        const debitsOpenData = await debitController.getDebitsOpen()
        setDebitsOpen(debitsOpenData) 
      } catch (error) {
        console.error( 'Erro ao buscar dívidas em aberto') 
      }
    }
    
    useEffect(() => {
      getClients();
      getDebitsOpen();
    }, []); 

    function refreshListClientsAndDebitsOpen(){
      console.log('*refreshing lists*') 
      getClients();
      getDebitsOpen();
    };
  
    useEffect(() => {
      if (clients && debitsOpen) {
        const clientsWithDebitsData = clients.map((clientItem) => {
          const debitForClient = debitsOpen.find(
            (debitItem) => debitItem.cliente.id === clientItem.id
          );
    
          return {
            ...clientItem,
            debits: debitForClient
              ? {
                  id: debitForClient.id,
                  descricao: debitForClient.descricao,
                  valor: debitForClient.valor,
                  dataPagamento: debitForClient.dataPagamento,
                  criadoEm: debitForClient.criadoEm,
                  ultimaAlteracao: debitForClient.ultimaAlteracao,
                }
              : { valor: 0 },
          };
        });
    
        var sortClientByDebit = clientsWithDebitsData.sort((a, b) => {
          const valueA = a.debits ? a.debits.valor : 0;
          const valueB = b.debits ? b.debits.valor : 0;
    
          if (valueB !== valueA) {
            return valueB - valueA;
          }
    
          const nameA = a.nome.toUpperCase();
          const nameB = b.nome.toUpperCase();
          return nameA.localeCompare(nameB);
        });
    
        setClientWithDebits(sortClientByDebit);
      }
    }, [clients, debitsOpen]); 
    
    

    refreshClients = () => getClients()

  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <View>
      <View style={{height: index == 0 ? 5 : 0}}/>
      <ClientCardItem item={item} refreshLists={refreshListClientsAndDebitsOpen}/>
      <View style={{height: index == clients.length - 1 ? 60 : 0}}/>
    </View>
    
  );

  return (
    
    <View style={styles.screen}>

      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.textInput}
          placeholder='Digite o nome do cliente'
      />
      <Image
        source={require('../../../assets/icons/search.png')}
        style={{ tintColor: "gray", width: 20, height: 20, marginRight: 10 }}
      />
      </View>
      
      <FlatList 
        data={clientWithDebits}
        renderItem={renderItem}
      />
      <FloatingButton spaceBottom={100} onPress={() => navigation.navigate("RegisterClient", {refreshClientList: refreshListClientsAndDebitsOpen})}/>

    </View>
  )
}

export default ClientsScreen

const styles = StyleSheet.create({
  screen: {
    marginLeft: 15,
    marginRight: 15
  },
  textInput: {
    height: 35,
    padding: 10,
    flex: 1,
    marginRight: 10
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 10
  }
})