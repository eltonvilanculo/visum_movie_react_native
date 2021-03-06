import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/home'
import Detail from '../pages/Detail';
import Search from '../pages/Search';
const Stack =  createNativeStackNavigator();
export default function stackRoutes(){

    return (
        <Stack.Navigator>
        
            <Stack.Screen name="Home" component={Home}  options={{
                headerShown:false
            }}/>
        
            <Stack.Screen name="Detail" component={Detail} options={{
                headerShown:false,
                title:"Detalhes"
                
            }} />



            <Stack.Screen name="Search" component={Search} options={{
               
                title:"Resultado de pesquisa" ,
                headerTintColor:"#fff",
                headerStyle:{
                    backgroundColor:"#141a29"
                }

                
            }} />
        </Stack.Navigator>

    )
}