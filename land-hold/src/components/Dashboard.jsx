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

  useEffect(() => {
    const fetchData = async () => {
      const ownerResponse = await api.get("/owners")
      setOwners(ownerResponse.data)

      const landHoldingResponse = await api.get("/landholdings")
      setLandHoldings(landHoldingResponse.data)
    }

    fetchData()
  }, [])

  const handleOwnerSave = () => {
    setSelectedOwner(null)
    fetchOwners()
  }

  const fetchOwners = async () => {
    const ownerResponse = await api.get("/owners")
    setOwners(ownerResponse.data)
  }

  const handleEditOwner = (owner) => {
    setSelectedOwner(owner)
  }

  return (
    <div>
      <h1>Land Holding Management</h1>
      <OwnerForm owner={selectedOwner} onSave={handleOwnerSave} />
      <OwnerList owners={owners} onEdit={handleEditOwner} />

      {/* Other components, e.g., LandHoldingForm and LandHoldingList */}
      <LandHoldingForm
        landHolding={selectedLandHolding}
        onSave={() => fetchLandHoldings()}
      />
      <LandHoldingList
        landHoldings={landHoldings}
        onEdit={setSelectedLandHolding}
      />
    </div>
  )
}

export default Dashboard
