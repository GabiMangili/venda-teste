import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = (color, height, marginVertical) => {
    const styles = StyleSheet.create({
        divider: {
          height: 1,
          backgroundColor: '#eee',
        },
      });
    
  return <View style={styles.divider} />;
};


export default Divider;
