import React from "react";

export default function Card({name, image, platforms, loading}){
    if(loading){
       return( 
       <img  className="loading" src="https://i.pinimg.com/originals/2e/b8/d0/2eb8d009f410f30866b6a34a374af797.gif" alt="" />
       )
    }
    return(
        
        <div className="cards">
        <h2 className="name">{name}</h2>
        <img src={image} alt="" width = "150" height="110"/>
        <h3 className="platformsC">{platforms}</h3>
        </div>
    )
}