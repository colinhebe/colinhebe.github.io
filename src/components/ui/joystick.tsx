import { useState, useRef } from "react";

const JOYSTICK_RADIUS = 32; // Outer joystick radius
const INNER_CIRCLE_RADIUS = 16; // Inner circle radius

export function useJoystick() {
  const [joystickPosition, setJoystickPosition] = useState({
    x: 0,
    y: 0,
  });
  const joystickRef = useRef({ startX: 0, startY: 0, active: false });

  function handleTouchStart(e: React.TouchEvent) {
    e.stopPropagation();
    const touch = e.touches[0];
    joystickRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      active: true,
    };
    setJoystickPosition({ x: 0, y: 0 });
  }

  function handleTouchMove(e: React.TouchEvent) {
    e.stopPropagation();
    if (!joystickRef.current.active) return;
    const touch = e.touches[0];
    const relativeX = touch.clientX - joystickRef.current.startX;
    const relativeY = touch.clientY - joystickRef.current.startY;
    const constrainedX = Math.max(
      -JOYSTICK_RADIUS,
      Math.min(JOYSTICK_RADIUS, relativeX) // Limit relative movement to a 64x64 area
    );
    const constrainedY = Math.max(
      -JOYSTICK_RADIUS,
      Math.min(JOYSTICK_RADIUS, relativeY)
    );

    // Normalize to -1 to 1 range
    const normalizedX = constrainedX / JOYSTICK_RADIUS;
    const normalizedY = constrainedY / JOYSTICK_RADIUS;

    setJoystickPosition({ x: normalizedX, y: normalizedY });
  }

  function handleTouchEnd(e: React.TouchEvent) {
    e.stopPropagation();
    joystickRef.current.active = false;
    setJoystickPosition({ x: 0, y: 0 });
  }

  const Joystick = (
    <div
      className="w-32 h-32 flex items-center justify-center z-20 pointer-events-auto  bg-gray-100 rounded-full relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="w-16 h-16 bg-gray-500 rounded-full"
        style={{
          position: "absolute",
          width: `${INNER_CIRCLE_RADIUS * 4}px`,
          height: `${INNER_CIRCLE_RADIUS * 4}px`,
          left: joystickPosition.x * JOYSTICK_RADIUS + JOYSTICK_RADIUS, // Center the circle
          top: joystickPosition.y * JOYSTICK_RADIUS + JOYSTICK_RADIUS, // Center the circle
        }}
      ></div>
    </div>
  );

  return {
    Joystick,
    joystickPosition,
  };
}
