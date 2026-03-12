import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Navbar, Modal, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Pending'); 
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', status: 'pending' });

  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/tasks'; 

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

   const handleLogout = () => {
    localStorage.removeItem('Token');
    navigate('/login');
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());

      setTasks(response.data.data || response.data); 
    } catch (error) {
      console.error("Gagal mengambil data tugas", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, []);

  const handleSave = async () => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.id}`, formData, getAuthHeaders());
      } else {
        // if(formData.dueDate < Date.now()) {
        //   alert("Tanggal jatuh tempo tidak boleh dalam waktu yang lalu!");
        //   return;
        // }
        await axios.post(API_URL, formData, getAuthHeaders());
      }
      
      fetchTasks(); 
      handleClose(); 
    } catch (error) {
      console.error("Gagal menyimpan data", error);
      alert("Gagal menyimpan tugas! \nError Message: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus tugas ini?')) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        fetchTasks(); 
      } catch (error) {
        console.error("Gagal menghapus data", error);
        alert("Gagal menghapus tugas!");
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({ title: '', description: '', dueDate: '', status: 'pending' });
  };

  const handleShowAdd = () => setShowModal(true);

  const handleShowEdit = (task) => {
    setFormData(task);
    setIsEditing(true);
    setShowModal(true);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="min-vh-100">
      <Navbar variant="dark" className="mb-4 px-3 shadow-sm d-flex justify-content-between" style={{ background: 'rgba(0,0,0,0.6)' }}>
        <Navbar.Brand>Task Management</Navbar.Brand>
        <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
      </Navbar>
     
      <Container className="rounded p-4 shadow-lg dashborad-container" >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <h2 className="mb-0 text-theme-light fw-bold">Tasks Dashboard</h2>
          
          <div className="d-flex gap-3">
            <ButtonGroup>
              <Button 
                variant={filter === 'all' ? 'dark' : 'outline-dark'} 
                onClick={() => setFilter('all')}
              >
                Semua
              </Button>
              <Button 
                variant={filter === 'Pending' ? 'dark' : 'outline-dark'} 
                onClick={() => setFilter('Pending')}
              >
                Pending
              </Button>
              <Button 
                variant={filter === 'Done' ? 'dark' : 'outline-dark'} 
                onClick={() => setFilter('Done')}
              >
                Done
              </Button>
            </ButtonGroup>

            <Button variant="light" className="text-primary fw-bold" onClick={handleShowAdd}>+ Tambah</Button>
          </div>
        </div>
        
        <Row>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <Col md={6} lg={4} key={task.id}>
                <TaskCard 
                  task={task} 
                  onEdit={handleShowEdit}
                  onDelete={handleDelete}
                />
              </Col>
            ))
          ) : (
            <Col className="text-center mt-5 text-muted">
              <p>Tidak ada tugas untuk kategori ini.</p>
            </Col>
          )}
        </Row>
      </Container>

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Ubah Tugas' : 'Tambah Tugas Baru'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Judul Tugas</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Masukkan judul" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={6} 
                placeholder="Detail tugas..." 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tenggat Waktu</Form.Label>
              <Form.Control 
                type="date" 
                value={formData.dueDate ? formData.dueDate.substring(0, 10) : ''}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </Form.Group>

            {isEditing && (
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Done">Completed / Done</option>
                </Form.Select>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Batal</Button>
          <Button variant="primary" onClick={handleSave}>Simpan</Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Form */}
    </div>
  );
};

export default Dashboard;