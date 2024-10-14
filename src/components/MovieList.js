import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieList = (props) => {
    return (
        <>
            {props.movies.map((movie) => {
                return (
                    <div className="image-container d-flex justify-content-start m-3" style={{ width: "10rem", padding: "0"}}>
                        <img src={movie.Poster} className="card-img-top float-start" alt="Poster" />
                        <div onClick={()=>props.handleFavouriteMovie(movie)} className="overlay d-flex align-items-center justify-content-center">
                            <props.favouriteComponent/>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
export default MovieList