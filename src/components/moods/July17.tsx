import { useDisableScroll } from "@/lib/hooks";
import { Play } from "lucide-react";
import React from "react";
import { useJoystick } from "../ui/joystick";

class Actor {
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(x: number, y: number, vx: number, vy: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  move(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x += width;
    if (this.x > width) this.x -= width;
    if (this.y < 0) this.y += height;
    if (this.y > height) this.y -= height;
  }
}

class Rock extends Actor {
  private shape: string;
  private rotation: number;
  private rotationSpeed: number;
  public size: number;

  constructor(x: number, y: number, vx: number, vy: number) {
    super(x, y, vx, vy);
    // Generate a random polygon shape once during construction
    const sides = Math.floor(Math.random() * 3) + 5; // 5 to 7 sides
    this.size = 3 + Math.random() * 8; // Random size between 3 and 11
    const radius = this.size;
    this.shape = Array.from({ length: sides }, (_, i) => {
      const angle = (i / sides) * 2 * Math.PI;
      const px = Math.cos(angle) * radius * (0.8 + Math.random() * 0.4);
      const py = Math.sin(angle) * radius * (0.8 + Math.random() * 0.4);
      return `${px},${py}`;
    }).join(" ");

    this.rotation = Math.random() * 360; // Initial rotation angle
    this.rotationSpeed = (Math.random() - 0.5) * 2; // Random rotation speed (-1 to 1 degrees per frame)
  }

  move(width: number, height: number) {
    super.move(width, height);
    this.rotation = (this.rotation + this.rotationSpeed) % 360; // Update rotation
  }

  render() {
    return (
      <polygon
        points={this.shape}
        transform={`translate(${this.x},${this.y}) rotate(${this.rotation}) `}
        fill="gray"
        stroke="black"
        strokeWidth={2}
      />
    );
  }
}

class Ship extends React.Component<{ x: number; y: number; angle?: number }> {
  render() {
    const { x, y, angle } = this.props;
    const scale = 1; // Design in 32x32, scale to fit
    return (
      <g transform={`translate(${x},${y}) rotate(${angle}) scale(${scale})`}>
        <g transform="translate(-16, -16)">
          <svg fill="#fff" width="32px" height="32px" viewBox="0 0 32 32">
            <g id="SVGRepo_iconCarrier">
              <path d="M23.0649,12.0065C22.034,9.0948,19.2606,7,16,7s-6.034,2.0948-7.0649,5.0065C4.7622,13.2901,2,15.6868,2,18.5 C2,22.7056,8.1494,26,16,26s14-3.2944,14-7.5C30,15.6868,27.2378,13.2901,23.0649,12.0065z M16,9c3.0327,0,5.5,2.4673,5.5,5.5 c0,1.731-0.6533,3.5-5.5,3.5s-5.5-1.769-5.5-3.5C10.5,11.4673,12.9673,9,16,9z M16,24c-7.1782,0-12-2.8438-12-5.5 c0-1.5608,1.6818-3.1773,4.5128-4.2518C8.5099,14.3325,8.5,14.415,8.5,14.5c0,3.6494,2.5234,5.5,7.5,5.5s7.5-1.8506,7.5-5.5 c0-0.085-0.0099-0.1675-0.0128-0.2518C26.3182,15.3227,28,16.9392,28,18.5C28,21.1563,23.1782,24,16,24z M8,18.5 C8,19.3271,7.3271,20,6.5,20S5,19.3271,5,18.5S5.6729,17,6.5,17S8,17.6729,8,18.5z M13,21.5c0,0.8271-0.6729,1.5-1.5,1.5 S10,22.3271,10,21.5s0.6729-1.5,1.5-1.5S13,20.6729,13,21.5z M22,21.5c0,0.8271-0.6729,1.5-1.5,1.5S19,22.3271,19,21.5 s0.6729-1.5,1.5-1.5S22,20.6729,22,21.5z M27,18.5c0,0.8271-0.6729,1.5-1.5,1.5S24,19.3271,24,18.5s0.6729-1.5,1.5-1.5 S27,17.6729,27,18.5z M18,15c0-0.5523,0.4477-1,1-1s1,0.4477,1,1c0,0.5522-0.4477,1-1,1S18,15.5522,18,15z M13,15 c0-0.5522,0.4478-1,1-1h2c0.5522,0,1,0.4478,1,1s-0.4478,1-1,1h-2C13.4478,16,13,15.5522,13,15z"></path>
            </g>
          </svg>
        </g>
      </g>
    );
  }
}

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|webOS/i.test(
    navigator.userAgent
  );
}

