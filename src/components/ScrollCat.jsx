import { useState, useEffect, useRef, useCallback } from 'react';
import {
  CatSitting, CatJumping, CatJumpingUp,
  CatSleeping, CatYawning, CatHiss, CatHeld,
  CatWalkDown, CatWalkUp, CatWalkRight, CatWalkLeft,
  CatWalkLeftDown, CatWalkRightDown, CatWalkRightUp, CatWalkLeftUp,
} from './CatPoses';

/**
 * ScrollCat — pixel art orange tabby section navigation.
 *
 * - Sits on platform bars, jumps between on scroll
 * - Squash/stretch on jump & land
 * - Scratches after 2s idle
 * - Hisses on page click
 * - Click & drag to carry the cat
 * - On release: landing squash, then walks back to its platform
 */

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const CAT_SIZE = 64;
const WALK_SPEED = 7; // px per frame (~420px/s at 60fps)

function getPlatformVh(index, total) {
  const top = 14;
  const bot = 14;
  const range = 100 - top - bot;
  if (total <= 1) return top;
  return top + (index / (total - 1)) * range;
}

/**
 * Determine the best walk direction based on angle from current to target.
 * Returns one of 8 directions.
 */
function getWalkDirection(dx, dy) {
  const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180 to 180
  // 8 directions, each spanning 45 degrees
  if (angle >= -22.5 && angle < 22.5) return 'right';
  if (angle >= 22.5 && angle < 67.5) return 'right-down';
  if (angle >= 67.5 && angle < 112.5) return 'down';
  if (angle >= 112.5 && angle < 157.5) return 'left-down';
  if (angle >= 157.5 || angle < -157.5) return 'left';
  if (angle >= -157.5 && angle < -112.5) return 'left-up';
  if (angle >= -112.5 && angle < -67.5) return 'up';
  if (angle >= -67.5 && angle < -22.5) return 'right-up';
  return 'down';
}

