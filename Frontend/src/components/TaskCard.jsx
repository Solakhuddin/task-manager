import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';


const TaskCard = ({ task, onEdit, onDelete }) => {
  
  const badgeColor = task.status === 'Done' ? 'success' : task.status === 'Pending' ? 'warning' : 'secondary';
  
  return (
    <Card className="mb-4 shadow-lg glass-card" style={{ height: '220px' }}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 text-truncate" style={{ maxWidth: '70%', fontWeight: '600' }}>
            {task.title}
          </Card.Title>
          <Badge bg={badgeColor} className="px-2 py-1">{task.status}</Badge>
        </div>
        
        <Card.Text className="text-muted flex-grow-1 text-truncate-multiline" style={{ fontSize: '0.9rem' }}>
          {task.description}
        </Card.Text>
        
        <div className="mt-auto pt-3 border-top">
          <Card.Text style={{ fontSize: '0.85rem', fontWeight: '500' }} className="mb-2 text-dark">
            Tenggat Waktu: {task.dueDate ? task.dueDate.substring(0, 10) : '-'}
          </Card.Text>
          
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-primary" size="sm" onClick={() => onEdit(task)}>
              <FaEdit />
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(task.id)}>
              <FaTrash />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;