import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col,Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUndo, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
const EditUser = ({ user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
  <Modal.Header closeButton>
    <Modal.Title>Edit User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="first_name">
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={editedUser.first_name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="last_name">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          value={editedUser.last_name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="gender">
        <Form.Label>Gender:</Form.Label>
        <Form.Control
          as="select"
          name="gender"
          value={editedUser.gender}
          onChange={handleInputChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="dob">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control
          type="type"
          name="dob"
          value={editedUser.dob}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="country">
        <Form.Label>Country:</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={editedUser.country}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="state">
        <Form.Label>State:</Form.Label>
        <Form.Control
          type="text"
          name="state"
          value={editedUser.state}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label>City:</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={editedUser.city}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="zip">
        <Form.Label>ZIP Code:</Form.Label>
        <Form.Control
          type="text"
          name="zip"
          value={editedUser.zip}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={editedUser.password}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer className="justify-content-center">
    <Button variant="primary" onClick={handleSubmit}>
      Save
    </Button>
  </Modal.Footer>
</Modal>


  );
};

const UserList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
const [resetPasswordUser, setResetPasswordUser] = useState(null);
const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    axios.get('https://simple-app-ari4.onrender.com/allusers') 
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleEdit = (user) => {
    console.log('Edit user:', user);
    setEditUser(user);
  };

  const handleSaveEdit = (editedUser) => {
    console.log('Save edited user:', editedUser);
    const apiUrl = `https://simple-app-ari4.onrender.com/updateuser/${editedUser.id}`;
    axios.put(apiUrl, editedUser)
      .then(response => {
        console.log('User updated successfully:', response.data);
        alert('User details updated successfully');
        setUsers(users.map(u => (u.id === editedUser.id ? response.data : u)));
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  
  };
  const handleDelete = (user) => {
    console.log('Delete user:', user);
    axios.delete(`https://simple-app-ari4.onrender.com/deleteuser/${user.id}`) 
      .then(response => {
        console.log('User deleted successfully:', user);
        alert('User deleted successfully');
        setUsers(users.filter(u => u.id !== user.id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleResetPassword = (user) => {
    console.log('Reset password for user:', user);
  setResetPasswordUser(user);
  setShowResetPasswordModal(true);
  };
  const handleResetPasswordSubmit = () => {
    console.log('Reset password for user:', resetPasswordUser);
    if (!newPassword) {
      console.error('New password cannot be empty');
      return;
    }
    const apiUrl = `https://simple-app-ari4.onrender.com/updatepassword/${resetPasswordUser.id}`;
    axios
      .put(apiUrl, { password: newPassword })
      .then((response) => {
        console.log('Password updated successfully:', response.data);
        setShowResetPasswordModal(false);
        setNewPassword(''); 
        alert('User Password updated successfully');

      })
      .catch((error) => {
        console.error('Error updating password:', error);
      });
  };

  const handleSignUpClick = () => {
    navigate('/registration');
  };

  return (
    <div className="container mt-4">
      <Modal show={showResetPasswordModal} onHide={() => setShowResetPasswordModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Reset Password</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group controlId="newPassword">
      <Form.Label>New Password:</Form.Label>
      <Form.Control
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer className="justify-content-center">
    <Button variant="primary" onClick={() => handleResetPasswordSubmit(resetPasswordUser)}>
      Save
    </Button>
  </Modal.Footer>
</Modal>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <span style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => handleEdit(user)}>
                  <FontAwesomeIcon icon={faEdit} />
                </span>
                <span style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => handleResetPassword(user)}>
                  <FontAwesomeIcon icon={faUndo} />
                </span>
                <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(user)}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && (
        <EditUser user={editUser} onClose={() => setEditUser(null)} onSave={handleSaveEdit} />
      )}

  <Row>
    <Col md='9'>
  <nav aria-label="Page navigation">
    <ul className="pagination">
      {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
          <span className="page-link" onClick={() => paginate(index + 1)}>
            {index + 1}
          </span>
        </li>
      ))}
    </ul>
  </nav>
  </Col>
  <Col>
  <Button variant="primary" type="submit" className="mt-0" onClick={handleSignUpClick}>
        Sign up
      </Button>
  </Col>
  </Row>

    </div>
    
  );
};

export default UserList;
