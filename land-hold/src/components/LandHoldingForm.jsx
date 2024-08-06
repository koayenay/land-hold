import React, { useState, useEffect } from "react"
import api from "../services/api"

const LandHoldingForm = ({ landHolding, onSave }) => {
  const [name, setName] = useState("")
  const [owner, setOwner] = useState("")
  const [legalEntity, setLegalEntity] = useState("")
  const [netMineralAcres, setNetMineralAcres] = useState(0)
  const [mineralOwnerRoyalty, setMineralOwnerRoyalty] = useState(0)
  const [sectionName, setSectionName] = useState("")
  const [section, setSection] = useState("")
  const [township, setTownship] = useState("")
  const [range, setRange] = useState("")
  const [titleSource, setTitleSource] = useState("Class A")
  const [owners, setOwners] = useState([])

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await api.get("/owners")
        setOwners(response.data)
      } catch (error) {
        console.error("Error fetching owners:", error)
      }
    }

    fetchOwners()
  }, [])

  useEffect(() => {
    if (landHolding) {
      setName(landHolding.name)
      setOwner(landHolding.owner._id)
      setLegalEntity(landHolding.legalEntity)
      setNetMineralAcres(landHolding.netMineralAcres)
      setMineralOwnerRoyalty(landHolding.mineralOwnerRoyalty)
      setSectionName(landHolding.sectionName)
      setSection(landHolding.section)
      setTownship(landHolding.township)
      setRange(landHolding.range)
      setTitleSource(landHolding.titleSource)
    }
  }, [landHolding])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name,
      owner,
      legalEntity,
      netMineralAcres,
      mineralOwnerRoyalty,
      sectionName,
      section,
      township,
      range,
      titleSource,
    }

    try {
      if (landHolding) {
        await api.put(`/landholdings/${landHolding._id}`, data)
      } else {
        await api.post("/landholdings", data)
      }
      onSave()
      // Reset form fields
      setName("")
      setOwner("")
      setLegalEntity("")
      setNetMineralAcres(0)
      setMineralOwnerRoyalty(0)
      setSectionName("")
      setSection("")
      setTownship("")
      setRange("")
      setTitleSource("Class A")
    } catch (error) {
      console.error("Error saving land holding:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Owner:</label>
        <select
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        >
          <option value=''>Select Owner</option>
          {owners.map((o) => (
            <option key={o._id} value={o._id}>
              {o.ownerName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Legal Entity:</label>
        <input
          type='text'
          value={legalEntity}
          onChange={(e) => setLegalEntity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Net Mineral Acres:</label>
        <input
          type='number'
          value={netMineralAcres}
          onChange={(e) => setNetMineralAcres(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mineral Owner Royalty (%):</label>
        <input
          type='number'
          value={mineralOwnerRoyalty}
          onChange={(e) => setMineralOwnerRoyalty(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Section Name:</label>
        <input
          type='text'
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Section:</label>
        <input
          type='text'
          value={section}
          onChange={(e) => setSection(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Township:</label>
        <input
          type='text'
          value={township}
          onChange={(e) => setTownship(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Range:</label>
        <input
          type='text'
          value={range}
          onChange={(e) => setRange(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Title Source:</label>
        <select
          value={titleSource}
          onChange={(e) => setTitleSource(e.target.value)}
        >
          <option value='Class A'>Class A</option>
          <option value='Class B'>Class B</option>
          <option value='Class C'>Class C</option>
          <option value='Class D'>Class D</option>
        </select>
      </div>
      <button type='submit'>Save Land Holding</button>
    </form>
  )
}

export default LandHoldingForm
