import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DebtItem from '../organisms/debt_item'

const data = [
  {
    id: '1',
    title: 'Dívidas em aberto',
    amount: '32',
    totalValue: '10.000'
  },
  {
    id: '2',
    title: 'Dívidas pagas',
    amount: '32',
    totalValue: '10.000'
  },
  {
    id: '3',
    title: 'Dívidas cadastradas',
    amount: '32',
    totalValue: '10.000'
  },
];

const renderItem = ({ item, index }) => (
  <View>
    <View style={{height: index == 0 ? 12 : 0}}/>
    <DebtItem item={item} isFirst={index == 0 ? true : false}/>
    <View style={{height: index == data.length - 1 ? 12 : 0}}/>
  </View>
);


const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <FlatList 
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  screen:{
    padding: 15
  }
})