import '../Screens/MainScreen/MainScreen.css';


function ListItem({person, handleClick}) {
    const {name, party} = person
    const getPartyLetter = (party) => {
        let letter = party.substring(0,1)
        return letter
    }

    return (
        <div onClick={() => handleClick(person)} className="row">
            <div className="column-1">{name}</div>
            <div className="column-2">{getPartyLetter(party)}</div>
        </div>

    )
}

export default ListItem