export default function MiniGame() {
  const maxSpeed = 4;
  const accel = 0.15;
  const friction = 0.05;
  const maxRocks = 3;

  const [running, setRunning] = React.useState(false);
  const [showMask, setShowMask] = React.useState(true);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const keyState = React.useRef({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  const pos = React.useRef({ x: 0, y: 0 });
  const vel = React.useRef({ x: 0, y: 0 });
  const [, setTick] = React.useState(0);
  const rocks = React.useRef<Rock[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({
    width: 400,
    height: 300,
  });

  const { joystickPosition, Joystick } = useJoystick();

  useDisableScroll(running);

  function updateShip(ax: number, ay: number) {
    if (ax !== 0 || ay !== 0) {
      const len = Math.sqrt(ax * ax + ay * ay);
      ax /= len;
      ay /= len;
      vel.current.x += ax * accel;
      vel.current.y += ay * accel;
    } else {
      vel.current.x *= 1 - friction;
      vel.current.y *= 1 - friction;
    }
    const vlen = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
    if (vlen > maxSpeed) {
      vel.current.x = (vel.current.x / vlen) * maxSpeed;
      vel.current.y = (vel.current.y / vlen) * maxSpeed;
    }
    pos.current.x += vel.current.x;
    pos.current.y += vel.current.y;
    if (pos.current.x < 0) pos.current.x += dimensions.width;
    if (pos.current.x > dimensions.width) pos.current.x -= dimensions.width;
    if (pos.current.y < 0) pos.current.y += dimensions.height;
    if (pos.current.y > dimensions.height) pos.current.y -= dimensions.height;
  }

  const keyMap: Record<string, keyof typeof keyState.current> = {
    w: "up",
    ArrowUp: "up",
    s: "down",
    ArrowDown: "down",
    a: "left",
    ArrowLeft: "left",
    d: "right",
    ArrowRight: "right",
  };

  React.useEffect(() => {
    function handleKey(e: KeyboardEvent, down: boolean) {
      const dir = keyMap[e.key];
      if (dir) {
        keyState.current[dir] = down;
        if (running) e.preventDefault();
      }
    }
    const down = (e: KeyboardEvent) => handleKey(e, true);
    const up = (e: KeyboardEvent) => handleKey(e, false);
    window.addEventListener("keydown", down, { passive: false });
    window.addEventListener("keyup", up, { passive: false });
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [running]);

  React.useEffect(() => {
    let raf: number;
    let active = true;
    let rockSpawnTimer = 0;

    function loop() {
      if (!running) return;

      let ax = 0,
        ay = 0;
      if (keyState.current.up) ay -= 1;
      if (keyState.current.down) ay += 1;
      if (keyState.current.left) ax -= 1;
      if (keyState.current.right) ax += 1;

      // Include joystick position in the update
      const len = Math.sqrt(
        joystickPosition.x * joystickPosition.x +
          joystickPosition.y * joystickPosition.y
      );
      if (len > 0) {
        ax += joystickPosition.x / len;
        ay += joystickPosition.y / len;
      }

      updateShip(ax, ay);

      // Spawn rocks periodically
      rockSpawnTimer++;
      if (rockSpawnTimer > 100 && rocks.current.length < maxRocks) {
        rockSpawnTimer = 0;
        const { x, y, vx, vy } = getEdgeSpawn();
        rocks.current.push(new Rock(x, y, vx, vy));
      }

      // Update rocks
      rocks.current.forEach((rock) =>
        rock.move(dimensions.width, dimensions.height)
      );

      // Remove rocks that leave the screen
      rocks.current = rocks.current.filter(
        (rock) =>
          rock.x >= 0 &&
          rock.x <= dimensions.width &&
          rock.y >= 0 &&
          rock.y <= dimensions.height
      );

      if (checkCollision()) {
        setRunning(false); // Stop the game
        setGameOver(true); // Set game over state
        return; // Exit the loop
      }

      setTick((t) => t + 1);
      if (active && running) raf = requestAnimationFrame(loop);
    }
    if (running) raf = requestAnimationFrame(loop);
    return () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [running, dimensions, joystickPosition]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (running) {
      const startTime = Date.now() - elapsedTime;
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const angle =
    vel.current.x === 0 && vel.current.y === 0
      ? 0 // Initial angle is 0
      : (Math.atan2(vel.current.y, vel.current.x) * 180) / Math.PI + 90;

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  };

  function checkCollision() {
    const shipRadius = 8; // Approximate radius of the ship

    for (const rock of rocks.current) {
      const dx = rock.x - pos.current.x;
      const dy = rock.y - pos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < shipRadius + rock.size / 2) {
        return true; // Collision detected
      }
    }
    return false; // No collision
  }

  function resetGame() {
    setGameOver(false);
    setShowMask(true);
    setElapsedTime(0);
    pos.current = { x: dimensions.width / 2, y: dimensions.height / 2 };
    vel.current = { x: 0, y: 0 };
    rocks.current = [];
  }

  React.useEffect(() => {
    function updateDimensions() {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const width = parentWidth;
        const height = (parentWidth * 3) / 4; // Maintain 4:3 aspect ratio
        setDimensions({ width, height });
        pos.current = { x: width / 2, y: height / 2 }; // Reset position to center
      }
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function getEdgeSpawn() {
    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    const speed = 0.3 + Math.random() * 1.5;
    let x = 0,
      y = 0,
      vx = 0,
      vy = 0;

    switch (edge) {
      case 0: // Top edge
        x = Math.random() * dimensions.width;
        y = 0;
        vx = (Math.random() - 0.5) * speed;
        vy = speed;
        break;
      case 1: // Right edge
        x = dimensions.width;
        y = Math.random() * dimensions.height;
        vx = -speed;
        vy = (Math.random() - 0.5) * speed;
        break;
      case 2: // Bottom edge
        x = Math.random() * dimensions.width;
        y = dimensions.height;
        vx = (Math.random() - 0.5) * speed;
        vy = -speed;
        break;
      case 3: // Left edge
        x = 0;
        y = Math.random() * dimensions.height;
        vx = speed;
        vy = (Math.random() - 0.5) * speed;
        break;
    }

    return { x, y, vx, vy };
  }

  return (
    <div
      className="p-6 rounded-xl border-2 border-dotted flex flex-col items-center
    border-black bg-gradient-to-br from-gray-400 via-gray-100 to-white shadow-lg"
      ref={containerRef}
    >
      <div className="relative w-full">
        <p className="text-center font-hand text-2xl text-gray-900">
          Space Shooter
        </p>
        <div
          className={`absolute right-0 top-0 m-0 p-2 bg-white rounded shadow font-mono text-sm ${
            !running ? "text-red-500" : "text-gray-800"
          }`}
          title="Game duration in milliseconds"
        >
          {formatTime(elapsedTime)}
        </div>
      </div>
      <div
        className="flex justify-center mt-6 relative p-4"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <svg className="w-full h-full bg-gray-800 rounded-lg shadow-lg block">
          <Ship x={pos.current.x} y={pos.current.y} angle={angle} />
          {rocks.current.map((rock, index) => (
            <React.Fragment key={index}>{rock.render()}</React.Fragment>
          ))}
        </svg>
        {showMask && (
          <div
            className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center cursor-pointer select-none z-10 backdrop-blur-xs"
            onClick={() => {
              if (gameOver) {
                resetGame(); // Reset the game if it's over
              }

              setShowMask(false);
              setRunning(true);
            }}
          >
            <Play className="text-white w-12 h-12" />
          </div>
        )}
        {!showMask && (
          <button
            className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center cursor-pointer select-none z-10"
            onClick={() => {
              setShowMask(true);
              setRunning(false);
            }}
          >
            {/* <Pause className="text-white w-12 h-12" /> */}
          </button>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg p-4">
            <div className="text-center text-white">
              <p className="text-lg font-semibold mb-2">Game Over</p>
              <p className="text-sm mb-4">
                Your time: {formatTime(elapsedTime)}
              </p>
              <button
                className="px-4 py-2 bg-red-500 rounded shadow hover:bg-red-600 transition-all"
                onClick={resetGame}
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className="text-center text-xs text-gray-500 mt-2"
        title="Edge crossing, physics acceleration and deceleration"
      >
        Control: AWSD / Arrow keys
        <p>July 17, 2025</p>
      </div>
      {/* Virtual Joystick for touch devices */}
      {!showMask && !gameOver && isMobileDevice() && (
        <div className="absolute bottom-16">{Joystick}</div>
      )}
    </div>
  );
}
