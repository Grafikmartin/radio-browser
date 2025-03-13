// src/components/SearchFilter/SearchFilter.jsx
import { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    name: '',
    country: '',
    language: '',
    tag: '',
    codec: '',
    minBitrate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="search-filter">
      <form onSubmit={handleSubmit}>
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="name">Sendername</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={filters.name} 
              onChange={handleChange} 
              placeholder="z.B. Radio Energy"
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="country">Land</label>
            <input 
              type="text" 
              id="country" 
              name="country" 
              value={filters.country} 
              onChange={handleChange} 
              placeholder="z.B. Germany"
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="language">Sprache</label>
            <input 
              type="text" 
              id="language" 
              name="language" 
              value={filters.language} 
              onChange={handleChange} 
              placeholder="z.B. german"
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="tag">Genre</label>
            <input 
              type="text" 
              id="tag" 
              name="tag" 
              value={filters.tag} 
              onChange={handleChange} 
              placeholder="z.B. rock"
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="codec">Codec</label>
            <select 
              id="codec" 
              name="codec" 
              value={filters.codec} 
              onChange={handleChange}
            >
              <option value="">Alle</option>
              <option value="MP3">MP3</option>
              <option value="AAC">AAC</option>
              <option value="OGG">OGG</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="minBitrate">Min. Bitrate (kbps)</label>
            <input 
              type="number" 
              id="minBitrate" 
              name="minBitrate" 
              value={filters.minBitrate} 
              onChange={handleChange} 
              placeholder="z.B. 128"
            />
          </div>
        </div>

        <button type="submit" className="search-button">Suchen</button>
      </form>
    </div>
  );
};

export default SearchFilter;
