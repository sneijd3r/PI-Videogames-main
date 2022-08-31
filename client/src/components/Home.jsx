import React from "react";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getVideogames, genreFilter, getGenres, getDbGames, sort, sortRating } from "../actions/actions"
import Paginado from "./Paginado"
import NavBar from "./NavBar";
import './css/home.css'


export default function Home() {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    const allGenres = useSelector((state) => state.genres)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setVideogamesPerPage] = useState(12);
    const indexOfLastCard = currentPage * cardsPerPage;
    // indice del ultimo elemento de cada pagina
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    // indice del primer elemento de cada pagina
    const currentVideogames = allVideogames?.slice(indexOfFirstCard, indexOfLastCard);

    


useEffect (() =>{   
    setLoading(true)
    dispatch(getVideogames())
    dispatch(getGenres())
    setLoading(false)
 
},[])

const paginate = pageNumber => setCurrentPage(pageNumber)

function handleFilterDb(e){
    e.preventDefault()
    dispatch(getDbGames(e.target.value))
    setCurrentPage(1)
}
function handleGenre(e){
    e.preventDefault()
    dispatch(genreFilter(e.target.value))
    setCurrentPage(1)
}

function handleSorts(e){
    e.preventDefault()
    dispatch(sort(e.target.value))
    setCurrentPage(1)
}

function resetGenres(e){
    e.preventDefault()
    dispatch(getVideogames())
    setCurrentPage(1)
}

function handleSortRating(e){
    e.preventDefault()
    dispatch(sortRating(e.target.value))
    setCurrentPage(1)
}

return(
   
     <div className="contenedorHome">



        <h1 className="headerH1">GAMES.DATA</h1>
        <h2 className="subHeader">Powered by rawg.io</h2>

        <div className="sidebar">
            <header>
                <a href="home">HOME</a>
            </header>
            <NavBar />
            {/* FILTRO JUEGOS DATABASE */}
            <h3 className="tittleHome">Database games</h3>
            <div className="createdDB">
                <select className="space" onChange={e => handleFilterDb(e)}>
                    <option value="all">All</option>
                    <option value="db">Created games</option>
                </select>
            </div>

            {/* SORT AZ */}
            <h3 className="tittleHome">Sort</h3>
            <div className="sortAz">
                <select className="space" onChange={e => handleSorts(e)} name="sort" id="">
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>
            </div>

            {/* SORT POR RATING */}
            <h3 className="tittleHome">Rating sort</h3>
            <div className="sortRating">
                <select className="space" onChange={e => handleSortRating(e)} name="sort" id="">
                    <option value="descen">Ascen</option>
                    <option value="ascen">Descen</option>
                </select>
            </div>

            {/* FILTROS POR GENERO DE JUEGOS */}

            <h3 className="tittleHome">Genres</h3>
            <div className="genresFilter">
                <button class="button-31" onClick={(e) => resetGenres(e)} value='all'>Clear</button>

                {allGenres.length > 0 ? allGenres?.map((genre) => {
                    return (

                        <ul>
                            <li>
                                <button class="button-31" onClick={(e) => handleGenre(e)} key={genre.id} value={genre.name}>{genre.name}</button>
                            </li>
                        </ul>

                    );
                }) : false}
            </div>

            <Link to='/creategame'>
                <button class="button-31C">Create game</button>
            </Link>

        </div>
        { /* MUESTRO LAS CARTAS EN EL HOME */ }
        {currentVideogames.length > 0 ?
            < div className="contenedorCards">
            
        {currentVideogames && currentVideogames.map(games => <Link to={'/details/' + games.id}>
            <div className="card">
                <Card  name={games.name} image={games.image} platforms={games.platforms.map(plat => plat + ' ')} loading={loading} />
            </div>
        </Link>

        )}</div>

        : 
        <div className="contenedorLoading">
            <img  className="loading" src="https://i.pinimg.com/originals/2e/b8/d0/2eb8d009f410f30866b6a34a374af797.gif" alt="" />
            </div>
         } 

    <Paginado
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            allVideogames={allVideogames.length}
            cardsPerPage={cardsPerPage}
            paginate={paginate} />

               
        
    </div>
                        
)
}