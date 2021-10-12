import axios from 'axios';

// url=https://api.themoviedb.org/3/movie/now_playing?api_key=ef18bf1ceb82688fcda2391511d90430&language=pt-PT;

export const key ="ef18bf1ceb82688fcda2391511d90430";

export const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
})


