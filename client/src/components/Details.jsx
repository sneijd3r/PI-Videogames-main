import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { getVideogamesById, clearState } from "../actions/actions";
import plataformas from "../png/platformIcons";
import './css/detail.css'

export default function Details(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() =>{
        dispatch(getVideogamesById(id))
        dispatch(clearState())
    },[dispatch])

    function handleClickHome(){
        history.push('/home')
        console.log('hola');
    }   

    const videogameDetails = useSelector((state) => state.details)

    return(
    <div className="contenedor1">
     
        {
        videogameDetails.length > 0 ?
        <div id="contenedorDetail">
            <h1 className="tittle">{videogameDetails[0].name}</h1>
            <img src={videogameDetails[0].image} alt="" width='522px' height='293px' /> <br />
            <div className="plaformsDetail">
            <h5 className="tittle">Platforms:</h5>{videogameDetails[0].platforms.map(platforms => <img class='plataformasImg' src={plataformas[platforms]} width='18' height='18'/>)}
            <h5 className="tittle">Genres:</h5><h5>{!videogameDetails[0].createdAtDb ? videogameDetails[0].genres?.map((genres) => ' ' + genres + ' ') : videogameDetails[0].genres?.map((genres) => genres.name + ' ')}</h5></div> <br />
            {/* <h4>{!videogameDetails[0].createdAtDb ? videogameDetails[0].genres?.map((genres) => genres + ' ') : videogameDetails[0].genres?.map((genres) => genres.name + ' ')}</h4> */}
            <div className="releaseRating">
            <h5 className="tittle">Released:</h5><h5> {videogameDetails[0].released}</h5> <h5 className="tittle">Rating:</h5> <h5>{videogameDetails[0].rating}</h5>
            </div>
            <p className="descriptionGame"><h4 className="tittle">Description:</h4> {videogameDetails[0].description}</p>
            <div className="home">
                <button onClick={handleClickHome} class='button-271'>Home</button>
            </div>
           
        </div> :
        
        <div >
            <img  className="loading" src="https://i.pinimg.com/originals/2e/b8/d0/2eb8d009f410f30866b6a34a374af797.gif" alt="" />
            
        </div>
        }
        
     
    </div>
    )
}