// src/components/RadioPlayer/RadioPlayer.jsx
import { useState, useRef, useEffect } from 'react';
import './RadioPlayer.css';

const RadioPlayer = ({ station, onVote }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (station) {
      // Reset player when station changes
      setIsPlaying(false);
      setError(null);
      
      // Use the url_resolved field if available, otherwise fall back to url
      const streamUrl = station.url_resolved || station.url;
      
      if (!streamUrl) {
        setError("Keine Stream-URL für diesen Sender verfügbar");
        return;
      }
      
      // Set up audio element
      audioRef.current.src = streamUrl;
      audioRef.current.volume = volume;
      
      // Auto-play if desired
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Fehler beim Abspielen:", err);
        setError("Dieser Sender kann nicht abgespielt werden. Bitte versuchen Sie einen anderen.");
        setIsPlaying(false);
      });
      
      // Fetch current track info if available
      if (station.now_playing) {
        setCurrentTrack(station.now_playing);
      }
    }
  }, [station]);

  const togglePlay = () => {
    if (!station) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setError(null);
      }).catch(err => {
        console.error("Fehler beim Abspielen:", err);
        setError("Dieser Sender kann nicht abgespielt werden.");
      });
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleAudioError = () => {
    setError("Fehler beim Abspielen des Streams. Bitte versuchen Sie einen anderen Sender.");
    setIsPlaying(false);
  };

  if (!station) {
    return <div className="radio-player empty">Wählen Sie einen Sender aus</div>;
  }

  return (
    <div className="radio-player">
      <audio 
        ref={audioRef} 
        onError={handleAudioError}
      />
      
      <div className="player-station-info">
        <div className="station-logo">
          {station.favicon && station.favicon !== "" ? (
            <img 
              src={station.favicon} 
              alt={station.name} 
              onError={(e) => {e.target.onerror = null; e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%234a6da7" d="M8 16h8V8H8v8zm4-11a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/></svg>';}}
            />
          ) : (
            <div className="default-logo">📻</div>
          )}
        </div>
        <div>
          <h3 className="station-name">{station.name}</h3>
          <p className="station-details">
            {station.country || 'Unbekanntes Land'} • {station.tags || 'Keine Tags'}
          </p>
          <p className="station-codec">
            {station.codec || '?'} • {station.bitrate || '?'} kbps
          </p>
        </div>
      </div>
      
      {error && (
        <div className="player-error">
          {error}
        </div>
      )}
      
      <div className="player-controls">
        <button 
          className={`play-button ${error ? 'disabled' : ''}`} 
          onClick={togglePlay}
          disabled={!!error}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <div className="volume-control">
          <span>🔈</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange} 
          />
          <span>🔊</span>
        </div>
      </div>
      
      {currentTrack && (
        <div className="current-track">
          <p>Aktueller Song: {currentTrack}</p>
        </div>
      )}
      
      <div className="voting-buttons">
        <button onClick={() => onVote(station.stationuuid, 'up')}>👍</button>
        <button onClick={() => onVote(station.stationuuid, 'down')}>👎</button>
      </div>
    </div>
  );
};

export default RadioPlayer;
