import * as React from 'react'
import {Container,BannerItem,Title,RateContainer,Rate} from './styles'
import {Ionicons} from '@expo/vector-icons'



export default function SliderItem ({item,navigateToScreen}){


    return(

        <Container onPress={()=>navigateToScreen(item)}>
        
                <BannerItem source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}} />

                <Title numberOfLines={1}>{item.title}</Title>

                <RateContainer>
                
                    <Ionicons name='star' color='#E7A74e' size={12} />

                    <Rate>
                    
                        {item.vote_average}/10
                    
                    </Rate>

                </RateContainer>


        </Container>
       
    );
} 
