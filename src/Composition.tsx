import { useRef, useEffect, useState } from 'react';
import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { AsciinemaPlayer, create as createPlayer } from 'asciinema-player';

import 'asciinema-player/dist/bundle/asciinema-player.css';

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<AsciinemaPlayer>();

  useEffect(() => {
    if (playerRef.current) {
      const player = createPlayer(
        staticFile('/demo.cast'),
        playerRef.current,
        {
          autoPlay: true,
          fit: 'both',
          rows: 20,
          cols: 100,
        }
      );
      setPlayer(player);
    }
  }, [playerRef]);

  useEffect(() => {
    if (player) {
      const time = frame / fps;
      player.seek(time);
    }
  }, [frame, fps, player]);
 
  const opacity = Math.min(1, frame / 60);
  return (
    <AbsoluteFill className="player-container items-center justify-center">
      <div ref={playerRef} id="player" />
      <div style={{ opacity: opacity }}>Hello World!</div>
    </AbsoluteFill>
  );
};
