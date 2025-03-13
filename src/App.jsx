// src/App.jsx
import { useState, useEffect } from 'react';
import Card from './components/Card/Card';
import SearchFilter from './components/SearchFilter/SearchFilter';
import RadioList from './components/RadioList/RadioList';
import RadioPlayer from './components/RadioPlayer/RadioPlayer';
import { radioApi } from './services/radioApi';
import './App.css';

function App() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lade beliebte Sender beim Start
  useEffect(() => {
    loadPopularStations();
  }, []);

  const loadPopularStations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await radioApi.getPopularStations(20);
      setStations(data);
    } catch (err) {
      setError('Fehler beim Laden der beliebten Sender');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadRandomStations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await radioApi.getRandomStations(20);
      setStations(data);
    } catch (err) {
      setError('Fehler beim Laden zufälliger Sender');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await radioApi.searchStations(filters);
      setStations(data);
    } catch (err) {
      setError('Fehler bei der Suche');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStationSelect = (station) => {
    setSelectedStation(station);
  };

  const handleVote = async (stationId, voteType) => {
    try {
      await radioApi.voteStation(stationId, voteType);
      // Optional: Show success message
    } catch (err) {
      console.error('Fehler beim Bewerten:', err);
      // Optional: Show error message
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Radio Browser</h1>
        <p>Entdecke und höre Radiosender aus aller Welt</p>
      </header>

      <div className="background-container">
        <main className="app-content">
          <div className="cards-container">
            <Card title="Suche & Filter" icon="🔍">
              <SearchFilter onSearch={handleSearch} />
            </Card>

            <Card title="Beliebte Sender" icon="🏆">
              <div className="card-actions">
                <button onClick={loadPopularStations}>Beliebte Sender laden</button>
              </div>
            </Card>

            <Card title="Zufällige Sender" icon="🎲">
              <div className="card-actions">
                <button onClick={loadRandomStations}>Zufällige Sender laden</button>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {loading && <div className="loading">Lädt...</div>}
      {error && <div className="error">{error}</div>}

      {selectedStation && (
        <div className="player-container">
          <RadioPlayer 
            station={selectedStation} 
            onVote={handleVote} 
          />
        </div>
      )}

      <div className="stations-container">
        <h2>Radiosender ({stations.length})</h2>
        <RadioList 
          stations={stations} 
          onStationSelect={handleStationSelect} 
        />
      </div>

      <footer className="app-footer">
        <p>Powered by Radio Browser API</p>
      </footer>
    </div>
  );
}

export default App;
