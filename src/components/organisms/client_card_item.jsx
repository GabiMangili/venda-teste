import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import Divider from '../atoms/divider'

const ClientCardItem = ({item, refreshLists}) => {
    const navigation = useNavigation()
    
    var client = item; 

  return ( 
    <TouchableOpacity onPress={() => navigation.navigate('PaymentScreen', {client: client, refreshLists: refreshLists})} activeOpacity={0.85}>
    <View style={[styles.container]}>

        <Text style={styles.name}>{client.nome}</Text>  
        <View style={styles.row}>
            <Text style={styles.indication}>CPF: </Text>
            <Text style={styles.dataClient}>{client.cpf}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.indication}>E-mail: </Text>
            <Text style={styles.dataClient}>{client.email}</Text>
        </View>
        <Divider/>
        <View style={styles.rowSpaceBetween}>
            <Text style={styles.name}>Valor da dívida: </Text>
            <Text style={styles.totalDebit}>R$ {!(client.debits.valor) ? 0 : client.debits.valor}</Text>
        </View>
    </View>
    </TouchableOpacity>
  )
}

export default ClientCardItem

const styles = StyleSheet.create({
    container: {
        height: 150,
        padding: 15,
        margin: 15,
        backgroundColor: '#fff',
        borderColor: '#000',
        elevation: 10,
        borderRadius: 8,
        justifyContent:'space-between',
        marginTop: 12,
        marginBottom:  12
    },
    shadow: { 
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4}, 
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    row: {
        flexDirection: 'row',
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    name: {
        color: "#AFDA51",
        fontSize: 16,
        fontFamily: "OpenSans Bold"
    },
    dataClient: {
        fontSize: 14,
        fontFamily: "OpenSans"
    },
    indication: {
        fontSize: 14,
        fontFamily: "OpenSans Bold"
    },
    totalDebit: {
        color: "#404040",
        fontSize: 16,
        fontFamily: "OpenSans Bold"
    }
})