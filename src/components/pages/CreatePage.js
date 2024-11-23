import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    gender: "",
    address: "",
    birthdate: "",
    email: "",
  });

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const birthdateRef = useRef(null);
  const emailRef = useRef(null);
  const relationshipRef = useRef(null);
  const addressRef = useRef(null);
  const genderRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation checks
    if (!formData.name.trim()) {
      alert("Name is required!");
      nameRef.current.focus();
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email!");
      emailRef.current.focus();
      return;
    }

    if (!/^010-\d{4}-\d{4}$/.test(formData.phone)) {
      alert("Phone number must be in the format 010-0000-0000!");
      phoneRef.current.focus();
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.birthdate)) {
      alert("Birthdate must be in the format YYYY-MM-DD!");
      birthdateRef.current.focus();
      return;
    }

    if (!formData.relationship.trim()) {
      alert("Relationship is required!");
      relationshipRef.current.focus();
      return;
    }

    if (!formData.address.trim()) {
      alert("Address is required!");
      addressRef.current.focus();
      return;
    }

    if (!formData.gender.trim()) {
      alert("Gender is required!");
      genderRef.current.focus();
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://672818b5270bd0b975545010.mockapi.io/api/v1/users1/"
    );
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = () => {
      if (xhr.status === 201) {
        alert("Friend added successfully!");
        navigate("/list");
      } else {
        alert("Failed to add friend.");
      }
    };
    xhr.onerror = () => {
      alert("An error occurred while adding the friend.");
    };
    xhr.send(JSON.stringify(formData));
  };

  return (
    <div className="container mt-4">
      <h1>Add Friend</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
            ref={nameRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
            ref={emailRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            ref={phoneRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="birthdate" className="form-label">
            Birthdate
          </label>
          <input
            type="text"
            className="form-control"
            id="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            ref={birthdateRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="relationship" className="form-label">
            Relationship
          </label>
          <input
            type="text"
            className="form-control"
            id="relationship"
            value={formData.relationship}
            onChange={handleChange}
            ref={relationshipRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={formData.address}
            onChange={handleChange}
            ref={addressRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-control"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            ref={genderRef}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/list")}
          >
            Back to List
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePage;