export default function ScrollCat() {
  const [activePlatform, setActivePlatform] = useState(0);
  const [pose, setPose] = useState('sitting');
  const [jumpState, setJumpState] = useState('idle');
  const [visible, setVisible] = useState(false);
  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  // Walk-back state: cat walks from drop point back to its bar
  const [isWalking, setIsWalking] = useState(false);
  const [walkPos, setWalkPos] = useState({ x: 0, y: 0 });
  const [walkDirection, setWalkDirection] = useState('down');

  const prevPlatformRef = useRef(0);
  const timeoutsRef = useRef([]);
  const idleTimerRef = useRef(null);
  const hissTimerRef = useRef(null);
  const draggingRef = useRef(false);
  const walkAnimRef = useRef(null);
  const catRef = useRef(null);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const addTimeout = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setPose((currentPose) => {
        if (currentPose !== 'sitting') return currentPose;
        setTimeout(() => setPose('sitting'), 6000);
        return 'yawning';
      });
    }, 2000);
  }, []);

  // --- Get the target pixel position of the cat's platform ---
  const getTargetPos = useCallback(() => {
    const platformYs = SECTIONS.map((_, i) => getPlatformVh(i, SECTIONS.length));
    const targetVh = platformYs[activePlatform];
    const navEl = document.querySelector('.scroll-cat');
    if (!navEl) return { x: window.innerWidth - 80, y: (targetVh / 100) * window.innerHeight - (CAT_SIZE - 18) };
    const navRect = navEl.getBoundingClientRect();
    return {
      x: navRect.right - 70 - 5, // approximate cat X on the bar
      y: (targetVh / 100) * window.innerHeight - (CAT_SIZE - 18),
    };
  }, [activePlatform]);

  // --- Scroll handler ---
  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 50);
    if (!draggingRef.current && !isWalking) resetIdleTimer();

    let current = 0;
    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          current = i;
        }
      }
    }
    setActivePlatform(current);
  }, [resetIdleTimer, isWalking]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // --- Hiss on page click ---
  useEffect(() => {
    const handleClick = (e) => {
      if (draggingRef.current || isWalking) return;
      if (e.target.closest('.scroll-cat')) return;

      setPose((current) => {
        if (current === 'jumping' || current === 'jumpingUp' || current === 'sleeping') {
          return current;
        }
        if (hissTimerRef.current) clearTimeout(hissTimerRef.current);
        hissTimerRef.current = setTimeout(() => {
          setPose('sitting');
          resetIdleTimer();
        }, 800);
        return 'hissing';
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [resetIdleTimer, isWalking]);

  // --- Drag: mouse down on cat ---
  const handleCatMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    // Cancel any ongoing walk
    if (walkAnimRef.current) {
      cancelAnimationFrame(walkAnimRef.current);
      walkAnimRef.current = null;
    }
    setIsWalking(false);

    draggingRef.current = true;
    setIsDragging(true);
    setPose('held');
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (hissTimerRef.current) clearTimeout(hissTimerRef.current);
    setDragPos({ x: e.clientX - CAT_SIZE / 2, y: e.clientY - CAT_SIZE / 2 });
  }, []);

  // --- Drag: mouse move + mouse up ---
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      setDragPos({ x: e.clientX - CAT_SIZE / 2, y: e.clientY - CAT_SIZE / 2 });
    };

    const handleMouseUp = (e) => {
      draggingRef.current = false;
      setIsDragging(false);

      // Start walk-back from drop position
      const dropX = e.clientX - CAT_SIZE / 2;
      const dropY = e.clientY - CAT_SIZE / 2;
      setWalkPos({ x: dropX, y: dropY });
      setIsWalking(true);
      setPose('walking');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // --- Walk-back animation loop ---
  useEffect(() => {
    if (!isWalking) return;

    const animate = () => {
      setWalkPos((pos) => {
        const target = getTargetPos();
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Close enough — arrived
        if (dist < WALK_SPEED * 2) {
          setIsWalking(false);
          setPose('sitting');
          resetIdleTimer();
          return pos;
        }

        // Update walk direction
        const dir = getWalkDirection(dx, dy);
        setWalkDirection(dir);

        // Move toward target
        const nx = dx / dist;
        const ny = dy / dist;
        return {
          x: pos.x + nx * WALK_SPEED,
          y: pos.y + ny * WALK_SPEED,
        };
      });

      walkAnimRef.current = requestAnimationFrame(animate);
    };

    walkAnimRef.current = requestAnimationFrame(animate);
    return () => {
      if (walkAnimRef.current) cancelAnimationFrame(walkAnimRef.current);
    };
  }, [isWalking, getTargetPos, resetIdleTimer]);

  // --- Pose + squash/stretch on platform change ---
  useEffect(() => {
    const prev = prevPlatformRef.current;
    if (activePlatform === prev) return;
    if (draggingRef.current || isWalking) {
      prevPlatformRef.current = activePlatform;
      return;
    }

    const goingDown = activePlatform > prev;
    prevPlatformRef.current = activePlatform;
    clearAllTimeouts();

    setPose(goingDown ? 'jumping' : 'jumpingUp');
    setJumpState('jumping');

    if (SECTIONS[activePlatform].id === 'contact') {
      addTimeout(() => {
        setJumpState('landing');
        setPose('sitting');
        addTimeout(() => {
          setJumpState('idle');
          setPose('sleeping');
        }, 250);
      }, 400);
      return;
    }

    addTimeout(() => {
      setJumpState('landing');
      setPose('sitting');
      addTimeout(() => {
        setJumpState('idle');
        resetIdleTimer();
      }, 250);
    }, 400);

    return clearAllTimeouts;
  }, [activePlatform, resetIdleTimer, isWalking]);

  const handlePlatformClick = (index) => {
    const el = document.getElementById(SECTIONS[index].id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const platformYs = SECTIONS.map((_, i) => getPlatformVh(i, SECTIONS.length));
  const targetVh = platformYs[activePlatform];

  // Squash/stretch
  let squashStretch = 'scaleX(1) scaleY(1)';
  if (jumpState === 'jumping') {
    squashStretch = 'scaleX(0.85) scaleY(1.2)';
  } else if (jumpState === 'landing') {
    squashStretch = 'scaleX(1.2) scaleY(0.8)';
  }

  // Render the correct walk direction sprite
  const walkSprite = {
    'down': <CatWalkDown size={CAT_SIZE} />,
    'up': <CatWalkUp size={CAT_SIZE} />,
    'right': <CatWalkRight size={CAT_SIZE} />,
    'left': <CatWalkLeft size={CAT_SIZE} />,
    'left-down': <CatWalkLeftDown size={CAT_SIZE} />,
    'right-down': <CatWalkRightDown size={CAT_SIZE} />,
    'right-up': <CatWalkRightUp size={CAT_SIZE} />,
    'left-up': <CatWalkLeftUp size={CAT_SIZE} />,
  };

  return (
    <>
      <nav
        className={`scroll-cat ${visible ? 'visible' : ''}`}
        aria-label="Section navigation"
      >
        {/* Platform bars */}
        {platformYs.map((yVh, i) => {
          const isActive = i === activePlatform;
          const isHovered = hoveredPlatform === i;
          const show = isActive || isHovered || hoveredPlatform !== null;

          return (
            <button
              key={SECTIONS[i].id}
              className={`scroll-cat__platform ${isActive ? 'active' : ''} ${show ? 'show' : ''}`}
              style={{ top: `${yVh}vh` }}
              onClick={() => handlePlatformClick(i)}
              onMouseEnter={() => setHoveredPlatform(i)}
              onMouseLeave={() => setHoveredPlatform(null)}
              aria-label={`Go to ${SECTIONS[i].label}`}
            >
              <div className="scroll-cat__bar-line" />
              <span className="scroll-cat__bar-label">{SECTIONS[i].label}</span>
            </button>
          );
        })}

        {/* The cat on its platform (hidden when dragging or walking) */}
        {!isDragging && !isWalking && (
          <div
            ref={catRef}
            className="scroll-cat__cat"
            style={{
              top: `calc(${targetVh}vh - ${CAT_SIZE - 18}px)`,
              cursor: 'grab',
              pointerEvents: 'auto',
            }}
            onMouseDown={handleCatMouseDown}
          >
            <div
              className="scroll-cat__pose"
              style={{
                transform: squashStretch,
                transformOrigin: 'bottom center',
                transition: 'transform 0.2s ease',
              }}
            >
              {pose === 'sitting' && <CatSitting size={CAT_SIZE} />}
              {pose === 'jumping' && <CatJumping size={CAT_SIZE} />}
              {pose === 'jumpingUp' && <CatJumpingUp size={CAT_SIZE} />}
              {pose === 'sleeping' && <div style={{ marginTop: 7 }}><CatSleeping size={CAT_SIZE} /></div>}
              {pose === 'yawning' && <CatYawning size={CAT_SIZE} />}
              {pose === 'hissing' && <CatHiss size={CAT_SIZE} />}
            </div>
          </div>
        )}
      </nav>

      {/* Dragged cat — follows cursor */}
      {isDragging && (
        <div
          style={{
            position: 'fixed',
            left: dragPos.x,
            top: dragPos.y,
            width: CAT_SIZE,
            height: CAT_SIZE,
            zIndex: 10000,
            cursor: 'grabbing',
            pointerEvents: 'none',
          }}
        >
          <CatHeld size={CAT_SIZE} />
        </div>
      )}

      {/* Walking cat — walks from drop point back to platform */}
      {isWalking && (
        <div
          style={{
            position: 'fixed',
            left: walkPos.x,
            top: walkPos.y,
            width: CAT_SIZE,
            height: CAT_SIZE,
            zIndex: 10000,
            pointerEvents: 'none',
          }}
        >
          {walkSprite[walkDirection]}
        </div>
      )}
    </>
  );
}
