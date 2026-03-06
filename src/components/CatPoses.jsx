import { useState, useEffect, useRef } from 'react';

/**
 * Spritesheet-based pixel cat using cat 1.6 (orange tabby).
 * Spritesheet: 352x1696 px → 32x32 grid = 11 cols x 53 rows.
 *
 * Each sprite frame is 32x32 pixels.
 * Displayed scaled up to `size` (default 64px) with pixelated rendering.
 */

const SPRITE_SIZE = 32;
const SHEET_URL = '/cat-spritesheet.png';
const SHEET_COLS = 11;

/**
 * Single sprite frame from the spritesheet.
 */
function SpriteFrame({ col, row, size = 64 }) {
  const scale = size / SPRITE_SIZE;
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${SHEET_URL})`,
        backgroundPosition: `-${col * SPRITE_SIZE * scale}px -${row * SPRITE_SIZE * scale}px`,
        backgroundSize: `${SHEET_COLS * size}px auto`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  );
}

/**
 * Animated sprite — cycles through an array of [col, row] frames.
 */
function AnimatedSprite({ frames, fps = 4, size = 64 }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (frames.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 1000 / fps);
    return () => clearInterval(intervalRef.current);
  }, [frames, fps]);

  const [col, row] = frames[frameIndex] || frames[0];
  return <SpriteFrame col={col} row={row} size={size} />;
}

/*
 * ============================
 * FRAME MAPS — [col, row] in 32x32 grid (11 cols x 53 rows)
 * ============================
 *
 * From the labeled reference (cat 16x16 with text.png):
 * Note: "16x16" in the filename is misleading — the actual sprites
 * occupy 32x32 cells on this sheet.
 *
 * REST section (rows 0-5):
 *   Row 0: sitting/idle facing various dirs — 6 frames
 *   Row 1: standing/facing variants — 7 frames
 *   Row 2: lying down side — 5 frames
 *   Row 3: lying stretched + long body variants (many frames)
 *   Row 4: compact sit — 3 frames
 *   Row 5: sit variants — 4 frames
 *
 * WALK section (rows 4-11, corrected):
 *   Row 4: walk down — ~5 frames
 *   Row 5: walk up — ~5 frames
 *   Row 6: walk right — 8 frames
 *   Row 7: walk left — 8 frames
 *   Row 8: walk left-down — ~6 frames
 *   Row 9: walk right-down — ~6 frames
 *   Row 10: walk right-up — ~5 frames
 *   Row 11: walk left-up — ~5 frames
 *
 * SLEEP (rows 14-21):
 *   Row 14: sleep 1 (l) — 2 frames
 *   Row 15: sleep 1 (r) — 2 frames
 *   Row 16: sleep 2 (l) — 2 frames
 *   Row 17: sleep 2 (r) — 2 frames
 *   Row 18: sleep 3 (l) — 2 frames
 *   Row 19: sleep 3 (r) — 2 frames
 *   Row 20: sleep 4 (l) — extended body
 *   Row 21: sleep 4 (r) — extended body
 *
 * EAT (rows 22-29):
 *   Row 22: eat down, Row 23: eat up, Row 24: eat left, Row 25: eat right
 *   Row 26: eat right-down, Row 27: eat left-down
 *   Row 28: eat right-up, Row 29: eat left-up
 *
 * MEOW (rows 30-33):
 *   Row 30: meow sit, Row 31: meow stand
 *   Row 32: meow sit 2, Row 33: meow lie
 *
 * YAWN (rows 34-37):
 *   Row 34: yawn sit, Row 35: yawn stand
 *   Row 36: yawn sit 2, Row 37: yawn lie
 *
 * WASH (rows 38-40):
 *   Row 38: wash sit, Row 39: wash stand, Row 40: wash lie
 *
 * ITCH (rows 41-42):
 *   Row 41: scratch (l), Row 42: scratch (r)
 *
 * HISS (rows 43-44):
 *   Row 43: hiss (l), Row 44: hiss (r)
 */

// REST — sitting idle (row 0)
// Only use frame [0,0] (front-facing sit) so the cat doesn't rotate
// between different directional poses.
const SITTING_FRAMES = [
  [0, 0],
];

// All 8 walk directions (corrected rows 4-11)
const WALK_DOWN_FRAMES = [
  [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
];
const WALK_UP_FRAMES = [
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
];
const WALK_RIGHT_FRAMES = [
  [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
];
const WALK_LEFT_FRAMES = [
  [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
];
const WALK_LEFT_DOWN_FRAMES = [
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
];
const WALK_RIGHT_DOWN_FRAMES = [
  [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9],
];
const WALK_RIGHT_UP_FRAMES = [
  [0, 10], [1, 10], [2, 10], [3, 10], [4, 10],
];
const WALK_LEFT_UP_FRAMES = [
  [0, 11], [1, 11], [2, 11], [3, 11], [4, 11],
];

// Jump down — single mid-leap frame from walk-down (row 4)
const JUMP_DOWN_FRAMES = [
  [1, 4],
];

// Jump up — single mid-leap frame from walk-up (row 5)
const JUMP_UP_FRAMES = [
  [1, 5],
];

// Sleep 3 (r) — row 17 (corrected from labeled row 19)
const SLEEPING_FRAMES = [
  [0, 17], [1, 17],
];

// Scratch right / itch — trying row 40 (corrected from labeled row 42)
const SCRATCH_FRAMES = [
  [0, 40], [1, 40], [2, 40], [3, 40], [4, 40], [5, 40], [6, 40], [7, 40], [8, 40], [9, 40], [10, 40],
];

// Wash/groom sitting (row 38)
const GROOM_FRAMES = [
  [0, 38], [1, 38], [2, 38], [3, 38],
];

// Meow/alert sitting (row 30)
const ALERT_FRAMES = [
  [0, 30], [1, 30],
];

// Hiss left (row 41, corrected from labeled row 43)
const HISS_FRAMES = [
  [0, 41], [1, 41], [2, 41], [3, 41],
];

// "X" frame — single sprite between HISS and PAW ATTACK (row 43)
// Cat dangling / being held up
const HELD_FRAMES = [
  [0, 43],
];

// ---- Exported pose components ----

export function CatSitting({ size = 64 }) {
  return <AnimatedSprite frames={SITTING_FRAMES} fps={2} size={size} />;
}

export function CatJumping({ size = 64 }) {
  return <AnimatedSprite frames={JUMP_DOWN_FRAMES} fps={8} size={size} />;
}

export function CatJumpingUp({ size = 64 }) {
  return <AnimatedSprite frames={JUMP_UP_FRAMES} fps={8} size={size} />;
}

export function CatLanding({ size = 64 }) {
  return <AnimatedSprite frames={LANDING_FRAMES} fps={4} size={size} />;
}

// Directional walk components
export function CatWalkDown({ size = 64 }) {
  return <AnimatedSprite frames={WALK_DOWN_FRAMES} fps={6} size={size} />;
}
export function CatWalkUp({ size = 64 }) {
  return <AnimatedSprite frames={WALK_UP_FRAMES} fps={6} size={size} />;
}
export function CatWalkRight({ size = 64 }) {
  return <AnimatedSprite frames={WALK_RIGHT_FRAMES} fps={6} size={size} />;
}
export function CatWalkLeft({ size = 64 }) {
  return <AnimatedSprite frames={WALK_LEFT_FRAMES} fps={6} size={size} />;
}
export function CatWalkLeftDown({ size = 64 }) {
  return <AnimatedSprite frames={WALK_LEFT_DOWN_FRAMES} fps={6} size={size} />;
}
export function CatWalkRightDown({ size = 64 }) {
  return <AnimatedSprite frames={WALK_RIGHT_DOWN_FRAMES} fps={6} size={size} />;
}
export function CatWalkRightUp({ size = 64 }) {
  return <AnimatedSprite frames={WALK_RIGHT_UP_FRAMES} fps={6} size={size} />;
}
export function CatWalkLeftUp({ size = 64 }) {
  return <AnimatedSprite frames={WALK_LEFT_UP_FRAMES} fps={6} size={size} />;
}

export function CatSleeping({ size = 64 }) {
  return <AnimatedSprite frames={SLEEPING_FRAMES} fps={1.5} size={size} />;
}

export function CatYawning({ size = 64 }) {
  return <AnimatedSprite frames={SCRATCH_FRAMES} fps={3} size={size} />;
}

export function CatGrooming({ size = 64 }) {
  return <AnimatedSprite frames={GROOM_FRAMES} fps={3} size={size} />;
}

export function CatAlert({ size = 64 }) {
  return <AnimatedSprite frames={ALERT_FRAMES} fps={2} size={size} />;
}

export function CatHeld({ size = 64 }) {
  return <AnimatedSprite frames={HELD_FRAMES} fps={3} size={size} />;
}

export function CatHiss({ size = 64 }) {
  return <AnimatedSprite frames={HISS_FRAMES} fps={4} size={size} />;
}
