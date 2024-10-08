import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './card.css'
import { faEarth } from '@fortawesome/free-solid-svg-icons'

 const LocationDetailsCard = ({ location }) => {
    return (
        <div className='card'>
            <div className='card-header'><FontAwesomeIcon icon={faEarth} className='icon' /><h3>HOMETOWN</h3></div>
        </div>
    )
}

export default LocationDetailsCard