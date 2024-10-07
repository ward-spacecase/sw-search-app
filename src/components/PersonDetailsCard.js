import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './card.css'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

 const PersonDetailsCard = ({ person }) => {
    return (
        <div className='card'>
            <FontAwesomeIcon icon={faUserAstronaut} />
            <p>Gender: {person.gender}</p>
            <p>Birth year: {person.birth_year}</p>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Hair Color: {person.hair_color}</p>
            <p>Skin Color: {person.skin_color}</p>
            <p>Eye Color: {person.eye_color}</p>
        </div>
    )
}

export default PersonDetailsCard