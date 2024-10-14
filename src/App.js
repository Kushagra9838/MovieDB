import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourite from './components/RemoveFavourites';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourite, setFavourite] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(()=>{
		const movieFavourite = JSON.parse(localStorage.getItem('react-movie-app-favourite'));
		setFavourite(movieFavourite);
	},[]);

	function saveToLocalStorage(item){
		localStorage.setItem('react-movie-app-favourite', JSON.stringify(item));
	}

	function addFavouriteMovie(movie) {
		setFavourite([...favourite, movie]);
		saveToLocalStorage([...favourite, movie]);
	}

	function removeFavouriteMovie(movie){
		const newFavouriteList = favourite.filter((favourite)=> favourite.imdbID !== movie.imdbID);

		setFavourite(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	}

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouriteMovie={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourite}
					handleFavouriteMovie={removeFavouriteMovie}
					favouriteComponent={RemoveFavourite}
				/>
			</div>
		</div>
	);
};

export default App;