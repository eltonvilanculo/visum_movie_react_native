import * as React from 'react'
import { ActivityIndicator} from 'react-native'
import {Container,ListMovies} from './styles'
import {useRoute, useNavigation} from '@react-navigation/native'
import {api,key} from '../../services/api'
import MovieResult from '../../components/MovieResult'


function Search (){

    const [movies,setMovies] = React.useState({})
    const [loading,isLoading] = React.useState(true)

    const route = useRoute();
    const navigation = useNavigation();



    const abortController = new AbortController();


    function navigatePage(item){
        
        if(item.release_date===''){
            alert('Filme ainda não tem data de lançamento')
        }
         navigation.navigate('Detail',item)
    }
    React.useEffect(()=>{

        let isActive = true ;

        async function getFilteredMovies(){

            const response = await api.get("/search/movie",{
                params:{
                    api_key:key,
                    query:route?.params?.text
                }
            }).catch(error=>console.log(error))

        
            // console.log(response.data.results)
                setMovies(response.data.results)
                isLoading(false)



        }

        if(isActive){
            getFilteredMovies();
            
        }

     

        return ()=>{
            abortController.abort();
            isActive = false ;
        }

    },[])

    if(loading){
        return (
            <Container>
               
            <ActivityIndicator size="large" color="#fff" />
            </Container>
        )
    }else{
        return (
            <Container>
           
                <ListMovies 
                data={movies}
                showVerticalScrollIndicator={false}
                keyExtractor={(item)=>String(item.id)   }
                renderItem={({item})=><MovieResult item={item}  onPress={()=>navigatePage(item)}/>} 
                
                
                
                
                
                />
            </Container>
        )
    }
  
}

export default Search ;