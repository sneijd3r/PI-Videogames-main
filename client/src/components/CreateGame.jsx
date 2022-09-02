import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postGame, getPlatforms } from "../actions/actions";
import { Link } from "react-router-dom"
import "../components/css/createGame.css"


function validate(input){
    let errors= {};
    if (!input.name) errors.name = "Insert a name";
    if(input.name.length > 0) { 
        
        if (!/^[a-zA-Z\s]*$/.test(input.name)) { errors.name = 'Name cannot contain special characters' }
        if (input.name.length > 15 || input.name.length < 2) errors.name = 'Name must be between 2 and 15 characters';
    }
        
        if (input.description.length < 40) errors.description = 'Description should have at least 40 characters'
        if (!input.rating) errors.rating = 'Set a rating';
        if (input.rating > 5) errors.rating = 'Max rating is 5'
        if (!input.released) errors.released = 'Select a date';
        if (input.genres === 0) errors.genres = 'Add at least one genre';
        if (input.platforms === 0) errors.platforms = 'Add at least one platform'
    
return errors
}

export default function CreateGame(){

    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    const dispatch = useDispatch()
    const [changeVideogames, setVideogamesChange] = useState([])
    const [changePlatforms, setPlatformChange] = useState([])
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState ({
        name : '',
        description : '',
        released: '',
        rating: '',
        genres: [],
        platforms: []

    })

    console.log(input);

    useEffect(() =>{
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    function handleInputChange(e){
        if(e.target.name === "rating"){
        setInput({
            ...input,
            [e.target.name]: Number(e.target.value),
        })
        }else{
            setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        }
        
        ;
        setErrors(validate({ ...input, [e.target.value]: e.target.value }));
    };

    function handleGenreChange(e){
        console.log('cambio genre');
        e.preventDefault()
        if(!input.genres.includes(e.target.value)){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
            
        })
    }
    setErrors(validate({
        ...input,
        genres: [...input.genres, e.target.value],
       
    }))
    if(!changeVideogames.includes(e.target.value)){
        setVideogamesChange([
            ...changeVideogames, e.target.value,
        ])
    }
};
function handlePlatformChange(e){
    console.log('cambio platform');
    e.preventDefault()
    if(!input.platforms.includes(e.target.value)){
    setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
    })
}
setErrors(validate({
    ...input,
    platforms: [...input.platforms, e.target.value]
}))
if(!changePlatforms.includes(e.target.value)){
    setPlatformChange([
        ...changePlatforms, e.target.value,
    ])
}
}
    
    function handleRemoveInputG(rInput) {
        setInput({
            ...input,
            genres: input.genres.filter((id) => id !== rInput)
            
        })
        setVideogamesChange(
            changeVideogames.filter((id) => id !== rInput)
        )
    };

    function handleRemoveInputP(rInput) {
        setInput({
            ...input,
            platforms: input.platforms.filter((id) => id !== rInput)
        })
        setPlatformChange(
            changePlatforms.filter((id) => id !== rInput)
        )
    };
    
    function handleSubmit(){
        setErrors(validate(input))
        if(Object.keys(errors)?.length === 0){
            alert('Game created')
            dispatch(postGame(input))
            setInput({
                name : '',
                description : '',
                released: '',
                rating: 1,
                genres: [],
                platforms: []
            })
           
        } 
        
    }
    return(
        <div className="contenedor">
        <div className="contenedorForm">
            <h2>Create game</h2>
            <form className='form' onSubmit={(e) => handleSubmit(e)}>
            <div className="name1">
            <label>Name</label>
                <p className="errors">{errors.name}</p>
                <input type="text" 
                value={input.name} 
                name="name" 
                onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="opt">
            <label>Description</label>
            <p className="errors">{errors.description}</p>
              <textarea name="description" 
              className="description"
              onChange={(e) => handleInputChange(e)}
              rows="9" cols="40"></textarea>
            </div>
            <div >
                <label>Rating</label>
                <p className="errors">{errors.rating}</p>
                <input type="number" 
                value={input.rating} 
                name='rating'
                min= '1'
                max= '5'
                onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="opt">
                <label>Released</label>
                <p className="errors">{errors.released}</p>
                <input type="date" name="released" onChange={(e) => handleInputChange(e)}/>
            </div>
         
            <div className="opt">
                        <label>Select genres: </label>
                        <p className="errors">{errors.genres}</p>
                        <select
                            class="opt"
                            onChange={(e) => handleGenreChange(e)}
                            name="genres"
                        >
                            <option value="" selected disabled>
                                Select a genre
                            </option>

                            {genres &&
                                genres.map((genre) => {
                                        return (
                                            <>
                                                <option value={genre.name} key={genre.name}>
                                                    {genre.name}
                                                </option>
                                               
                                            </>
                                        );
                                    })}
                        </select>
                    </div>
                    <div className="opt">
                        <label>Genres selected: </label>
                        <div className="genresBox">
                            {changeVideogames.map((game) => (
                                <div className="genresSelected">
                                    <div className="genres">
                                        <div>{game}</div>
                                        <div className="eliminarGame"  onClick={() => handleRemoveInputG(game)} >X</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="opt">
                        <label>Select Platforms: </label>
                        
                        <p className="errors">{errors.platforms}</p>
                        <select
                            class="opt"
                            onChange={(e) => handlePlatformChange(e)}
                            name="platform"
                        >
                            <option value="" selected disabled>
                                Select a platform
                            </option>

                            {platforms &&
                                  platforms.map((platform) => {
                                        return (
                                            <>
                                                <option value={platform.id} key={platform.id}>
                                                    {platform}
                                                </option>
                                               
                                            </>
                                        );
                                    })}
                        </select>
                        </div>
                        <div className="opt">
                        <label>Platforms selected: </label>
                        <div className="platformsBox">
                            {changePlatforms.map((platform) => (
                                <div className="platformsSelected">
                                    <div className="platforms">
                                        <div>{platform}</div>
                                        <div className="eliminarGame"  onClick={() => handleRemoveInputP(platform)} >X</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                        
                    <button
                        type="submit"
                        className="botonForm"
                        disabled={
                            !input.name ||
                            errors.name ||
                            errors.rating ||
                            errors.description ||
                            errors.date ||    
                                !input.description ||
                                !input.rating ||
                                input.platforms?.length === 0 ||
                                input.genres?.length === 0
                                ? true
                                : false
                        }
                    >
                        Create Game
                    </button>
                </form>
                    
        </div>
        <div className="home">
        <Link to= '/home'><button class='button-27' >Back home</button></Link>
        </div>
        </div>
    )
}