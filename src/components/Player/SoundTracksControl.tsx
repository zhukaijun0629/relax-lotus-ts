import React, {useState, useRef} from "react";
import { Button } from "@material-ui/core";
import Slider from "rc-slider";
import cloneDeep from "lodash/cloneDeep";
import { Howl } from "howler";
import "rc-slider/assets/index.css";

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage


interface SoundTracksControlProps {
}

export const SoundTracksControl: React.FC<SoundTracksControlProps> = () => {
  const [volume, setVolume] = useState(33)
  const [soundId, setSoundId] = useState<{ [key: string]: number }>({
    ocean: 0,
    fire: 0,
    forest: 0,
    rain: 0,
    cafe: 0,
  });


  // styles
  const style = {
    maxWidth: 500,
    margin: "auto",
    display: "flex",
    alignItems: "center",
    width: "80%",
  };

  const soundButtonStyle = {
    borderRadius: "50%",
    height: "60px",
    width: "60px",
    margin: "10px",
  };

  // define Sound track using HowlerJS
  // using useRef since the sound track won't change
  const sounds = useRef(
    new Howl({
      src: [
        `${PUBLIC_URL}/music/secondary/background.webm`,
        `${PUBLIC_URL}/music/secondary/background.mp3`,
      ],
      sprite: {
        ocean: [175000, 75257.36961451247, true],
        fire: [53000, 60000, true],
        forest: [114000, 60000, true],
        rain: [252000, 60000, true],
        cafe: [0, 51577.00680272109, true],
      },
      volume: volume / 100,
    })
  );

  // define Sound select botton handler
  const handlePlaySound = (type: string) => {
    if (type === "none") {
      setSoundId((soundId) => {
        const new_soundId: { [key: string]: number } = cloneDeep(soundId);
        Object.keys(new_soundId).map((type) => {
          if (new_soundId[type] !== 0) {
            handlePlaySound(type);
          }
          return true;
        });
        return new_soundId;
      });
    } else if (soundId[type] !== 0) {
      sounds.current.fade(volume / 100, 0, 1000, soundId[type]);
      sounds.current.once(
        "fade",
        () => {
          sounds.current.stop(soundId[type]);
        },
        soundId[type]
      );
      setSoundId((soundId) => {
        const new_soundId = cloneDeep(soundId);
        new_soundId[type] = 0;
        return new_soundId;
      });
    } else {
      const id = sounds.current.play(type);
      sounds.current.fade(0, volume / 100, 1000, id);
      setSoundId((soundId) => {
        const new_soundId = cloneDeep(soundId);
        new_soundId[type] = id;
        return new_soundId;
      });
    }
  };

    // define Sound volume change handler
    const handleVolumeChange = (volume: number) => {
      setVolume(volume);
      sounds.current.volume(volume / 100);
    };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={soundButtonStyle}
        key={"sound-reset"}
        className={"sound-reset-button"}
        onClick={() => handlePlaySound("none")}
      >
        None
      </Button>
      {Object.keys(soundId).map((type) => (
        <Button
          variant="contained"
          color="primary"
          style={soundButtonStyle}
          key={type}
          className={`sound-button ${soundId[type] === 0 ? "" : "active"}`}
          onClick={() => handlePlaySound(type)}
        >
          {type}
        </Button>
      ))}
      <br />
      <br />

      {Object.values(soundId).reduce((a, b) => a + b) !== 0 && (
        <div style={style}>
          <Slider onChange={handleVolumeChange} defaultValue={volume} />
        </div>
      )}
    </div>
  );
};
