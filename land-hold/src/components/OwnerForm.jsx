import React, { useState, useEffect } from "react"
import api from "../services/api"

const OwnerForm = ({ owner, onSave }) => {
  const [ownerName, setOwnerName] = useState("")
  const [entityType, setEntityType] = useState("Company")
  const [ownerType, setOwnerType] = useState("Competitor")
  const [address, setAddress] = useState("")
  const [totalLandHoldings, setTotalLandHoldings] = useState(0)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (owner) {
      setOwnerName(owner.ownerName)
      setEntityType(owner.entityType)
      setOwnerType(owner.ownerType)
      setAddress(owner.address)
      setTotalLandHoldings(owner.totalLandHoldings)
    } else {
      setOwnerName("")
      setEntityType("Company")
      setOwnerType("Competitor")
      setAddress("")
      setTotalLandHoldings(0)
    }
  }, [owner])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newOwner = {
        ownerName,
        entityType,
        ownerType,
        address,
        totalLandHoldings,
      }

      const response = await api.post("/owners", newOwner)

      if (response.status === 201) {
        console.log("Success:", response.data)

        if (typeof onSave === "function") {
          onSave()
        }

        setSuccess("Owner saved successfully!")
        setError("")

        setOwnerName("")
        setEntityType("Company")
        setOwnerType("Competitor")
        setAddress("")
        setTotalLandHoldings(0)

        setTimeout(() => {
          setSuccess("")
        }, 5000)
      }
    } catch (error) {
      console.error("Error occurred:", error)
      setError("An unexpected error occurred.")
      setSuccess("")

      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Owner Name:</label>
        <input
          type='text'
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Entity Type:</label>
        <select
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
        >
          <option value='Company'>Company</option>
          <option value='Individual'>Individual</option>
          <option value='Investor'>Investor</option>
          <option value='Trust'>Trust</option>
        </select>
      </div>
      <div>
        <label>Owner Type:</label>
        <select
          value={ownerType}
          onChange={(e) => setOwnerType(e.target.value)}
        >
          <option value='Competitor'>Competitor</option>
          <option value='Seller'>Seller</option>
          <option value='Investor'>Investor</option>
          <option value='Professional'>Professional</option>
        </select>
      </div>
      <div>
        <label>Address:</label>
        <input
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Total Number of Land Holdings:</label>
        <input
          type='number'
          value={totalLandHoldings}
          onChange={(e) => setTotalLandHoldings(e.target.value)}
        />
      </div>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type='submit'>Save Owner</button>
    </form>
  )
}

export default OwnerForm
