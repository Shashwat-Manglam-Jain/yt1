import React, { useEffect, useState } from 'react';
import Search from './Search';

const url = 'https://yt-api.p.rapidapi.com/trending?geo=US';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '63c51fc540mshcb9f35603f6f2aep1ae95cjsnf569e911d906',
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
  },
};

const Thumbnail = () => {
  const [videos, setVideos] = useState([]);
  const [openVideo, setOpenVideo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setVideos(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleToggleAccordion = (index) => {
    if (openVideo === index) {
      setOpenVideo(null);
    } else {
      setOpenVideo(index);
    }
  };

  return (
    <div
      style={{
        zIndex: '1',
        background: 'white',
        color: 'black',
        position: 'relative',
        top: '10rem',
        left: '2rem',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto', // Automatically adjust columns
          gap: '40px',
        }}
      >
        {videos.map((video, index) => (
          <div key={index}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0`}
              frameBorder="0"
              allowFullScreen
              scrolling="no"
            ></iframe>
            <p>
              <h2 style={{width:"37vw"}}>{video.title}</h2>
            </p>
            <p>
              <h2>
                {video.channelTitle} ☑
                <span style={{ marginLeft: '17rem', fontSize: '1rem', color: 'gray' }}>
                  {video.viewCount} views
                </span>
              </h2>
            </p>
            <button onClick={() => handleToggleAccordion(index)}>Description ⬇</button>
            {openVideo === index && (
              <div>
                <h4>{video.description}</h4>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
