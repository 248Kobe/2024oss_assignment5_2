import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListPage() {
  const [friends, setFriends] = useState([]);

  // Fetch friends using XMLHttpRequest
  const getFriends = () => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://672818b5270bd0b975545010.mockapi.io/api/v1/users1/"
    );
    xhr.onload = () => {
      if (xhr.status === 200) {
        setFriends(JSON.parse(xhr.responseText));
      } else {
        console.error("Failed to fetch friends.");
      }
    };
    xhr.onerror = () => {
      console.error("Error fetching friends.");
    };
    xhr.send();
  };

  // Delete friend using XMLHttpRequest
  const deleteFriend = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "DELETE",
        `https://672818b5270bd0b975545010.mockapi.io/api/v1/users1/${id}`
      );
      xhr.onload = () => {
        if (xhr.status === 200) {
          alert("Friend deleted successfully!");
          getFriends(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete friend.");
        }
      };
      xhr.onerror = () => {
        console.error("Error deleting friend.");
      };
      xhr.send();
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Friend List</h1>
      <Link to="/create" className="btn btn-primary mb-3">
        + Add Friend
      </Link>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Birthdate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {friends.length > 0 ? (
              friends.map((friend) => (
                <tr key={friend.id}>
                  <td>{friend.name}</td>
                  <td>{friend.relationship}</td>
                  <td>{friend.phone}</td>
                  <td>{friend.gender}</td>
                  <td>{friend.birthdate}</td>
                  <td>
                    <Link
                      to={`/detail/${friend.id}`}
                      className="btn btn-secondary btn-sm me-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/update/${friend.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteFriend(friend.id, friend.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No friends to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
