import { StyleSheet, Text, View, FlatList, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import ClientCardItem from '../organisms/client_card_item';
import FloatingButton from '../atoms/floating_button';

const clients = [ 
  {
    id: '1',
    name: 'Maria Helena de Rodrigues',
    cpf: '56640484846',
    email:'maria.helena@gmail.com',
    totalDebit: '10.000',
    birthDate: '22-10-2002'
  },
  {
    id: '2',
    name: 'Silvânia Valladares Heizelman',
    cpf: '86673339136',
    email:'silvania@gmail.com',
    totalDebit: '100',
    birthDate: '22-10-2002'
  },
  {
    id: '3',
    name: 'George Darmont Pires',
    cpf: '313.414.462-04',
    email:'marco.pires@outlook.com.br',
    totalDebit: '80.000',
    birthDate: '22-10-2002'
  },
  {
    id: '4',
    name: 'Marco Pires Silvino',
    cpf: '313.414.462-04',
    email:'marco.pires@outlook.com.br',
    totalDebit: '80.000',
    birthDate: '22-10-2002'
  },
];


  const ClientsScreen = () => {

  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <View>
      <View style={{height: index == 0 ? 5 : 0}}/>
      <ClientCardItem item={item}/>
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
        data={clients}
        renderItem={renderItem}
      />
      <FloatingButton spaceBottom={100} onPress={() => navigation.navigate("RegisterClient")}/>

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