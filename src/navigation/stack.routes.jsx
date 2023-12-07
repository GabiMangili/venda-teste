import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabRoutes from './tab_routes'
import HomeScreen from '../components/screens/home_screen';
import ClientsScreen from '../components/screens/clients_screen';
import RegisterClientScreen from '../components/screens/register_client_screen';
import NewDebitScreen from '../components/screens/new_debit_screen';
import PaymentScreen from '../components/screens/payment_screen';
import EditClientScreen from '../components/screens/edit_clients_screen';
import ShowAllDebitsScreen from '../components/screens/show_all_debits_screen';
//import SureModal from '../components/organisms/modals/sure_modal';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {


  return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={TabRoutes} options={{headerShown: false}}/>
        
        <Stack.Screen 
          name='RegisterClient' 
          component={RegisterClientScreen} 
          options={({ navigation }) => ({
            ...customHeaderStyles(navigation),
            headerTitle: 'Clientes',
          })}
        />

        <Stack.Screen 
          name='NewDebitScreen' 
          component={NewDebitScreen} 
          options={({ navigation }) => ({
            ...customHeaderStyles(navigation),
            headerTitle: 'Nova Dívida',
          })}
        />

        <Stack.Screen 
          name='PaymentScreen' 
          component={PaymentScreen} 
          options={({ navigation }) => ({
            ...customHeaderStyles(navigation),
            headerTitle: 'Clientes',
          })}
        />

        <Stack.Screen 
          name='EditClientScreen' 
          component={EditClientScreen} 
          options={({ navigation }) => ({
            ...customHeaderStyles(navigation),
            headerTitle: 'Editar cliente',
          })}
        />

        <Stack.Screen 
          name='ShowAllDebitsScreen' 
          component={ShowAllDebitsScreen} 
          options={({ navigation }) => ({
            ...customHeaderStyles(navigation),
            headerTitle: 'Dívidas',
          })}
        />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 18,
        color: '#62A856',
        fontFamily: 'OpenSans Bold',
    },
    headerLeft: ( {navigation} )=>(
      <TouchableOpacity onPress={navigation.goBack()}>
        <Image
        source={require('../../assets/icons/back.png')}
        style={{ width: 20, height: 20, justifyContent: 'center', alignItems:'center' }}
      />
      </TouchableOpacity>
      
    )
  },
})

const customHeaderStyles = (navigation) => {
  return {
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 18,
      color: '#62A856',
      fontFamily: 'OpenSans Bold',
    },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/icons/back.png')}
          style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}
        />
      </TouchableOpacity>
    ),
  };
};
