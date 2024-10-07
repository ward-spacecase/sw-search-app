 import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

 const PersonInList = ({ person }) => {
    const navigate = useNavigate()
    return (
        <li className="li-person" onClick={() => navigate(`/person/`+ person.uid)}>
            <div className="name">
                <FontAwesomeIcon icon={faUserAstronaut} size="lg"/>
                <span> {person?.properties?.name} </span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
        </li>
    )
}

export default PersonInList