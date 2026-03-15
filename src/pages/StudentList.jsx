import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../App.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, "students"), orderBy("name"));
        const snap = await getDocs(q);
        setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
        alert("Error loading students: " + e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="page-card">
      <p className="attendance-meta">
        {students.length} student{students.length !== 1 ? "s" : ""} enrolled
      </p>
      {loading ? (
        <p className="empty-state">Loading...</p>
      ) : students.length === 0 ? (
        <p className="empty-state">No students found. Add one from the sidebar.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="right">Roll No.</th>
              <th className="right">Added</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>
                  <span className="avatar">{s.name?.charAt(0).toUpperCase()}</span>
                  {s.name}
                </td>
                <td className="right">{s.rollNo || "—"}</td>
                <td className="right muted">
                  {s.createdAt?.toDate
                    ? s.createdAt.toDate().toLocaleDateString("en-IN")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;