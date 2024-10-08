import { useEffect, useState } from "react"
import { useParams } from "react-router"
import {useNavigate } from "react-router-dom"
import { FetchPersonDetails } from "../data/FetchPersonDetails"
import PersonDetailsCard from "../components/PersonDetailsCard"
import LocationDetailsCard from "../components/LocationDetailsCard"
import './PersonDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faCircleNotch } from "@fortawesome/free-solid-svg-icons"

const PersonDetails = () => {
    const { id } = useParams()
    const [personDetails, setPersonDetails] = useState(undefined)
    const navigate = useNavigate()
    
    useEffect(() => {
        FetchPersonDetails(id).then(response => {setPersonDetails(response.result)})
    }, [id])

    return (
        <>
        {personDetails ? (
            <>
                <div className="row">
                    <button className="back-button" onClick={() => {navigate(-1)}}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <h1 className="search-header">{personDetails.properties.name}</h1>
                </div>
                <div className="row wrap">
                    <PersonDetailsCard person={personDetails.properties} />
                    <LocationDetailsCard />
                </div>
            </>
        ) : 
        (
            <>
            <button className="back-button" onClick={() => {navigate(-1)}}><FontAwesomeIcon icon={faChevronLeft} /></button>
            <div className="spinner">
                <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} size="4x" />
            </div>
            </>
        )}
        </>
    )
}

export default PersonDetails