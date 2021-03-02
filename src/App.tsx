import "./App.css";
import Player from './components/Player/Player';

import music from './data/music'


function App() {
  const songs = music

  return (
    <div className="App center">
      <Player 
        songs={songs}
      />

    </div>
  );
}

export default App;
