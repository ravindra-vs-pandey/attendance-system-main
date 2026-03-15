import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import "./App.css";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  // Load students from Firestore on mount
  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, "students"), orderBy("name"));
        const snap = await getDocs(q);
        const loaded = snap.docs.map(d => ({
          id: d.id,
          name: d.data().name,
          rollNo: d.data().rollNo || "",
          status: "Present", // default everyone to Present
        }));
        setStudents(loaded);
      } catch (e) {
        console.error(e);
        alert("Error loading students: " + e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (index, value) => {
    const updated = [...students];
    updated[index].status = value;
    setStudents(updated);
  };

  const submitAttendance = async () => {
    setSaving(true);
    try {
      for (const student of students) {
        await addDoc(collection(db, "attendance"), {
          name: student.name,
          rollNo: student.rollNo,
          status: student.status,
          date: new Date(),
          timestamp: Date.now(),
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Error saving attendance: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const presentCount = students.filter(s => s.status === "Present").length;

  if (loading) {
    return (
      <div className="page-card">
        <p className="empty-state">Loading students...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="page-card">
        <p className="empty-state">
          No students found. Go to <strong>Add Student</strong> to add some first.
        </p>
      </div>
    );
  }

  return (
    <div className="page-card">

      {saved && (
        <div className="success-banner">
          Attendance submitted successfully!
        </div>
      )}

      <p className="attendance-meta">
        {presentCount}/{students.length} present today
      </p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Student</th>
            <th className="right">Roll No.</th>
            <th className="right">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>
                <span className="avatar">{student.name.charAt(0).toUpperCase()}</span>
                {student.name}
              </td>
              <td className="right muted">{student.rollNo || "—"}</td>
              <td className="right">
                <select
                  className={`status-select${student.status === "Absent" ? " absent" : ""}`}
                  value={student.status}
                  onChange={e => handleChange(index, e.target.value)}
                >
                  <option>Present</option>
                  <option>Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="attendance-actions">
        <button
          className="btn-submit"
          onClick={submitAttendance}
          disabled={saving}
        >
          {saving ? "Saving..." : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
}

export default Attendance;