import '../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// useDispatch = Senden der Daten,
// useSelector = Den States holen,
import { useDispatch, useSelector } from "react-redux";
import useAxios from '../../hooks/useAxios';
import axios from '../../apis/brewers';

function ChoiceCities() {
    let [choicetype, setChoicetype] = useState("");
    let [choicecity, setChoicecity] = useState("");
    let [rendners, setRedeners] = useState(1);
    let mySelected = [];
    let myChecked = [];
    let myTmpCities = [];
    let myOptions = [];

    rendners = useSelector(state => state.rendners);
    console.log(rendners);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [datas] = useAxios({
        axiosInstance: axios,
        method: 'Get',
        url: '/',
        requestConfig: {
            headers: {
                'Content-Language': 'en-US'
            },
        }
    });
    // Write the complete DataSet in the redux, for next steps.
    dispatch({
        type: 'HOLE_BREWERIES_DATA',
        holebreweries: JSON.stringify(datas),
    });

    // set Breweries Types into an Array:
    let myOptionsArray = ['mirco', 'nano', 'regional', 'brewpub', 'large', 'plannung', 'bar', 'contact', 'proprietor', 'closed']

    // Make an Object from the Arry
    for (let i = 0; i < myOptionsArray.length; i++) {
        myOptions.push({ id: i, name: myOptionsArray[i] });
    }

    // Starting select for the DropDown
    myTmpCities.push("");

    // Fill the rest with the DataSet in the DropDown
    for (let i = 0; i < datas.length; i++) {
        myTmpCities.push(datas[i].city);
    }

    // Create a single time of values for the correct DataSet in the DropDown
    let uniqueCities = [...new Set(myTmpCities)];

    // Handle the Selection, at the DropDown
    function handleSelect(e) {
        mySelected.length = 0;
        for (let i = 0; i < datas.length; i++) {
            if (e.target.value === datas[i].city) {
                mySelected.push(datas[i]);
            };
        }
        // Set States, for the rendering of components - see below at the end
        setChoicecity(mySelected);
        setChoicetype("");
        // Use the redux for saving the selected value from the DropDown
        dispatch({
            type: 'SEL_BREWERIES_CITY',
            breweriescity: JSON.stringify(mySelected),
        });
    }

    // Handle the Checked OptionBox action
    function handleChecked(e) {
        myChecked.length = 0;
        for (let i = 0; i < datas.length; i++) {
            if (e.target.value === datas[i].brewery_type) {
                myChecked.push(datas[i]);
            }
        }
        // Set States, for the rendering of components - see below at the end
        setChoicetype(myChecked);
        setChoicecity("");
        dispatch({
            type: 'SEL_BREWERIES_TYPE',
            breweriestype: JSON.stringify(myChecked),
        });
    }

    // Handle the Click event, for the Button inside the Brewery Card
    function handleOnClick(breweryId) {
        console.log(breweryId);
        dispatch({
            type: 'SEL_BREWERIES_CITY',
            breweriescity: JSON.stringify(breweryId),
        });
        // Set the State of this Component to invisible
        dispatch({
            type: 'SET_RENDERS',
            rendners: 0,
        })
        sessionStorage.setItem('rendners', 0);
        setRedeners(0)
        // Navigate to the Detail Information from the Card with the Button
        navigate('/brewerydetails');
    }
    // Render the DropDown List
    function DropDown() {
        return (
            <div className='sideChoises'>
                <div className='w-100 ms-0.5'>
                    <h2 className='m-3'>Brauerei'n in den USA</h2>
                    <div className='container'>
                        <div className='select-container'>
                            <select value={mySelected.city} onChange={handleSelect} className="container m-n5" selected>
                                {uniqueCities.map((uniqueCity => {
                                    return (
                                        <option key={uniqueCity.toString()} value={uniqueCity.toString()}>{uniqueCity.toString()}</option>
                                    )
                                }))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    // Render the Option Field for Brewery types
    function OptionChecked() {
        return (
            <div>
                {myOptions.map((myOption) => {
                    return (
                        <div className="d-inline-flex p-2 bd-highlight">
                            <div className="form-check">
                                <div className='col ms-2'>
                                    <input key={myOption.toString()} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios" value={myOption.name} onChange={handleChecked}></input>
                                    <label className="form-check-label" form="exampleRadios" name="exampleRadios">
                                        {myOption.name}
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    // Render the Card for selected City from the DropDown Menu
    function CardsCity() {
        if (choicecity !== "") {
            return (
                <div>
                    {choicecity ? choicecity.map((myBrewer) => {
                        return (
                            <div>
                                <div key={myBrewer.toString()} className="d-inline-flex p-4 bd-highlight">
                                    <div key={myBrewer.toString()} className="card mt-3">
                                        <h4 key={myBrewer.toString()}>{myBrewer.name}</h4>
                                        <div key={myBrewer.toString()} className="card-body">
                                            <h5>Brewery Information:</h5>
                                            <p>Type: {myBrewer.brewery_type}</p>
                                            <p>State: {myBrewer.state}</p>
                                            <p>City: {myBrewer.city}</p>
                                            <p>Postcode: {myBrewer.postal_code}</p>
                                            <p>Phone: {myBrewer.phone}</p>
                                            <p>{myBrewer.website_url ? <a href={myBrewer.website_url}> Website: {myBrewer.website_url}</a> : ""}</p>
                                            <button onClick={() => { handleOnClick(myBrewer) }}>Click</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : ""}
                </div>
            )
        }
    }
    // Render the Card for selected Brewery Type from the Option Field
    function CardsType() {
        if (choicetype !== "") {
            return (
                <div>
                    {choicetype ? choicetype.map((myBrewer) => {
                        return (
                            <div key={myBrewer.toString()} className="d-inline-flex p-4 bd-highlight">
                                <div key={myBrewer.toString()} className="card">
                                    <h4 key={myBrewer.toString()}>{myBrewer.name}</h4>
                                    <div key={myBrewer.toString()} className="card-body">
                                        <h5>Brewery Information:</h5>
                                        <p>Type: {myBrewer.brewery_type}</p>
                                        <p>State: {myBrewer.state}</p>
                                        <div className=''>City: {myBrewer.city}</div>
                                        <p>Postcode: {myBrewer.postal_code}</p>
                                        <p>Phone: {myBrewer.phone}</p>
                                        <p>{myBrewer.website_url ? <a href={myBrewer.website_url}>Website: {myBrewer.website_url}</a> : ""}</p>
                                        <button onClick={() => { handleOnClick(myBrewer) }}>Click</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : ""}
                </div>
            )
        }
    }
    // At the end, here are the conditions for render this page
    return (
        <div>
            {rendners && <DropDown />}
            {rendners && <OptionChecked />}
            {rendners && choicecity && <CardsCity />}
            {rendners && choicetype && <CardsType />}
        </div>
    )
}

export default ChoiceCities;
