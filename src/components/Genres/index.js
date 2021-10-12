import * as React from 'react'

import {Container,Name} from './styles';


export default function Genres({item}){



    return(
        <Container>
        
            <Name>{item.name}</Name>
        </Container>
    )

}