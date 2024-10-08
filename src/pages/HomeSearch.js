import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PersonInList from "../components/PersonInList"
import { FetchPeople } from "../data/FetchPeople"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./HomeSearch.css"


const HomeSearch = () => {
    const [name, setName] = useState("")
    const [people, setPeople] = useState([])
    const [searched, setSearched] = useState(false)

    const navigate = useNavigate()
    const { searchName } = useParams()

    const fetchNewPeople = (updatedName) => {
        setPeople(undefined)
        setSearched(false)
        return FetchPeople(updatedName).then(response => {
            setPeople(response.result)
            setSearched(true)
        })
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
        <input className="lightsaber-input" onChange={(event) => setName(event.target.value) } placeholder="Enter a name" value={name} />
        <button className="lightsaber-button" onClick={ onSearchClick }>SCAN</button>
        {!people ? (<div className="spinner"><FontAwesomeIcon className="fa-spin" icon={faCircleNotch} size="4x" /></div>) :
        (
        <ul>
            {people?.map( (person) => <PersonInList key={person.uid} person={person} /> )}
        </ul>
        )
        }
        {searched && people?.length === 0 && (<h3 className="no-results">NO RESULTS</h3>)}
    </>
    )
}

export default HomeSearch