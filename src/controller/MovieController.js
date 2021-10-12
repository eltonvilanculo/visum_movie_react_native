export function limitMovieList(size,movies){

    const finalList = [];
    for(let i=0 ; i<=size ;i++){

        finalList.push(movies[i])

    }

    return finalList ;
}


export function randomBanner(movies){

    // return Math.floor(movies.length) ;
    return Math.floor(Math.random()* movies.length) ;
}