import React from "react";
import './css/paginado.css'

 export default function Paginado({ allVideogames, cardsPerPage, paginate}) {
    const pageNumbers = []
     for (let i = 1; i <= Math.ceil(allVideogames / cardsPerPage); i++) {  //tomo el num redondo de todos los videogames dividido por los games que quiero por pagina
        pageNumbers.push(i)
    }
    return (
        
        <div className="paginado">
            
            
                {pageNumbers.map(number => (
                    
                        <button class="button-31P" onClick={() => paginate(number)} href="#">{number}</button>
                        
                ))}          
        </div>
        

    )
}
