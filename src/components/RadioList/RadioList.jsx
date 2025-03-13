// src/components/RadioList/RadioList.jsx
import { useState } from 'react';
import './RadioList.css';

const RadioList = ({ stations, onStationSelect }) => {
  return (
    <div className="radio-list">
      {stations.length === 0 ? (
        <p className="no-results">Keine Sender gefunden. Bitte passen Sie Ihre Suche an.</p>
      ) : (
        <div className="stations-grid">
          {stations.map(station => (
            <div 
              key={station.stationuuid} 
              className="station-item"
              onClick={() => onStationSelect(station)}
            >
              <div className="station-logo">
                {station.favicon ? (
                  <img src={station.favicon} alt={station.name} />
                ) : (
                  <div className="default-logo">📻</div>
                )}
              </div>
              <div className="station-info">
                <h4 className="station-name">{station.name}</h4>
                <p className="station-details">
                  {station.country} • {station.tags}
                </p>
                <p className="station-codec">
                  {station.codec} • {station.bitrate} kbps
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadioList;
