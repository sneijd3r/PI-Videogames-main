import React from "react";
import plataformas from "../png/platformIcons";

export default function Card({name, image, platforms}){
   
    return(
        
        <div className="cards">
        <h2 className="name">{name}</h2>
        <img src={image} alt="" width = "150" height="110"/> <br />
        <div className="plaformsDetail">
            {/* <h3>{platforms}</h3> */}
        {platforms?.map(platform => {
            return(                
        <img class='plataformasImg' src={plataformas[platform]} width='18' height='18'/>
            )})}
        </div>
        </div>
    )
}