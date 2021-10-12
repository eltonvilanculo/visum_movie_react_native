import * as React from 'react'


import {Container,Title,Banner,RateContainer,Rate} from './styles';
import {Ionicons} from '@expo/vector-icons'


export default function MovieResult({item,onPress}){


    return(
        <Container onPress={onPress}>
        
        {item.poster_path ? (  <Banner 
            resizeMethod="resize"
              source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}}
              
              />
):(  <Banner 
    resizeMethod="resize"
      source={require('../../assets/images.png')}
      
      />
) }
        <Title>{item.title}</Title>


        <RateContainer>
                
        <Ionicons name='star' color='#E7A74e' size={12} />

        <Rate>
        
            {item.vote_average}/10
        
        </Rate>

    </RateContainer>
        </Container>
    )

}