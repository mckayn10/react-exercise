import './MainScreen.css';
import {useState, useEffect} from "react";
import Select from 'react-select'
import {dropDownData, repsOptions} from '../../Data/dropDownData'
import ListItem from "../../Components/ListItem";
import PersonInfo from "../../Components/PersonInfo";

function MainScreen() {
    const [repType, setRepType] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [listItems, setListItems] = useState([])
    const [personInfo, setPersonInfo] = useState()


    const showPersonInfo = (person) => {
        setPersonInfo(person)
    }

    const handleSearch = () => {
        setPersonInfo(null)
        if(!repType && !selectedState){
            alert('Please select a type of Representative and a State')
            return;
        }
        if(!selectedState){
            alert('Please select a State')
            return;
        }
        if(!repType){
            alert('Please select a type of Representative')
            return;
        }

        let url = `http://localhost:3000/${repType}/${selectedState}`
        fetch(url).then(async res => {
            let response = await res.json()
            setListItems(response.results)
        }).catch(err => {
            console.error(err)
        })
    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const listOfReps = listItems.map((person, index) =>
        <ListItem
            person={person}
            key={index}
            handleClick={showPersonInfo}
        />
    );

    return (
        <div className="main-screen-container">
            <h1 className="title-text">Who's My Representative?</h1>
            <div className="search-container">
                <div className="dropdown-inputs-container">
                    <Select
                        options={repsOptions}
                        className="select-input"
                        placeholder="Select Type "
                        onChange={value => setRepType(value.value)}
                    />
                    <Select
                        options={dropDownData}
                        className="select-input"
                        placeholder="Select State"
                        onChange={value => setSelectedState(value.value)}
                    />
                </div>
                <button
                    onClick={() => handleSearch()}
                    className="search-btn"
                >
                    Search
                </button>
            </div>
            <div className="body-container">
                <div className="list-container">
                    <h1 className="body-title">
                        List /
                        <span className="rep-type-text lg-text"> {capitalizeFirstLetter(repType)}</span>
                    </h1>
                    <div className="list-table">
                        <div className="row row-header">
                            <div className="column-1">Name</div>
                            <div className="column-2">Party</div>
                        </div>
                        {listOfReps}
                    </div>
                </div>
                <div className="info-container">
                    <h1 className="body-title">Info</h1>
                    {personInfo
                        ? <PersonInfo person={personInfo} />
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default MainScreen;