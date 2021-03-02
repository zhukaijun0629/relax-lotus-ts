import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import "./Player.css";
import { Song } from "../Models/songs.model";
import { ChannelListMenu } from "./ChannelListMenu";
import { DiskImage } from "./DiskImage";
import { SoundTracksControl } from "./SoundTracksControl";


interface PlayerProps {
  songs: Song[];
}

const Player: React.FC<PlayerProps> = ({ songs }) => {


  // useState
  const [channelId, setChannelId] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const channels = useRef(songs.map((song) => song.src));

  // define Song track using HowlerJS
  useEffect(() => {
    let song: Howl | undefined;
    if (isPlaying) {
      song = new Howl({
        src: [channels.current[channelId]],
        html5: true,
        loop: true,
        volume: 1,
        onunlock: () => {
          if (song && !song.playing()) {
            song.play();
          }
        },
      });
      if (!song.playing()) {
        song.play();
        song.fade(0, 1, 2000);
      }
    }

    return () => {
      if (song && song.playing()) {
        song.fade(1, 0, 500);
        song.once("fade", () => {
          if (song) song.unload();
        });
      } else if (song) {
        song.unload();
      }
    };
  }, [channelId, isPlaying]);



  // a play/stop button for global control
  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };



  const handleSelectChannel = (index: number) => {
    setChannelId(() => index);
  };



  //return player
  return (
    <div className="player">
      <DiskImage isPlaying={isPlaying} onClickPlay={handlePlay} />

      <ChannelListMenu
        onSelectChannel={handleSelectChannel}
        channels_src={channels.current}
        channelId={channelId}
      />

      <SoundTracksControl />
    </div>
  );
};

export default Player;
