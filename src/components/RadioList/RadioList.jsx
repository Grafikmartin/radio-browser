// src/components/RadioList/RadioList.jsx
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
                  <img 
                    src={station.favicon} 
                    alt={station.name} 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%234a6da7" d="M8 16h8V8H8v8zm4-11a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/></svg>';
                    }}
                  />
                ) : (
                  <div className="default-logo">📻</div>
                )}
              </div>
              <div className="station-info">
                <h4 className="station-name">{station.name}</h4>
                <p className="station-details">
                  {station.country || 'Unbekannt'} • {station.tags || 'Keine Tags'}
                </p>
                <p className="station-codec">
                  {station.codec || '?'} • {station.bitrate || '?'} kbps
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
