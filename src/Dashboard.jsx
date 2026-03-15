import React, { useState } from "react";
import "./App.css";
import Attendance from "./Attendance";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import Reports from "./pages/Reports";

const NAV = [
  { id: "attendance", label: "Mark Attendance", icon: CalendarIcon },
  { id: "students",   label: "Student List",    icon: UsersIcon },
  { id: "add",        label: "Add Student",     icon: PlusIcon },
  { id: "reports",    label: "Reports",         icon: ReportIcon },
];

function Dashboard({ setLoggedIn }) {
  const [active, setActive]       = useState("attendance");
  const [collapsed, setCollapsed] = useState(false);

  const pages = {
    attendance: <Attendance />,
    students:   <StudentList />,
    add:        <AddStudent />,
    reports:    <Reports />,
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>

        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="3" stroke="#9CD5FF" strokeWidth="1.8"/>
              <path d="M8 2v4M16 2v4" stroke="#9CD5FF" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M7 12h4M7 15.5h7" stroke="#7AAACE" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          {!collapsed && (
            <div className="sidebar-brand-text">
              <h1>Attendance</h1>
              <span>Management System</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item${active === id ? " active" : ""}`}
              onClick={() => setActive(id)}
            >
              <span className="nav-item-icon"><Icon active={active === id} /></span>
              {!collapsed && <span className="nav-item-label">{label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="btn-collapse" onClick={() => setCollapsed(!collapsed)}>
            <span>{collapsed ? "→" : "←"}</span>
            {!collapsed && <span>Collapse</span>}
          </button>
          <button className="btn-logout" onClick={() => setLoggedIn(false)}>
            <span>⏻</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <div className="page-header">
          <h2 className="page-title">{NAV.find(n => n.id === active)?.label}</h2>
          <p className="page-date">{today}</p>
        </div>
        {pages[active]}
      </main>
    </div>
  );
}

function CalendarIcon({ active }) {
  const c = active ? "#9CD5FF" : "#7AAACE";
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke={c} strokeWidth="1.8"/>
      <path d="M8 2v4M16 2v4" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M7 12h5" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function UsersIcon({ active }) {
  const c = active ? "#9CD5FF" : "#7AAACE";
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="4" stroke={c} strokeWidth="1.8"/>
      <path d="M3 21v-1a6 6 0 0 1 12 0v1" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.85" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function PlusIcon({ active }) {
  const c = active ? "#9CD5FF" : "#7AAACE";
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/>
      <path d="M12 8v8M8 12h8" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function ReportIcon({ active }) {
  const c = active ? "#9CD5FF" : "#7AAACE";
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="3" stroke={c} strokeWidth="1.8"/>
      <path d="M8 7h8M8 11h8M8 15h5" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export default Dashboard;