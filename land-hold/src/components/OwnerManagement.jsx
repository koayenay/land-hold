import React, { useState, useEffect } from "react"
import OwnerForm from "./OwnerForm"
import OwnerList from "./OwnerList"
import api from "../services/api"

const OwnerManagement = () => {
  const [owners, setOwners] = useState([])
  const [selectedOwner, setSelectedOwner] = useState(null)

  useEffect(() => {
    fetchOwners()
  }, [])

  const fetchOwners = async () => {
    try {
      const response = await api.get("/owners")
      setOwners(response.data)
    } catch (error) {
      console.error("Error fetching owners:", error)
    }
  }

  const handleSave = () => {
    setSelectedOwner(null)
    fetchOwners() // Re-fetch the list after saving
  }

  const handleEdit = (owner) => {
    setSelectedOwner(owner)
  }

  return (
    <div>
      <h1>Owner Management</h1>
      <OwnerForm owner={selectedOwner} onSave={handleSave} />
      <OwnerList owners={owners} onEdit={handleEdit} onDelete={fetchOwners} />
    </div>
  )
}

export default OwnerManagement
