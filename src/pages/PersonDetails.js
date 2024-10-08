import { useEffect, useState } from "react"
import { useParams } from "react-router"
import {useNavigate } from "react-router-dom"
import { FetchPersonDetails } from "../data/FetchPersonDetails"
import PersonDetailsCard from "../components/PersonDetailsCard"
import './PersonDetails.css'

const PersonDetails = () => {
    const { id } = useParams()
    const [personDetails, setPersonDetails] = useState(undefined)
    const navigate = useNavigate()
    
    useEffect(() => {
        FetchPersonDetails(id).then(response => {setPersonDetails(response.result)})
    }, [id])

    return (
        <>
        <button onClick={() => {navigate(-1)}}>back</button>
        {personDetails && (
            <>
                <h2 className="searchHeader">{personDetails.properties.name}</h2>
                <div className="row">
                    <PersonDetailsCard person={personDetails.properties} />
                </div>
            </>
        )}
        </>
    )
}

export default PersonDetails