import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';
import { Rings } from 'react-loader-spinner';

const API_URL = 'https://1mdb-data-searching.p.rapidapi.com/om';

const App = () => {

   const [movies, setmovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const searchMovies = async (title) => {
      setIsLoading(true);
      const response = await fetch(`${API_URL}?s=${title}`, {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': '438b93704fmshd4c063b4d614ae8p1a34fajsn5497f1f0421a',
            'X-RapidAPI-Host': '1mdb-data-searching.p.rapidapi.com',
         }
      });

      const data = await response.json();
      console.log(data)
   
      setIsLoading(false);
      setmovies(data.Search);
   }

   useEffect(() => {
      searchMovies('2022');
   }, []);

   return (
      <div className="app">
         <h1>Movie Mania</h1>

         <div className="search">
            <input
               placeholder="Search Movie"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />

            <img
               src={SearchIcon}
               alt="search"
               onClick={() => searchMovies(searchTerm)}
            />
         </div>

         {isLoading == true && (
            <div className="flex justify-center items-center">
               <Rings type="Puff" color="#ffb366" height={550} width={80} weight={500}/>
            </div>
         )}

         {movies?.length > 0
            ? (
               <div className="container">
                  {
                     movies.map((movie) => (
                        < MovieCard movie={movie} />
                     ))
                  }
               </div>
            ) :
            (
               <div className="empty">
                  <h2>No Movies Found</h2>
               </div>
            )
         }
      </div>
   );
}

export default App;