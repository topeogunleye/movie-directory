import React, { useState } from 'react';
import Error  from './Error';

function Movieform(prop) {

  const [message, setMessage] = useState('');
  const [inputText, setInputText] = useState({
    movie: '',
    duration: '',
    ratings: '',
  })

  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
    setMessage('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputText.duration.match(/^[0-9]+(\.[0-9]+)?[h|m]$/) && inputText.ratings.match(/^[0-9]+(\.[0-9]+)?$/)) {

      // If all the input fields are filled with a valid value, a new movie should be added to the list.
      // If the duration is entered in minutes, it must be converted to hours. For example, 90m should be converted and displayed as '1.5 Hrs'.
      
      const newMovie = {
        movie: inputText.movie,
        duration:`${parseFloat(inputText.duration) / 60} Hrs`,
        ratings: inputText.ratings,
      };

      prop.addMovieToList(newMovie);

      setMessage('');
      setInputText({
        movie: '',
        duration: '',
        ratings: '',
      });
    } else {
      setMessage('Please enter a valid duration format (e.g. 2.5h or 150m)');
      return;
    }

  };

  return (
    <section>
      <div className="card pa-30">
        <form onSubmit={handleSubmit}>
          <div className="layout-column mb-15">
            <label htmlFor="name" className="mb-3">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Movie Name"
              data-testid="nameInput"
              name="movie"
              onChange={onChange}
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="ratings" className="mb-3">
              Ratings
            </label>
            <input
              type="number"
              id="ratings"
              placeholder="Enter Rating on a scale of 1 to 100"
              data-testid="ratingsInput"
              name="ratings"
              onChange={onChange}
            />
          </div>
          <div className="layout-column mb-30">
            <label htmlFor="duration" className="mb-3">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              placeholder="Enter duration in hours or minutes"
              data-testid="durationInput"
              name="duration"
              onChange={onChange}
            />
          </div>
          {/* Use this div when time format is invalid */}
          {/* <div 
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div>  */}
          <div className="layout-row justify-content-end">
            <button type="submit" className="mx-0" data-testid="addButton">
              Add Movie
            </button>
          </div>
        </form>
        <Error message={message}/>
      </div>
    </section>
  );
}

export default Movieform;
