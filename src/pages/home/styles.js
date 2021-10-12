import styled from 'styled-components/native';

export const Container = styled.SafeAreaView `
flex: 1;
background-color: #141a29;
padding: 4px 0; //4px cima e baixo e 0 nas laterais
`;
export const SearchContainer = styled.View `
flex-direction: row;
width: 100%;
height: 50px;
align-items: center;
padding: 0 14px;
margin-bottom: 14px;
`;


export const Input = styled.TextInput `
background-color: rgba(255,255,255,0.4);
width: 85%;
height: 100%;
border-radius: 50px;
padding: 8px 15px; 
font-size: 18px;
color: #fff;
`;

export const SearchButton = styled.TouchableOpacity `
width: 15%;
height: 100%;
align-items: center;
justify-content: center;

`;


export const Title = styled.Text `
font-weight: bold;
color: #FFF;
padding: 20px 14px 8px ;
font-size: 24px;

`;

export const BannerButton = styled.TouchableOpacity `
font-weight: bold;
color: #FFF;

`;

export const Banner = styled.Image `
height: 150px;
border-radius: 6px;
margin: 0 14px;

`;

export const SliderHorizontal = styled.FlatList `
height: 250px;
padding: 0 14px;

`;