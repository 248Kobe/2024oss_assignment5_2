import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    gender: "",
    address: "",
    birthdate: "",
    email: "",
  });
  const [editCount, setEditCount] = useState(0);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const birthdateRef = useRef(null);
  const relationshipRef = useRef(null);
  const addressRef = useRef(null);
  const genderRef = useRef(null);

  useEffect(() => {
    const fetchFriend = () => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://672818b5270bd0b975545010.mockapi.io/api/v1/users1/${id}`
      );
      xhr.onload = () => {
        if (xhr.status === 200) {
          setFormData(JSON.parse(xhr.responseText));
        } else {
          alert("Failed to fetch friend details.");
        }
      };
      xhr.onerror = () => {
        alert("An error occurred while fetching friend details.");
      };
      xhr.send();
    };

    fetchFriend();
  }, [id]);

  const handleChange = (e) => {
    const { id: field, value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setEditCount((prev) => prev + 1);
  };

  const handleBlur = (e) => {
    const { id: field } = e.target;

    const xhr = new XMLHttpRequest();
    xhr.open(
      "PUT",
      `https://672818b5270bd0b975545010.mockapi.io/api/v1/users1/${id}`
    );
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert("Failed to update friend in the database.");
      }
    };
    xhr.onerror = () => {
      alert("An error occurred while updating the friend.");
    };
    xhr.send(JSON.stringify(formData));
  };

  const validateField = (field) => {
    // validation
    if (field === "name" && !formData.name.trim()) {
      alert("Name is required!");
      nameRef.current.focus();
      return false;
    }

    if (field === "email" && !formData.email.includes("@")) {
      alert("Please enter a valid email!");
      emailRef.current.focus();
      return false;
    }

    if (field === "phone" && !/^010-\d{4}-\d{4}$/.test(formData.phone)) {
      alert("Phone number must be in the format 010-0000-0000!");
      phoneRef.current.focus();
      return false;
    }

    if (
      field === "birthdate" &&
      !/^\d{4}-\d{2}-\d{2}$/.test(formData.birthdate)
    ) {
      alert("Birthdate must be in the format YYYY-MM-DD!");
      birthdateRef.current.focus();
      return false;
    }

    if (field === "relationship" && !formData.relationship.trim()) {
      alert("Relationship is required!");
      relationshipRef.current.focus();
      return false;
    }

    if (field === "address" && !formData.address.trim()) {
      alert("Address is required!");
      addressRef.current.focus();
      return false;
    }

    if (field === "gender" && !formData.gender.trim()) {
      alert("Gender is required!");
      genderRef.current.focus();
      return false;
    }

    return true;
  };

  const handleFieldBlur = (e) => {
    const { id: field } = e.target;

    if (validateField(field)) {
      handleBlur(e);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Update Friend</h1>
      <p>Total edits made: {editCount}</p>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name || ""}
            onChange={handleChange}
            onBlur={handleFieldBlur}
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
            value={formData.email || ""}
            onChange={handleChange}
            onBlur={handleFieldBlur}
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
            value={formData.phone || ""}
            onChange={handleChange}
            onBlur={handleFieldBlur}
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
            value={formData.birthdate || ""}
            onChange={handleChange}
            onBlur={handleFieldBlur}
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
            value={formData.relationship || ""}
            onChange={handleChange}
            onBlur={handleFieldBlur}
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
            value={formData.address || ""}
            onChange={handleChange}
            onBlur={handleFieldBlur}
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
            value={formData.gender || ""}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            ref={genderRef}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/list")}
        >
          Back to List
        </button>
      </form>
    </div>
  );
}

export default UpdatePage;
