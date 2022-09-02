import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameByName, getGamesByGenre } from "../actions/actions";
import './css/navbar.css'

export default function NavBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    

function handleImputChange(e){
    e.preventDefault()
    setName(e.target.value)
    
}

function handleSumbit(e){
    e.preventDefault()
    if(name){
       dispatch(getGameByName(name))
    }
    setName('')
    
}

return(
    <div className="navbarContainer">
                
    <div className="search">
    <form className="optSearch" onSubmit ={(e) => handleSumbit(e)}>
    <h3 className="tittleHome">Searh game</h3>
    <input 
    className="optSearch"
    type="text"
    
    value={name}
    name="input"
    onChange={(e) => handleImputChange(e)} />
    </form>
    </div>
</div>
    )
}