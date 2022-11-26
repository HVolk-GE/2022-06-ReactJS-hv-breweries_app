import React from 'react'
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './Favorits.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const BreweryDetails = () => {
    const [rating, setRating] = useState(0);
    const [favorite, setFavorite] = useState(false);
    let rendeners = 0;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const datas = useSelector(state => state.breweriescity)
    const myObject = JSON.parse(datas);
    let myCountry = myObject.country.toUpperCase();

    const currentName = useSelector(state => state.username)

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
    };

    const handleAddFavorit = () => {
        if (favorite) {
            setFavorite(false);
        } else {
            setFavorite(true);
        }
    }

    const handleButton = (e) => {
        let usrTxt = e.target.value
        if (usrTxt.length < 150 & usrTxt.length > 1) {
            alert("YOU DID NOT ENTER ENOUGH INFORMATION")
        } else {
            dispatch({
                type: 'SET_USERFAVORITE_DATA',
                id: myObject.id,
                name: myObject.name,
                favorite: favorite,
                rating: rating,
                user: currentName,
                information: usrTxt,
            })
            dispatch({
                type: 'SET_RENDERS',
                rendners: 1,
            })
            sessionStorage.setItem('rendeners', 1);
        }
        navigate('/');
    };

    const mydatas = useSelector(state => state.brewerydataset)
    console.log(mydatas);

    return (
        <div>

            <div className="sideStandardMargin">
                <div className='favobutton'>
                    <label for="id-of-input" className="custom-checkbox">
                        <span>Favorite</span>
                        <input type="checkbox" id="id-of-input" onChange={handleAddFavorit} />
                        <i className="glyphicon glyphicon-star-empty"></i>
                        <i className="glyphicon glyphicon-star"></i>
                    </label>
                </div>
                <div className="d-inline-flex p-4 bd-highlight">
                    <div className="form-check">
                        <div className='col ms-2'>
                            <h1>Brauerei Details:</h1>
                            <h4>Country: {myCountry}</h4>
                            <h5>State: {myObject.state}</h5>
                            <p>Name: {myObject.name}</p>
                            <p>Postal Code: {myObject.postal_code}</p>
                            <p>City: {myObject.city}</p>
                            <p>Street: {myObject.street}</p>
                            <p>Type: {myObject.brewery_type}</p>
                            <p>Phone: {myObject.phone}</p>
                            <p>Longitude: {myObject.longitude}</p>
                            <p>Latitude: {myObject.latitude}</p>
                            <p>{myObject.website_url ? <a href={myObject.website_url}>Website: {myObject.website_url}</a> : ""}</p>
                        </div>
                    </div>
                </div>
                <div className='selectRating '>
                    <Rating onClick={handleRating} ratingValue={rating} />
                </div>
                <div>
                    <textarea className="userComment" name="Comment" rows="4" cols="50" placeholder="The min. of Characters 150 ..."></textarea>
                </div>
                <div>
                    <button onClick={handleButton} className="saveButton">Save</button>
                </div>
            </div>
        </div>
    )
}

export default BreweryDetails
