'use client';

import React, { createContext, useState, useEffect } from "react";

// Creiamo il contesto
export const PlaylistContext = createContext();

/* Creiamo un provider che gestisce lo stato */
export const PlaylistProvider = ({ children, initialPlaylist }) => {

  const API_URL = "https://dummyjson.com/c/b586-68bf-4962-a335";

  const [playlist, setPlaylist] = useState(initialPlaylist || {
    title: "",
    description: "",
    owner: "",
    image: "",
    artists: [],
    tracks: [],
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaylistLoading, setPlaylistLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch playlist");
        const data = await response.json();
        setPlaylist(data);
        setPlaylistLoading(false);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setPlaylistLoading(false);
      }
    };

    fetchPlaylist();
  }, [initialPlaylist]);

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        setPlaylist,
        currentTrack,
        setCurrentTrack,
        isLoading,
        setIsLoading,
        isPlaylistLoading,
        setPlaylistLoading,
        isPlaying,
        setIsPlaying,
        isShuffle,
        setIsShuffle,
        isRepeat,
        setIsRepeat,
        currentTime,
        setCurrentTime,
        isMuted,
        setIsMuted,
        volume,
        setVolume,
        duration,
        setDuration,
        error,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
