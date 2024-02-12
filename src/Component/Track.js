import React, { useState } from "react";
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material/'
export default function Track({ tracks, remove }) {

  const [title, setTitle] = useState("Default Name1");
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title); // Temporary state for input value

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditValue(title); // Reset editValue to current title when starting to edit
  };

  const saveTitle = () => {
    setTitle(editValue); // Update title with the edited value
    setIsEditing(false); // Exit editing mode
  };

  const handleChange = (e) => {
    setEditValue(e.target.value); // Update editValue as the user types
  };
  return (
    <>

      <div className="main">
        <div className="flex items-center align-middle gap-4 border-b-4">
          {isEditing ? (
            <div>
              <input type="text" value={editValue} onChange={handleChange} />
              <div className="cursor-pointer" onClick={saveTitle}>
                <SaveIcon /> {/* Show save icon when in editing mode */}
              </div>
            </div>
          ) : (
            <div>
              <div>{title}</div>
              <div className="cursor-pointer" onClick={toggleEdit}>
                <EditIcon /> {/* Show edit icon when not in editing mode */}
              </div>
            </div>
          )}
        </div>
        <ul>
          {tracks.map((track) => (
            <li key={track.id}>
              <button onClick={() => remove(track)}> {/* Updated this line */}
                <div className="loader">
                  <div className="song">
                    <p className="name">{track.name}</p>
                    <p className="artist">{track.artists.map(artist => artist.name).join(', ')}</p>
                  </div>
                  {track.album.images.length > 0 && (
                    <div className="albumcover">
                      <img src={track.album.images[0].url} alt={track.name} />
                    </div>
                  )}
                  <div className="play"></div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
