import * as React from 'react'
import { Container ,Header,HeaderButton,Banner,ButtonLink,ButtonShare,Title,ContentArea,Rate,ListGenres,DescriptionContainer,Description} from './styles'
import {Feather,Ionicons} from '@expo/vector-icons';
import {api,key} from '../../services/api'
import Stars from 'react-native-stars'
import {useNavigation} from '@react-navigation/native'
import Genres from '../../components/Genres';
import { Modal,Share,ActivityIndicator,SafeAreaView } from 'react-native';
import ModalItem from '../../components/ModalItem';

import {saveMovie,getLocalMovies,filterMovie,removeMovie} from '../../services/storage'


export default function Detail ({route}){

    const [movie,setMovie] = React.useState({});
    const [loading,isLoading] = React.useState(true);
    const [modalVisible,setModalVisible] = React.useState(false);
    const [favMovie,setFavMovie] = React.useState();
    const [disableShare,setDisableShare]=React.useState(true);

    const navigation = useNavigation();

React.useEffect(()=>{

    let isActive = true ; 
    const abortController = new AbortController();

    
    async function getMovie(){

        const response = await api.get(`/movie/${route.params?.id}`,{
            params:{
                api_key:key,
                language:"pt-BR",
           
               
            }
        }).catch(error=>console.log(error))

        setMovie(response.data);
        isLoading(false); 
        const isFavorite= await filterMovie("@movies_key",response.data);

        setFavMovie(isFavorite)

        

    }



    

    if(isActive){
    getMovie()
    
    }

   
   
    
   return ()=>{

    isActive = false ;
    abortController.abort();

   }
},[])

function openModal(){
    setModalVisible(true)

}

async function handleShare(){

    
    try{
    const result =  await Share.share({
        message:`Venho da VISUM movie com ${movie.title}`
    });
    if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
          alert('Filme partilhado')
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    
    setDisableShare(true)
    }catch(error){
        alert(error.message)
    }
    
}

async function handleBookMark(){

    const result = await saveMovie("@movies_key",movie)

   if(result){
       alert('Filme adicionado à lista !') 
   }else{
    if(favMovie){
        await removeMovie("@movies_key",movie.id)
        setFavMovie(false)
        alert(`${movie.title} removido da sua lista !`)
    }
   }

   
}
if(loading){
    return(
        


            <Container>
            
                <Header>
                
                    <HeaderButton  onPress={() => navigation.goBack()}>
                    
                    <Feather name="arrow-left" color="#fff" size={28} />
    
                    
                    </HeaderButton>


                    </Header>

                    <SafeAreaView>
                    
                    <ActivityIndicator size="large" color="#fff" />
                    </SafeAreaView>

                  
                    </Container>
    
    
    )
}


    return(


        <Container>
        
            <Header>
            
                <HeaderButton  onPress={() => navigation.goBack()}>
                
                <Feather name="arrow-left" color="#fff" size={28} />

                
                </HeaderButton>


                <HeaderButton onPress={handleBookMark}>
                
                {favMovie?(<Ionicons name="bookmark" color="#fff" size={28} />):(<Ionicons name="bookmark-outline" color="#fff" size={28} />)}

                
                </HeaderButton>
            

               
            </Header>
            <Banner 
            resizeMethod="resize"
              source={{uri:`https://image.tmdb.org/t/p/original${movie.poster_path}`}}
              
              />

              {disableShare?(
                   <>
              
            
              </>):(<ButtonShare onPress={handleShare} disabled={disableShare}>
              
              <Feather name="share" color="#fff" size={24} />
              </ButtonShare>)}
           

              <ButtonLink onPress={()=>openModal()} onLongPress={()=>setDisableShare(false)}>
              
              <Feather name="link" color="#fff" size={24} />
              </ButtonLink>

              <Title numberOfLines={2}>{movie.title}</Title>

              <ContentArea>
              
                <Stars 
                default={movie.vote_average}
                count={10}
                half={true}
                starSize={20}
                fullStar={<Ionicons name="md-star" color="#E7A74e"  size={24} />}
                emptyStar={<Ionicons name="md-star-outline" color="#E7A74e"  size={24} />}
                halfStar={<Ionicons name="md-star-half" color="#E7A74e"  size={24} />}
                disabled={true}
                
                
                />

                <Rate>{movie.vote_average}/10</Rate>

              
              
              </ContentArea>

              <ListGenres data={movie?.genres}  
                horizontal={true}
              renderItem={({item})=><Genres  item={item}/>}
              keyExtractor={(item)=>String(item.id)}
              
              />

              <DescriptionContainer showVerticalScrollIndicator={false}>             
               <Title>
              
                    Descrição
              
              </Title>
             

              <Description>{movie.overview}</Description>
             
              </DescriptionContainer>

              <Modal    
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              >
              
              <ModalItem  link={movie?.homepage} title={movie?.title}  closeModal={()=>setModalVisible(false)}/>
              
              </Modal>
        </Container>
    )
}