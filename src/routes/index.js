import * as React from 'react' ;
import {createDrawerNavigator} from '@react-navigation/drawer';


import stackRoutes from './stackRoutes' ;
import Movies from '../pages/Movies';

import {MaterialCommunityIcons} from '@expo/vector-icons'
import { color } from 'react-native-reanimated';

const Drawer =  createDrawerNavigator();
export default function Routes(){


    return(

        <Drawer.Navigator
        

        screenOptions={{
            headerShown:false,

            drawerStyle:{
                backgroundColor:'#090A0E',
                paddingTop:20
            },
            drawerActiveBackgroundColor:'#E72F49',
            drawerActiveTintColor:'white',
            drawerInactiveTintColor:'white'

        }}
        >
        
            <Drawer.Screen name="HomeStack" component={stackRoutes}
            
            options={{


                title:"Home",
                drawerIcon:({focused , size ,color})=>(
                   <MaterialCommunityIcons 
                    name={focused?"movie-open":"movie-outline"}
                    color = {color}
                    size = {size}
                    />)

                
            }}
            
            />
            <Drawer.Screen name="Movies" component={Movies} 
            
            options={{
                drawerIcon:({focused , size ,color})=>(
                    <MaterialCommunityIcons 
                     name={focused?"archive":"archive-outline"}
                     color = {color}
                     size = {size}
                     />)
 
            }}
            />
        
        </Drawer.Navigator>

    )
}