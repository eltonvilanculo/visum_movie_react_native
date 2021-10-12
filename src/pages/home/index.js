import * as React from 'react'
import {  ScrollView ,ActivityIndicator} from 'react-native'
import {Container,SearchContainer,Input,SearchButton,Title,BannerButton,Banner,SliderHorizontal} from './styles'
import Header from '../../components/Header'

import {Feather} from '@expo/vector-icons';
import SliderItem from '../../components/SliderItem';
import {api,key} from '../../services/api'
import {limitMovieList, randomBanner} from '../../controller/MovieController'
import {useNavigation} from '@react-navigation/native';

function Home (){

    const navigation = useNavigation();

    const [nowMovies, setNowMovies] = React.useState([]);
    const [poplularMovies, setPopularMovies] = React.useState([]);
    const [topMovies, setTopMovies] = React.useState([]);
    const [loading, isLoading] = React.useState(true);
    const [banner,setBanner] = React.useState({});

    React.useEffect(()=>{

        let isActive = true ;
        const abortController =  new AbortController();

      async  function getMovies(){

            // const response = await api.get('/movie/now_playing',{
            //     params:{
            //         api_key:key,
            //         language:"pt-BR",
            //         page:"1"
                   
            //     }
            // })

            const [nowData,popularData,topData] = await Promise.all([

                api.get('/movie/now_playing',{
                        params:{
                            api_key:key,
                            language:"pt-BR",
                            page:"1"
                           
                        }
                    }),

                    api.get('/movie/popular',{
                        params:{
                            api_key:key,
                            language:"pt-BR",
                            page:"1"
                           
                        }
                    }),

                    api.get('/movie/top_rated',{
                        params:{
                            api_key:key,
                            language:"pt-BR",
                            page:"1"
                           
                        }
                    })
        
            ])

            if(isActive){
                setNowMovies(limitMovieList(10, nowData.data.results))
                setPopularMovies(limitMovieList(15,popularData.data.results))
                setTopMovies(limitMovieList(8,topData.data.results));

                setBanner(nowData.data.results[randomBanner(nowData.data.results)])

         
            }
      
            console.log(banner)
        isLoading(false);
        }
       
        getMovies();
        

        // Essa funcao ê do useEffect é como se fosse on destroy

        return ()=>{
            console.log('on destroy')
            isActive = false ;
            abortController.abort() ; //para todas as requisicoes assincronas
        }



    },[])


    function navigatePage(item){
        navigation.navigate('Detail',item)
    }
    if(loading){

        return(
            <Container>
            
               
                <Header  title = "Visum Movies"/>
             
                <ActivityIndicator size="large" color="#fff" />
            </Container>
        )
    }
    return (
        <Container>
        <Header  title = "Visum Movies"/>
        <SearchContainer>
        
            <Input placeholder = "Busque Aqui" placeholderTextColor="#ddd"/>
        
            <SearchButton>
            
                <Feather name = "search" size={24} color = "#fff" />
            
            
            </SearchButton>
        
       
        
        </SearchContainer>


        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
            
            <Title>Em Cartaz</Title>
            
            <BannerButton activeOpacity={0.8} onPress={()=>navigatePage(banner)}>
            
            <Banner 
            resizeMethod="resize"
            source={{uri:`https://image.tmdb.org/t/p/original${banner.poster_path}`}}
            />
             
            </BannerButton>

            <SliderHorizontal 
            
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={nowMovies}
            renderItem={({item})=><SliderItem  item={item}   navigateToScreen={()=>navigatePage(item)}/>}
            keyExtractor={item=>String(item.id)}
           
            
            />

            <Title>Populares</Title>


            <SliderHorizontal 
            
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={poplularMovies}
            renderItem={({item})=><SliderItem  item={item}  navigateToScreen={()=>navigatePage(item)}/>}
            keyExtractor={item=>String(item.id)}
            
            />


            <Title>Mais votados</Title>


            <SliderHorizontal 
            
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={topMovies}
            renderItem={({item})=><SliderItem  item={item}  navigateToScreen={()=>navigatePage(item)}/>}
            keyExtractor={item=>String(item.id)}
            
            />

        </ScrollView>
        </Container>
    )
}

export default Home ;