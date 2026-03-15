import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../App.css";

function Reports() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("All");

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, "attendance"), orderBy("timestamp", "desc"));
        const snap = await getDocs(q);
        setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = filter === "All" ? records : records.filter(r => r.status === filter);

  return (
    <div className="page-card">
      <div className="filter-bar">
        {["All", "Present", "Absent"].map(f => (
          <button
            key={f}
            className={`btn-filter${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
        <span className="filter-count">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {loading ? (
        <p className="empty-state">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">No records found.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th className="center">Status</th>
              <th className="right">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td className="center">
                  <span className={`badge badge-${r.status === "Present" ? "present" : "absent"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="right muted">
                  {r.date?.toDate
                    ? r.date.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                    : new Date(r.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Reports;