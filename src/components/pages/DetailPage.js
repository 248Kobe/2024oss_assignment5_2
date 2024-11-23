import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://672818b5270bd0b975545010.mockapi.io/api/v1/users1/${id}`
    );
    xhr.onload = () => {
      if (xhr.status === 200) {
        setFriend(JSON.parse(xhr.responseText));
      } else {
        alert("Failed to fetch friend details.");
      }
    };
    xhr.onerror = () => {
      alert("An error occurred while fetching the friend details.");
    };
    xhr.send();
  }, [id]);

  if (!friend) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h1>Friend Details</h1>
      <ul>
        <li>Name: {friend.name}</li>
        <li>Relationship: {friend.relationship}</li>
        <li>Phone: {friend.phone}</li>
        <li>Gender: {friend.gender}</li>
        <li>Address: {friend.address}</li>
        <li>Birthdate: {friend.birthdate}</li>
        <li>Email: {friend.email}</li>
      </ul>
      <div className="mt-3">
        <Link to="/list" className="btn btn-secondary me-3">
          Back to List
        </Link>
        <button
          className="btn btn-info"
          onClick={() => navigate(`/update/${id}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
