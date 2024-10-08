import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './card.css'
import { faCircleNotch, faEarth } from '@fortawesome/free-solid-svg-icons'

 const LocationDetailsCard = ({ location }) => {
    return (
        <div className='card'>
            <div className='card-header'><FontAwesomeIcon className='icon' icon={faEarth} size="2x" /><h3>HOMEWORLD</h3></div>
            {location ? (<>
                <p><span>Name:</span> <span>{location.name}</span></p>
                <p><span>Terrain:</span> <span className="spacing-fix">{location.terrain}</span></p>
                <p><span>Climate:</span> <span>{location.climate}</span></p>
                <p><span>Population:</span> <span>{location.population}</span></p>
                <p><span>Surface Water:</span> <span>{location.surface_water}</span></p>
                <p><span>Gravity:</span> <span>{location.gravity}</span></p>
                <p><span>Orbital Period:</span> <span>{location.orbital_period}</span></p>
                <p><span>Rotation Period:</span> <span>{location.rotation_period}</span></p>
            </>
            ) : (
                <div className="spinner">
                    <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} size="xl" />
                </div>
            )}
        </div>
    )
}

export default LocationDetailsCard