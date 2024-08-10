import React, { useState, useEffect } from "react"
import OwnerForm from "./OwnerForm"
import OwnerList from "./OwnerList"
import LandHoldingForm from "./LandHoldingForm"
import LandHoldingList from "./LandHoldingList"
import api from "../services/api"

const Dashboard = () => {
  const [owners, setOwners] = useState([])
  const [landHoldings, setLandHoldings] = useState([])
  const [selectedOwner, setSelectedOwner] = useState(null)
  const [selectedLandHolding, setSelectedLandHolding] = useState(null)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const ownerResponse = await api.get("/owners")
      setOwners(ownerResponse.data)

      const landHoldingResponse = await api.get("/landholdings")
      setLandHoldings(landHoldingResponse.data)
    }

    fetchData()
  }, [])

  // Save owner and refresh the list
  const handleOwnerSave = () => {
    setSelectedOwner(null)
    fetchOwners()
  }

  // Save landholding and refresh the list
  const handleLandHoldingSave = () => {
    setSelectedLandHolding(null)
    fetchLandHoldings()
  }

  // Edit owner
  const handleEditOwner = (owner) => {
    setSelectedOwner(owner)
  }

  // Edit landholding
  const handleEditLandHolding = (landHolding) => {
    setSelectedLandHolding(landHolding)
  }

  const fetchOwners = async () => {
    const ownerResponse = await api.get("/owners")
    setOwners(ownerResponse.data)
  }

  const fetchLandHoldings = async () => {
    const landHoldingResponse = await api.get("/landholdings")
    setLandHoldings(landHoldingResponse.data)
  }

  return (
    <div>
      <h1>Land Holding Management</h1>
      <OwnerForm owner={selectedOwner} onSave={handleOwnerSave} />
      <OwnerList owners={owners} onEdit={handleEditOwner} />

      <LandHoldingForm
        landHolding={selectedLandHolding}
        onSave={handleLandHoldingSave}
      />
      <LandHoldingList
        landHoldings={landHoldings}
        onEdit={handleEditLandHolding}
      />
    </div>
  )
}

export default Dashboard
