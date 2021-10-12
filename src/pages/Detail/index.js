import * as React from 'react'
import { Container ,Header,HeaderButton,Banner,ButtonLink,Title,ContentArea,Rate,ListGenres,DescriptionContainer,Description} from './styles'
import {Feather,Ionicons} from '@expo/vector-icons';
import {api,key} from '../../services/api'
import Stars from 'react-native-stars'
import {useNavigation} from '@react-navigation/native'
import Genres from '../../components/Genres';
import { ScrollView } from 'react-native';

export default function Detail ({route}){

    const [movie,setMovie] = React.useState({});
    const [loading,isLoading] = React.useState(true);
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

        

    }



    

    if(isActive){
    getMovie()
    
    }

    if(!loading){
        console.log(movie)
    }
    
   return ()=>{

    isActive = false ;
    abortController.abort();

   }
},[])

    return(


        <Container>
        
            <Header>
            
                <HeaderButton  onPress={() => navigation.goBack()}>
                
                <Feather name="arrow-left" color="#fff" size={28} />

                
                </HeaderButton>


                <HeaderButton>
                
                <Feather name="bookmark" color="#fff" size={28} />

                
                </HeaderButton>
            

               
            </Header>
            <Banner 
            resizeMethod="resize"
              source={{uri:`https://image.tmdb.org/t/p/original${movie.poster_path}`}}
              
              />

              <ButtonLink>
              
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
        </Container>
    )
}