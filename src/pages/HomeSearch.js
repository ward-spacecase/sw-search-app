import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PersonInList from "../components/PersonInList"
import { FetchPeople } from "../data/FetchPeople"
import "./HomeSearch.css"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const HomeSearch = () => {
    const [name, setName] = useState("")
    const [people, setPeople] = useState([])
    const navigate = useNavigate()
    const { searchName } = useParams()

    const fetchNewPeople = (updatedName) => {
        setPeople(undefined)
        FetchPeople(updatedName).then(response => setPeople(response.result))
    }

    const onSearchClick = () => {
        if(name) {
            navigate(`/search/${name}`)
        }
    }

    useEffect(() => {
        if(searchName) {
            setName(searchName)
            fetchNewPeople(searchName)
        }
    }, [searchName])

    return (
    <>
        <h1 className="search-header">Star Wars Search</h1>
        <input className="lightsaber-input" placeholder="Enter a name" onChange={(event) => setName(event.target.value) } value={name} />
        <button className="lightsaber-button" onClick={ onSearchClick }>SCAN</button>
        {!people ? (<div className="spinner"><FontAwesomeIcon className="fa-spin" icon={faCircleNotch} size="4x" /></div>) :
        (
        <ul>
            {people?.map( (person) => <PersonInList person={person} key={person.uid} /> )}
        </ul>
        )
        }
        {people?.length == 0 && (<h3 className="no-results">NO RESULTS</h3>)}
    </>
    )
}

export default HomeSearch