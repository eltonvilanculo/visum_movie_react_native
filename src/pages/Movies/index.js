import * as React from 'react'
import {Alert } from "react-native";
import {Container,ListMovies} from './styles'
import Header from '../../components/Header'
import {getLocalMovies,removeMovie} from '../../services/storage'
import {useNavigation} from '@react-navigation/native'
import FavoriteItem from '../../components/FavoriteItem'



function Movies (){

    const [movies,setMovies] = React.useState([]);

    const navigation = useNavigation();


    function navigatePage(item){
        
        if(item.release_date===''){
            alert('Filme ainda não tem data de lançamento')
        }
         navigation.navigate('Detail',item)
    }

   async function deleteItem(item){
       
    if(await removeMovie("@movies_key",item.id)){
        alert(`${item.title} removido da lista`)
    }else{
        alert(`Falha ao remover`)
    }
    }

    const confirmDialog = (item) =>
    Alert.alert(
      "Remover filme da lista",
      `Pretende remover ${item.title} da lista ?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => deleteItem(item)}
      ],
      { cancelable: false }
    );
    React.useEffect(()=>{


        let isActive = true ;


        async function getMovies(){

            const resultData =  await getLocalMovies("@movies_key");


            if(isActive){
                setMovies(resultData)
               
            }

        }


        if(isActive){

            getMovies() ;
        }


        return () =>{

            isActive = false ;
        }
    },[])

    return (
      <Container>
      <Header  title = "Meus Filmes "/>

      <ListMovies 
      showsVerticalScrollIndicator={false}
      data={movies}
      keyExtractor={(item)=>String(item.id)}
      renderItem={({item})=><FavoriteItem item={item} onPress={()=>navigatePage(item)} onDelete={()=>confirmDialog(item)}/>}
      
      
      
      
      
      />
      </Container>
    )
}

export default Movies ; 