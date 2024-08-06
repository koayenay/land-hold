// frontend/src/components/OwnerList.jsx
import React, { useEffect, useState } from "react"
import api from "../services/api"
import FileUpload from "./FileUpload"

const OwnerList = ({ onEdit }) => {
  const [owners, setOwners] = useState([])
  const [selectedOwnerId, setSelectedOwnerId] = useState(null)
  const [fileUrls, setFileUrls] = useState({})

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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/owners/${id}`)
      setOwners(owners.filter((owner) => owner._id !== id))
    } catch (error) {
      console.error("Error deleting owner:", error)
    }
  }

  const handleUploadClick = (id) => {
    setSelectedOwnerId(id)
  }

  const fetchFiles = async (ownerName) => {
    try {
      const response = await api.get(`/uploads/owner/${ownerName}`)
      setFileUrls((prev) => ({ ...prev, [ownerName]: response.data }))
    } catch (error) {
      console.error("Error fetching files:", error)
    }
  }

  return (
    <div>
      <h2>Owner List</h2>
      <ul>
        {owners.map((owner) => (
          <li key={owner._id}>
            {owner.ownerName} - {owner.entityType}
            <button onClick={() => onEdit(owner)}>Edit</button>
            <button onClick={() => handleDelete(owner._id)}>Delete</button>
            <button onClick={() => handleUploadClick(owner._id)}>
              Upload Files
            </button>
            {selectedOwnerId === owner._id && (
              <FileUpload
                entityId={owner._id}
                entityType='owner'
                onUpload={() =>
                  fetchFiles(owner.ownerName.replace(/\s+/g, "_"))
                } // Call to update file list after upload
              />
            )}
            <ul>
              {(fileUrls[owner.ownerName] || []).map((file) => (
                <li key={file}>
                  <a
                    href={`/uploads/owner/${owner.ownerName.replace(
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

export default OwnerList
