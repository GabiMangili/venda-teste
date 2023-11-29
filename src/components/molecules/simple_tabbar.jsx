import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SimpleTabBar = () => {
  
    const navigation =  useNavigation();
    
    const back = () => {
        navigation.goBack();
    }

  return ( 
    <Appbar.Header centered={true}>
      <Appbar.Action 
        onPress={back}
        style={styles.appbar}
        icon={() => (
            <Image
              source={require('../../../assets/icons/back.png')}
              style={{ width: 20, height: 20, justifyContent: 'center', alignItems:'center' }}
            />
        )}
    />
      <Appbar.Content title="Clientes" titleStyle={styles.title}/>
    </Appbar.Header>
  );
};

export default SimpleTabBar;

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: '#62A856',
        fontFamily: 'OpenSans Bold',
        alignContent: 'center',
    },
    appbar:{
        alignItems: 'center'
    }
})