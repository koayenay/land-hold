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

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("") // To track success or error

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
    } else {
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
    }
  }, [landHolding])

  const validate = () => {
    let newErrors = {}
    if (!name) newErrors.name = "Name is required"
    if (!owner) newErrors.owner = "Owner is required"
    if (!legalEntity) newErrors.legalEntity = "Legal Entity is required"
    if (netMineralAcres <= 0)
      newErrors.netMineralAcres = "Net Mineral Acres must be greater than 0"
    if (mineralOwnerRoyalty <= 0)
      newErrors.mineralOwnerRoyalty =
        "Mineral Owner Royalty must be greater than 0"
    if (!sectionName) newErrors.sectionName = "Section Name is required"
    if (!/^\d{3}$/.test(section))
      newErrors.section = "Section must be a 3-digit number"
    if (!/^\d{3}[NS]$/.test(township))
      newErrors.township = "Township must be in the format 123N or 123S"
    if (!/^\d{3}[EW]$/.test(range))
      newErrors.range = "Range must be in the format 123E or 123W"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

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
        setMessage("Land holding updated successfully.")
        setMessageType("success")
      } else {
        await api.post("/landholdings", data)
        setMessage("Land holding saved successfully.")
        setMessageType("success")
      }

      if (typeof onSave === "function") {
        onSave()
      }

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
      setErrors({})
    } catch (error) {
      setMessage("Error saving land holding. Please try again.")
      setMessageType("error")
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (errors.name) {
      setErrors({ ...errors, name: "" })
    }
  }

  const handleOwnerChange = (e) => {
    setOwner(e.target.value)
    if (errors.owner) {
      setErrors({ ...errors, owner: "" })
    }
  }

  const handleLegalEntityChange = (e) => {
    setLegalEntity(e.target.value)
    if (errors.legalEntity) {
      setErrors({ ...errors, legalEntity: "" })
    }
  }

  const handleNetMineralAcresChange = (e) => {
    setNetMineralAcres(e.target.value)
    if (errors.netMineralAcres && e.target.value > 0) {
      setErrors({ ...errors, netMineralAcres: "" })
    }
  }

  const handleMineralOwnerRoyaltyChange = (e) => {
    setMineralOwnerRoyalty(e.target.value)
    if (errors.mineralOwnerRoyalty && e.target.value > 0) {
      setErrors({ ...errors, mineralOwnerRoyalty: "" })
    }
  }

  const handleSectionNameChange = (e) => {
    setSectionName(e.target.value)
    if (errors.sectionName) {
      setErrors({ ...errors, sectionName: "" })
    }
  }

  const handleSectionChange = (e) => {
    setSection(e.target.value)
    if (errors.section && /^\d{3}$/.test(e.target.value)) {
      setErrors({ ...errors, section: "" })
    }
  }

  const handleTownshipChange = (e) => {
    setTownship(e.target.value)
    if (errors.township && /^\d{3}[NS]$/.test(e.target.value)) {
      setErrors({ ...errors, township: "" })
    }
  }

  const handleRangeChange = (e) => {
    setRange(e.target.value)
    if (errors.range && /^\d{3}[EW]$/.test(e.target.value)) {
      setErrors({ ...errors, range: "" })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type='text' value={name} onChange={handleNameChange} required />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>
      <div>
        <label>Owner:</label>
        <select value={owner} onChange={handleOwnerChange} required>
          <option value=''>Select Owner</option>
          {owners.map((o) => (
            <option key={o._id} value={o._id}>
              {o.ownerName}
            </option>
          ))}
        </select>
        {errors.owner && <p style={{ color: "red" }}>{errors.owner}</p>}
      </div>
      <div>
        <label>Legal Entity:</label>
        <input
          type='text'
          value={legalEntity}
          onChange={handleLegalEntityChange}
          required
        />
        {errors.legalEntity && (
          <p style={{ color: "red" }}>{errors.legalEntity}</p>
        )}
      </div>
      <div>
        <label>Net Mineral Acres:</label>
        <input
          type='number'
          value={netMineralAcres}
          onChange={handleNetMineralAcresChange}
          required
        />
        {errors.netMineralAcres && (
          <p style={{ color: "red" }}>{errors.netMineralAcres}</p>
        )}
      </div>
      <div>
        <label>Mineral Owner Royalty (%):</label>
        <input
          type='number'
          value={mineralOwnerRoyalty}
          onChange={handleMineralOwnerRoyaltyChange}
          required
        />
        {errors.mineralOwnerRoyalty && (
          <p style={{ color: "red" }}>{errors.mineralOwnerRoyalty}</p>
        )}
      </div>
      <div>
        <label>Section Name:</label>
        <input
          type='text'
          value={sectionName}
          onChange={handleSectionNameChange}
          required
        />
        {errors.sectionName && (
          <p style={{ color: "red" }}>{errors.sectionName}</p>
        )}
      </div>
      <div>
        <label>Section:</label>
        <input
          type='text'
          value={section}
          onChange={handleSectionChange}
          required
        />
        {errors.section && <p style={{ color: "red" }}>{errors.section}</p>}
      </div>
      <div>
        <label>Township:</label>
        <input
          type='text'
          value={township}
          onChange={handleTownshipChange}
          required
        />
        {errors.township && <p style={{ color: "red" }}>{errors.township}</p>}
      </div>
      <div>
        <label>Range:</label>
        <input
          type='text'
          value={range}
          onChange={handleRangeChange}
          required
        />
        {errors.range && <p style={{ color: "red" }}>{errors.range}</p>}
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
      {message && (
        <p style={{ color: messageType === "success" ? "green" : "red" }}>
          {message}
        </p>
      )}
    </form>
  )
}

export default LandHoldingForm
