'use client';

import React, { useRef, useEffect, useContext } from "react";
import "./musicPlayer.css";
import { PlaylistContext } from "../../contexts/PlaylistProvider";
import TrackBar from "./TrackBar";
import { playPauseHandler, getRandomTrack } from "../../helpers/player";
import TrackList from "./TrackList";
export default function NewMusicPlayer() {
  const {
    playlist,
    currentTrack,
    setCurrentTrack,
    setIsLoading,
    isPlaylistLoading,
    isPlaying,
    setIsPlaying,
    isShuffle,
    isRepeat,
    setCurrentTime,
    setDuration,
  } = useContext(PlaylistContext);

  //const audioRef = useRef(new Audio(playlist.tracks[currentTrack].src));
  const audioRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);

  /*
  useEffect(() => {
    // Preload all tracks
    playlist.tracks.forEach(track => {
      const audio = new Audio(track.src);
      audio.preload = "auto";
    });
  }, []);
  */

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsLoading(true);
    audio.src = playlist.tracks[currentTrack].src;
    audio.load();

    const handleCanPlayThrough = () => {
      setIsLoading(false);
      if (isPlayingRef.current) {
        audio
          .play()
          .then(() => console.log("Playback started successfully"))
          .catch((err) => console.warn("Playback retry needed", err));
      }
    };

    const handleError = () => {
      console.warn("Error loading track. Retrying in 2 seconds...");

      audio.load();

      setTimeout(() => {
        if (isPlayingRef.current) audio.play().catch(() => {});
      }, 2000);
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const loadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loadedMetadata);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loadedMetadata);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    const trackEnded = () => {
      let nextTrack;

      if (isRepeat) {
        nextTrack = currentTrack;
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .catch((err) => console.warn("Playback failed:", err));
      } else if (isShuffle) {
        nextTrack = getRandomTrack(currentTrack, playlist.tracks.length);
      } else {

        if (currentTrack === playlist.tracks.length - 1) {
          nextTrack = 0;
        } else {
          nextTrack = currentTrack + 1;
        }
      }
      setCurrentTrack(nextTrack);
    };

    audio.addEventListener("ended", trackEnded);

    return () => {
      audio.removeEventListener("ended", trackEnded);
    };
  }, [isShuffle, isRepeat, currentTrack]);

  return (
    <>
      <audio
        ref={audioRef}
        src={playlist.tracks[currentTrack].src}
        preload="auto"
      />

      <TrackBar audioRef={audioRef} />

      <div className="musicplayer_playlist flex w-full">
        <div className="musicplayer_playlist_image">
          <img
            src={playlist.image}
            alt="Description"
            className="w-full object-cover"
          />
        </div>

        <div className="musicplayer_playlist_data flex-grow text-left">
          <h2 className="uppercase">Made for {playlist.owner}</h2>
          <h1>{playlist.title}</h1>
          <h3>{playlist.description}</h3>
          <div>
            {playlist.artists.map((artist, index) => (
              <span key={index} className="">
                {artist}
              </span>
            ))}
          </div>
          <button
            onClick={playPauseHandler(audioRef, isPlaying, setIsPlaying)}
            className="bg-green-500 text-white my-2 px-6 py-1 rounded-full hover:bg-green-600 transition"
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>
        </div>
      </div>

      <TrackList playlist={playlist} />
    </>
  );
}
