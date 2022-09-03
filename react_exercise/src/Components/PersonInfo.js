import '../Screens/MainScreen/MainScreen.css';


function PersonInfo({person}) {
    const {name, party, district, phone, office, link} = person
    const getPartyLetter = (party) => {
        let letter = party.substring(0,1)
        return letter
    }

    const getFirstName = () => {
        return name.split(' ')[0]
    }

    const getLastName = () => {
        return name.split(' ').pop();
    }

    return (
        <div className="info-data-container list-table">
            <div className="info-text row-header row">{getFirstName()}</div>
            <div className="info-text row-header row">{getLastName()}</div>
            {district
                ? <div className="info-text row-header row">District {district}</div>
                :null
            }
            <div className="info-text row-header row">Phone: {phone}</div>
            <div className="info-text row-header row">{office}</div>
            <a href={link} target={"_blank"} className="info-text row-header row">{link}</a>
        </div>

    )
}

export default PersonInfo