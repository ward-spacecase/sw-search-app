 import { Link } from 'react-router-dom'
import personLogo from '../img/person.png'
 const PersonInList = ({ person }) => {
    return (
        <li>
            <img src={personLogo} alt="head-icon" width="40" />
           <span className="name"> {person?.properties?.name} </span>
           <Link to={`/person/`+ person.uid}>More Details</Link>
        </li>
    )
}

export default PersonInList