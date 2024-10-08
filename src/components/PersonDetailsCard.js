import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './card.css'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

 const PersonDetailsCard = ({ person }) => {
    return (
        <div className='card'>
            <div className='card-header'><FontAwesomeIcon icon={faUserAstronaut} className='icon' /><h3>ABOUT</h3></div>
            <p><span>Gender:</span> <span>{person.gender}</span></p>
            <p><span>Birth Year:</span> <span>{person.birth_year}</span></p>
            <p><span>Height:</span> <span>{person.height}</span></p>
            <p><span>Mass:</span> <span>{person.mass}</span></p>
            <p><span>Hair Color:</span> <span>{person.hair_color}</span></p>
            <p><span>Skin Color:</span> <span>{person.skin_color}</span></p>
            <p><span>Eye Color:</span> <span>{person.eye_color}</span></p>
        </div>
    )
}

export default PersonDetailsCard