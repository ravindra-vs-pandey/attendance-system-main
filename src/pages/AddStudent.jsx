import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../App.css";

function AddStudent() {
  const [name, setName]     = useState("");
  const [rollNo, setRollNo] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "students"), {
        name: name.trim(),
        rollNo: rollNo.trim(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setRollNo("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Error adding student");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-card" style={{ maxWidth: "480px" }}>
      {success && <div className="success-banner">Student added successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Full Name</label>
          <input
            type="text" className="form-input"
            placeholder="e.g. Ravi Sharma"
            value={name} onChange={e => setName(e.target.value)} required
          />
        </div>
        <div className="form-field">
          <label className="form-label">Roll Number</label>
          <input
            type="text" className="form-input"
            placeholder="e.g. 21"
            value={rollNo} onChange={e => setRollNo(e.target.value)}
          />
        </div>
        <button
          type="submit" className="btn-submit"
          disabled={saving} style={{ width: "100%", marginTop: "0.5rem" }}
        >
          {saving ? "Adding..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default AddStudent;