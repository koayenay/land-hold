// frontend/src/components/FileUpload.jsx
import React, { useState } from "react"
import api from "../services/api"

const FileUpload = ({ entityId, entityType }) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleFileUpload = async () => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const endpoint = `/upload/${entityType}/${entityId}`
      await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Override the Content-Type header
        },
      })
      alert("File uploaded successfully")
    } catch (error) {
      console.error("File upload error:", error)
      alert("File upload failed")
    }
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  )
}

export default FileUpload
