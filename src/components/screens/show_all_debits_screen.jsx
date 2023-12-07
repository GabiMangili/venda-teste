import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'

import DebitItem from '../organisms/debit_item'

const ShowAllDebitsScreen = ({route}) => {

    var debits = route.params.debits
    console.log('debits')
    console.log(debits)

    const renderItem = ({ item, index }) => (
      <View>
        <View style={{height: index == 0 ? 30 : 0}}/>
          <DebitItem item={item}/>
        <View style={{height: index == debits.length - 1 ? 20 : 0}}/>
      </View>
    );

  return (
    <View style={styles.screen}>
        <FlatList
          data={debits}
          renderItem={renderItem}
        />
    </View>
  )
}

export default ShowAllDebitsScreen

const styles = StyleSheet.create({
    screen: {
        height: Dimensions.get('screen').height,
        flex: 1
      },
})