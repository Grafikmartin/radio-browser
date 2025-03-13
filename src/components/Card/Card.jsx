// src/components/Card/Card.jsx
import { useState } from 'react';
import './Card.css';

const Card = ({ title, icon, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`card ${expanded ? 'expanded' : ''}`}>
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <div className="card-icon">{icon}</div>
        <h3 className="card-title">{title}</h3>
      </div>
      {expanded && <div className="card-content" onClick={(e) => e.stopPropagation()}>{children}</div>}
    </div>
  );
};

export default Card;
