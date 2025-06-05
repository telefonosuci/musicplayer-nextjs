'use client';

import { useEffect, useRef } from 'react';

export default function DashPlayer() {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadShaka = async () => {
      const shaka = await import('shaka-player/dist/shaka-player.compiled.js');

      if (shaka.Player.isBrowserSupported()) {
        const player = new shaka.Player(videoRef.current);

        player.addEventListener('error', (e) => {
          console.error('Shaka error', e);
        });

        // File MPD di test MPEG-DASH
        await player.load('https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd');
      } else {
        console.error('Shaka Player non supportato nel browser');
      }
    };

    loadShaka();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <h2 className="text-white text-2xl mb-4">Test MPEG-DASH Player</h2>
      <video
        ref={videoRef}
        className="w-full max-w-3xl rounded"
        controls
        autoPlay
      />
    </div>
  );
}
