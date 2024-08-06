//   "sectionName": "123-456N-789E",
//   "section": "123",
//   "township": "456N",
//   "range": "789E",
//   "__v": 0
// }

// frontend/src/components/LandHoldingList.jsx
import React, { useEffect, useState } from "react"
import api from "../services/api"
import FileUpload from "./FileUpload"

const LandHoldingList = ({ onEdit }) => {
  const [landHoldings, setLandHoldings] = useState([])
  const [selectedLandHoldingId, setSelectedLandHoldingId] = useState(null)
  const [fileUrls, setFileUrls] = useState({})

  useEffect(() => {
    const fetchLandHoldings = async () => {
      try {
        const response = await api.get("/landholdings")
        setLandHoldings(response.data)
      } catch (error) {
        console.error("Error fetching land holdings:", error)
      }
    }

    fetchLandHoldings()
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/landholdings/${id}`)
      setLandHoldings(landHoldings.filter((lh) => lh._id !== id))
    } catch (error) {
      console.error("Error deleting land holding:", error)
    }
  }

  const handleUploadClick = (id) => {
    setSelectedLandHoldingId(id)
  }

  const fetchFiles = async (landHoldingName) => {
    try {
      const response = await api.get(`/uploads/landholding/${landHoldingName}`)
      setFileUrls((prev) => ({ ...prev, [landHoldingName]: response.data }))
    } catch (error) {
      console.error("Error fetching files:", error)
    }
  }

  return (
    <div>
      <h2>Land Holding List</h2>
      <ul>
        {landHoldings.map((landHolding) => (
          <li key={landHolding._id}>
            {landHolding.name} - {landHolding.owner.ownerName}
            <button onClick={() => onEdit(landHolding)}>Edit</button>
            <button onClick={() => handleDelete(landHolding._id)}>
              Delete
            </button>
            <button onClick={() => handleUploadClick(landHolding._id)}>
              Upload Files
            </button>
            {selectedLandHoldingId === landHolding._id && (
              <FileUpload
                entityId={landHolding._id}
                entityType='landholding'
                onUpload={() =>
                  fetchFiles(landHolding.name.replace(/\s+/g, "_"))
                }
              />
            )}
            <ul>
              {(fileUrls[landHolding.name] || []).map((file) => (
                <li key={file}>
                  <a
                    href={`/uploads/landholding/${landHolding.name.replace(
                      /\s+/g,
                      "_"
                    )}/${file}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {file}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LandHoldingList
