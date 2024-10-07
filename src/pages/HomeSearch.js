import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PersonInList from "../components/PersonInList"
import { FetchPeople } from "../data/FetchPeople"
import "./HomeSearch.css"

const HomeSearch = () => {
    const [name, setName] = useState("")
    const [people, setPeople] = useState([])
    const navigate = useNavigate()
    const { searchName } = useParams()

    const fetchNewPeople = (updatedName) => {
        setPeople([])
        FetchPeople(updatedName).then(response => setPeople(response.result))
    }

    const onSearchClick = () => {
        navigate(`/search/${name}`)
    }

    useEffect(() => {
        if(searchName) {
            setName(searchName)
            fetchNewPeople(searchName)
        }
    }, [searchName])

    return (
    <>
        <h1>Star Wars Search</h1>
        <input placeholder="Enter a name" onChange={(event) => setName(event.target.value) } value={name} />
        <button onClick={ onSearchClick }>Search the Galaxy</button>
        <ul>
            {people?.map( (person) => <PersonInList person={person} key={person.uid} /> )}
        </ul>
    </>
    )
}

export default HomeSearch