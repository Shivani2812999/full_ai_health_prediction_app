// import React from "react";
// import React, { useState } from "react";
import React, { useState, useEffect } from "react";


import "./Dashboard.css";
import api from "./api";
import {
  Users,
  Shield,
  AlertTriangle,
  Search,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Activity
} from "lucide-react";

function Dashboard() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [glucose, setGlucose] = useState("");
  const [haemoglobin, setHaemoglobin] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setDob("");
    setGlucose("");
    setHaemoglobin("");
    setCholesterol("");
    setEditingPatient(null);
  };

  const [editingPatient, setEditingPatient] =
    useState(null);
  // const patients = [
  //   {
  //     id: 1,
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     age: 33,
  //     dob: "Aug 10, 1992",
  //     glucose: 85,
  //     hb: 14.2,
  //     cholesterol: 180,
  //     status: "Healthy",
  //   },
  //   {
  //     id: 2,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     age: 41,
  //     dob: "Mar 15, 1985",
  //     glucose: 110,
  //     hb: 13.5,
  //     cholesterol: 215,
  //     status: "At Risk",
  //   },
  // ];

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const [patients, setPatients] = useState([]);

  const deletePatient = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/patients/${id}`);

      fetchPatients();

    } catch (error) {

      console.error(error);

    }
  };

  // const savePatient = async () => {
  //   try {
  //     const response = await api.post("/patients", {
  //       full_name: fullName,
  //       email: email,
  //       dob: dob,
  //       glucose: Number(glucose),
  //       haemoglobin: Number(haemoglobin),
  //       cholesterol: Number(cholesterol),
  //     });

  //     console.log(response.data);

  //     alert("Patient saved successfully");
  //     fetchPatients();

  //     if (editingPatient) {

  //       await api.put(
  //         `/patients/${editingPatient.id}`,
  //         payload
  //       );

  //     } else {

  //       await api.post(
  //         "/patients",
  //         payload
  //       );

  //     }


  //     setShowModal(false);
  //     setEditingPatient(null);

  //   } catch (error) {
  //     console.error(error);
  //     alert("Error saving patient");
  //   }
  // };


  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const savePatient = async () => {
    try {

      const payload = {
        full_name: fullName,
        email: email,
        dob: dob,
        glucose: Number(glucose),
        haemoglobin: Number(haemoglobin),
        cholesterol: Number(cholesterol),
      };

      if (editingPatient) {

        await api.put(
          `/patients/${editingPatient.id}`,
          payload
        );

        alert("Patient updated successfully");

      } else {

        await api.post(
          "/patients",
          payload
        );

        alert("Patient saved successfully");
      }

      fetchPatients();

      resetForm();

      setShowModal(false);

    } catch (error) {

      console.log(error.response?.data);
      console.error(error);

      alert("Error saving patient");
    }
  };

  return (
    <>
      <div className="dashboard-container">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <Activity size={22} />
            <div>
              <h3>Verdant</h3>
              <span>Health Records</span>
            </div>
          </div>

          <nav>
            <button className="menu active">
              <Users size={18} />
              Patients
            </button>

            <button className="menu">
              <Activity size={18} />
              Analytics
            </button>
          </nav>

          <button
            className="new-patient-btn"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            New Patient
          </button>
        </aside>

        {/* Main */}
        <main className="main-content">

          <div className="topbar">
            <div>
              <span className="dashboard-label">DASHBOARD</span>
              <h1>Patient health overview</h1>
            </div>

            <button
              className="add-btn"
              onClick={() => {
                console.log("clicked");
                setShowModal(true);
              }}
            >
              <Plus size={18} />
              New Patient
            </button>
          </div>

          {/* Cards */}
          <div className="cards">

            <div className="card ">
              <div className="card-header">
                <span>Total Patients</span>
                {/* <Users size={18} /> */}
                <div className="icon-circle">
                  <Users size={18} />
                </div>
              </div>
              <h2>{patients.length}</h2>
            </div>

            <div className="card">
              <div className="card-header">
                <span>Healthy</span>
                {/* <Shield size={18} /> */}
                <div className="icon-shield">
                  <Shield size={18} />
                </div>
              </div>
              <h2>
                {patients.filter(p => p.status === "Healthy").length}
              </h2>
            </div>

            <div className="card">
              <div className="card-header">
                <span>At Risk</span>

                <div className="icon-risk">
                  <AlertTriangle size={18} />
                </div>
              </div>
              <h2>
                {patients.filter(p => p.status === "At Risk").length}
              </h2>
            </div>

            <div className="card">
              <div className="card-header">
                <span>Critical</span>
                {/* <AlertTriangle size={18} /> */}
                <div className="icon-critical">
                  <AlertTriangle size={18} />
                </div>
              </div>
              <h2>
                {patients.filter(p => p.status === "Critical").length}
              </h2>
            </div>


            <div className="ai-card">
              <h4>AI-ASSISTED</h4>
              <p>
                Every record is automatically scored and explained
                using AI health analysis.
              </p>
              <small>
                Rule-based ranges + AI remarks
              </small>
            </div>

          </div>

          {/* Table */}
          <div className="table-container">

            <div className="table-header">

              <div>
                <h2>Patient Records</h2>
                <p>Lab values • AI remarks • Risk classification</p>
              </div>

              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search name or email"
                />
              </div>

            </div>

            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>DOB / AGE</th>
                  <th>Glucose</th>
                  <th>HB</th>
                  <th>Cholesterol</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {patients.map((patient) => (
                  <tr key={patient.id}>

                    <td>
                      <div className="patient-info">

                        <div className="avatar">
                          {patient.full_name.charAt(0)}
                        </div>

                        <div>
                          <strong>{patient.name}</strong>
                          <p>{patient.email}</p>
                        </div>

                      </div>
                    </td>

                    <td>
                      {patient.dob}
                      <p>{calculateAge(patient.dob)} yrs</p>
                    </td>

                    <td>{patient.glucose} mg/dL</td>
                    <td>{patient.haemoglobin} g/dL</td>
                    <td>{patient.cholesterol} mg/dL</td>

                    <td>
                      <span className={`badge ${patient.status?.toLowerCase().replace(/\s+/g, "-")}`}>
                        {patient.status}
                      </span>
                    </td>

                    <td>
                      <div className="actions">
                        <Eye
                          size={16}
                          onClick={() => setSelectedPatient(patient)}
                        />
                        {/* <Pencil size={16} />
                         */}

                        <Pencil
                          size={16}
                          onClick={() => {

                            setEditingPatient(patient);

                            setFullName(patient.full_name);

                            setEmail(patient.email);

                            setDob(patient.dob);

                            setGlucose(patient.glucose);

                            setHaemoglobin(patient.haemoglobin);

                            setCholesterol(patient.cholesterol);

                            setShowModal(true);

                          }}
                        />
                        <Trash2
                          size={16}
                          onClick={() => deletePatient(patient.id)}
                        />
                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>

          </div>

        </main>
      </div>

      {selectedPatient && (
        <div className="modal-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <h2>Patient Details</h2>

            <p><b>Name:</b> {selectedPatient.full_name}</p>
            <p><b>Email:</b> {selectedPatient.email}</p>
            <p><b>DOB:</b> {selectedPatient.dob}</p>

            <p><b>Glucose:</b> {selectedPatient.glucose}</p>
            <p><b>Haemoglobin:</b> {selectedPatient.haemoglobin}</p>
            <p><b>Cholesterol:</b> {selectedPatient.cholesterol}</p>

            <p><b>Status:</b> {selectedPatient.status}</p>
            <p><b>Remarks:</b> {selectedPatient.remarks}</p>

            <button onClick={() => setSelectedPatient(null)}>
              Close
            </button>

          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="patient-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2>New Patient</h2>

            <p className="modal-subtitle">
              Enter blood test values. AI remarks are generated
              automatically on save.
            </p>

            <div className="form-grid">

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Maria González"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Glucose</label>
                <input
                  type="number"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Hemoglobin</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="14.2"
                  value={haemoglobin}
                  onChange={(e) => setHaemoglobin(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Cholesterol</label>
                <input
                  type="number"
                  placeholder="180"
                  value={cholesterol}
                  onChange={(e) => setCholesterol(e.target.value)}
                />
              </div>

            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              {/* <button className="save-btn" onClick={savePatient}  >
                Save & Analyze
              </button> */}

              <button
                className="save-btn"
                onClick={savePatient}
              >
                {editingPatient
                  ? "Update Patient"
                  : "Save & Analyze"}
              </button>
            </div>

          </div>
        </div>
      )}

    </>
  );
}

export default Dashboard;