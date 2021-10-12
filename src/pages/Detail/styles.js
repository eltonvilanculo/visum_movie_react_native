import styled from 'styled-components/native';

export const Container = styled.View `
flex: 1;
background-color: #141a29;
padding: 4px 0; //4px cima e baixo e 0 nas laterais
`;

export const Header = styled.View `
z-index: 99;
position: absolute;
top: 35px;
display: flex;
width: 100%;
flex-direction: row;
justify-content: space-between;
padding: 14px;

`;


export const HeaderButton = styled.TouchableOpacity `
height: 46px;
height: 46px;
border-radius: 23px;
background-color: rgba(25,26,48,0.7);
justify-content: center;
align-items: center;



`;

export const Banner = styled.Image`
height: 350px;
width: 100%;
border-bottom-left-radius:70px;
border-bottom-right-radius:70px;

`

export const ButtonLink = styled.TouchableOpacity `
z-index: 99;
position: absolute;
top: 310px;
right: 15px;
height: 63px;
width: 63px;

border-radius: 35px;
background-color: #f72f49;
justify-content: center;
align-items: center;



`;

export const Title = styled.Text `

color: #FFF;
font-weight: bold;
padding: 8px 14px;
margin-top: 8px;
font-size: 22px;


`;

export const ContentArea = styled.View `

flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0 14px;

`;


export const Rate = styled.Text `

color: #fff;
font-size: 18px;
font-weight: bold;


`;

export const ListGenres = styled.FlatList `
padding: 8px 14px;
max-height: 44px;
min-height: 44px;



`;




export const DescriptionContainer = styled.ScrollView`

padding: 14px 14px;
width: 100%;


`

export const Description = styled.Text`

color: #fff;
padding: 8px 14px;
line-height: 20px;
text-align: justify;

`

