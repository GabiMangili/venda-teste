import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image } from 'react-native';
import HomeScreen from "../components/screens/home_screen";
import ClientsScreen from "../components/screens/clients_screen";

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return (<Tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign:'center',
        headerTitleStyle:{
            color:'#62A856',
            fontFamily: 'OpenSans Bold',
            fontSize: 18
        },
        tabBarActiveTintColor: '#62A856',
    }}>
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerTitle: 'Resumo de dívidas',
                tabBarIcon: ({ color, size, focused }) => {
                    return <Image
                        source={require('../../assets/icons/home.png')}
                        style={{ tintColor: color, width: 35, height: 35 }}
                    />
            }
            }}
        />
        <Tab.Screen
            name="Clients"
            component={ClientsScreen}
            options={{
                headerTitle: 'Clientes',
                tabBarIcon: ({ color, size, focused }) => (
                    <Image
                        source={require('../../assets/icons/person.png')}
                        style={{ tintColor: color, width: 35, height: 35 }}
                    />
                )
            }}
        />
    </Tab.Navigator>)
}