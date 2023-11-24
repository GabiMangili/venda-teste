import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DebtItem = ({item}) => {

  return (
    <View style={[styles.container, styles.shadow]}>
        <Text style={styles.title}>{item.title}</Text>  
        <View style={styles.row}>
            <Text style={styles.subtitleBold}>Quantidade:</Text>
            <Text style={styles.subtitle}>R$ {item.amount}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.subtitleBold}>Valor total:</Text>
            <Text style={styles.subtitle}>R$ {item.totalValue}</Text>
        </View>
    </View>
  )
}

export default DebtItem

const styles = StyleSheet.create({
    container: {
        height: 130,
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
        justifyContent:'space-between'
    },
    title: {
        color: "#AFDA51",
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "OpenSans Bold"
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "OpenSans"
    },
    subtitleBold: {
        fontSize: 14,
        fontFamily: "OpenSans Bold"
    }
})