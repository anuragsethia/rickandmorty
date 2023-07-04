import React, { useState } from 'react';
import _get from 'lodash/get';
import Modal from 'react-modal';

const LocationInfoModal = ({ character, location }) => {
  const [showLocationInfo, setShowLocationInfo] = useState(false);

  const handleLocationInfoOpen = () => {
    setShowLocationInfo(true);
  };

  const handleLocationInfoClose = () => {
    setShowLocationInfo(false);
  };

  return (
    <>
      <button className='btn btn-primary my-3 mx-2' onClick={handleLocationInfoOpen}>
        Location Info
      </button>
      <Modal
        isOpen={showLocationInfo}
        onRequestClose={handleLocationInfoClose}
        contentLabel="Location Details"
      >
        {showLocationInfo && (
          <>
            <div className="location-info">
              <h3>{character.name}</h3>
              <h6>Origin:</h6>
              <p>{character.origin.name || 'Unknown'}</p>
              <h6>Location:</h6>
              <p>{character.location.name || 'Unknown'}</p>
              <h6>Dimension:</h6>
              <p>{location.dimension || 'Unknown'}</p>
              <h6>Residents:</h6>
              <p>{location.residents?.length || 'Unknown'}</p>
            </div>
          </>
        )}
        <button className="btn btn-secondary my-3" onClick={handleLocationInfoClose}>
          Close
        </button>
      </Modal>
    </>
  );
};

const EpisodesModal = ({ character, episodes }) => {
  const [showEpisodes, setShowEpisodes] = useState(false);

  const handleShowEpisodes = () => {
    setShowEpisodes(!showEpisodes);
  };

  const handleCloseEpisodes = () => {
    setShowEpisodes(false);
  };

  return (
    <>
      <button className="btn btn-primary my-3" onClick={handleShowEpisodes}>
        Appeared in Episodes
      </button>
      <Modal
        isOpen={showEpisodes}
        onRequestClose={handleCloseEpisodes}
        contentLabel="Episode Details"
      >
        {showEpisodes && (
          <>
            <div className="episodes">
              <table className="table table-hover table-responsive mx-auto">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Episode Name</th>
                    <th>Episode Code</th>
                    <th>Air Date</th>
                  </tr>
                </thead>
                <tbody>
                  {character.episode.map((episode, index) => {
                    const episodeName = _get(episodes, [episode.split("/").pop(), 'name'], 'NA');
                    const episodeCode = _get(episodes, [episode.split("/").pop(), 'episode'], 'NA');
                    const airDate = _get(episodes, [episode.split("/").pop(), 'air_date'], 'NA');

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{episodeName}</td>
                        <td>{episodeCode}</td>
                        <td>{airDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        <button className="btn btn-secondary" onClick={handleCloseEpisodes}>
          Close
        </button>
      </Modal>
    </>
  );
};

export const DisplayCard = ({ character, location, episodes }) => {
  return (
    <div className="col">
      <div className="card" style={{ backgroundColor: 'secondary' }}>
        <img src={character.image} className="card-img-top" alt={character.name} />
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h5>
                {character.name || 'UNKNOWN'}
                <p className='my-2'>
                  {character.status === 'Alive' && (
                    <span className="badge bg-success">Alive</span>
                  )}
                  {character.status === 'Dead' && (
                    <span className="badge bg-danger">Dead</span>
                  )}
                  {character.status === 'unknown' && (
                    <span className="badge bg-secondary">Unknown</span>
                  )}
                </p>
              </h5>
            </li>
            <li className="list-group-item">
              <p>
                <strong>Species:</strong> {character.species || 'UNKNOWN'}
              </p>
            </li>
            <li className="list-group-item">
              <p>
                <strong>Gender:</strong> {character.gender || 'UNKNOWN'}
              </p>
            </li>
          </ul>

          <LocationInfoModal character={character} location={location} />
          <EpisodesModal character={character} episodes={episodes} />
        </div>
      </div>
    </div>
  );
};