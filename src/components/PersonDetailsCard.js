import personLogo from '../img/person.png'
import './card.css'

 const PersonDetailsCard = ({ person }) => {
    return (
        <div className='card'>
            <img src={personLogo} alt="head-icon" width="40" />
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