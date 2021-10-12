import * as React from 'react'

import {Name,CloseButton} from './styles';
import { WebView } from 'react-native-webview';
import {Feather} from '@expo/vector-icons'

export default function ModalItem({link,title,closeModal}){



    return(
        <>
        <CloseButton onPress={closeModal}>
        <Feather name="arrow-left" color="#FFF" size={24} />
        <Name>
            {title}
        </Name>
        
        </CloseButton>
        <WebView source={{ uri: link }}  />

    </>
    )

}