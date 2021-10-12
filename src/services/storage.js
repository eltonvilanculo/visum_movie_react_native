import AsyncStorage from '@react-native-async-storage/async-storage';


// Buscar filmes salvos

export async function getLocalMovies(key){


    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch(e) {
        // error reading value
        return e ;
      }



}



// Salvar filmes

export async function saveMovie(key,movie){

    let storedMovie = await getLocalMovies(key) ;
    

    let hasMovie =  storedMovie.some(item=>item.id === movie.id)


    
    if(hasMovie){

        return false ;

       
    }else{


    storedMovie.push(movie)


    try {
        const jsonValue = JSON.stringify(storedMovie)
        await AsyncStorage.setItem(key, jsonValue)
        return true ;
        
      } catch (e) {
        // saving error
        console.log(e)
      }
    }

}


// deletar 

export async function removeMovie(key,id){
    let storedMovie = await getLocalMovies(key) ;


    let filteredMovies = storedMovie.filter(item=>item.id!==id) //retorna todos menos o id


    try {
        const jsonValue = JSON.stringify(filteredMovies)
        await AsyncStorage.setItem(key, jsonValue)
        return true ;
        
      } catch (e) {
        // saving error
        console.log(e)

        return false ;
      }



}



//filtar

export async function filterMovie(key,movie){
    let storedMovie = await getLocalMovies(key) ;


    let hasMovie = storedMovie.find(item=>item.id===movie.id) 


    return hasMovie;


}

