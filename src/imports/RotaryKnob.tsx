'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface RotaryKnobProps {
  value: number;                    // 0-100 (or min-max)
  onChange: (value: number) => void;
  label?: string;
  size?: number;                    // px
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  color?: string;
  className?: string;
  dragMode?: 'circular' | 'vertical'; // new: circular is now default & recommended
}

export function RotaryKnob({
  value,
  onChange,
  label,
  size = 58,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  color = '#D4AF37',
  className = '',
  dragMode = 'circular',
}: RotaryKnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Rotation range: -135° to +135° (270° total travel — classic audio knob)
  const rotationRange = 270;
  const minAngle = -135;
  const maxAngle = 135;

  const valueToAngle = useCallback((val: number) => {
    const normalized = (val - min) / (max - min);
    return minAngle + normalized * rotationRange;
  }, [min, max]);

  const angleToValue = useCallback((angle: number) => {
    const normalized = (angle - minAngle) / rotationRange;
    const raw = min + normalized * (max - min);
    return Math.round(Math.max(min, Math.min(max, raw)) / step) * step;
  }, [min, max, step]);

  // Motion values
  const angle = useMotionValue(valueToAngle(value));
  const springAngle = useSpring(angle, {
    stiffness: 320,
    damping: 26,
    mass: 0.55,
  });

  const visualRotation = useTransform(springAngle, (a) => `${a}deg`);

  // Update angle when external value changes
  useEffect(() => {
    const target = valueToAngle(value);
    if (Math.abs(target - angle.get()) > 0.8) {
      angle.set(target);
    }
  }, [value, angle, valueToAngle]);

  // ==================== CIRCULAR DRAG ====================
  const dragStateRef = useRef<{
    startAngle: number;
    startValue: number;
    centerX: number;
    centerY: number;
    lastAngle: number;
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    const knob = knobRef.current;
    if (!knob) return;

    const rect = knob.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const startAngleRad = Math.atan2(dy, dx);
    const startAngleDeg = (startAngleRad * 180) / Math.PI;

    dragStateRef.current = {
      startAngle: startAngleDeg,
      startValue: value,
      centerX,
      centerY,
      lastAngle: startAngleDeg,
    };

    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragStateRef.current || !knobRef.current) return;

    const { centerX, centerY, startAngle, startValue, lastAngle } = dragStateRef.current;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    let currentAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

    // Calculate delta from previous frame (handles wrapping)
    let delta = currentAngle - lastAngle;

    // Handle angle wrapping (shortest path)
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    dragStateRef.current.lastAngle = currentAngle;

    // Current visual angle
    const currentVisualAngle = angle.get();
    let newAngle = currentVisualAngle + delta * 0.85; // sensitivity

    // Clamp to allowed range
    newAngle = Math.max(minAngle, Math.min(maxAngle, newAngle));

    angle.set(newAngle);

    const newValue = angleToValue(newAngle);
    if (newValue !== value) {
      onChange(newValue);
    }
  }, [angle, angleToValue, onChange, value]);

  const handlePointerUp = (e: PointerEvent) => {
    if (dragStateRef.current) {
      dragStateRef.current = null;
    }
    setIsDragging(false);
    // Spring will automatically settle thanks to useSpring
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Attach global listeners only while dragging
  useEffect(() => {
    if (!isDragging) return;

    const moveHandler = (e: PointerEvent) => handlePointerMove(e);
    const upHandler = (e: PointerEvent) => handlePointerUp(e);

    window.addEventListener('pointermove', moveHandler);
    window.addEventListener('pointerup', upHandler);
    window.addEventListener('pointercancel', upHandler);

    return () => {
      window.removeEventListener('pointermove', moveHandler);
      window.removeEventListener('pointerup', upHandler);
      window.removeEventListener('pointercancel', upHandler);
    };
  }, [isDragging, handlePointerMove]);

  // ==================== VERTICAL FALLBACK (optional) ====================
  const handleVerticalDrag = useCallback((event: any, info: any) => {
    const currentAngle = angle.get();
    const sensitivity = 1.6;
    const delta = -info.delta.y * sensitivity;

    let newAngle = currentAngle + delta;
    newAngle = Math.max(minAngle, Math.min(maxAngle, newAngle));

    angle.set(newAngle);
    const newValue = angleToValue(newAngle);
    if (newValue !== value) onChange(newValue);
  }, [angle, angleToValue, onChange, value]);

  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newValue = value;
    const increment = step * (e.shiftKey ? 5 : 1);

    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') newValue = Math.min(max, value + increment);
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') newValue = Math.max(min, value - increment);

    if (newValue !== value) {
      onChange(newValue);
      e.preventDefault();
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        ref={knobRef}
        className="relative select-none touch-none"
        style={{ width: size, height: size }}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={dragMode === 'circular' ? handlePointerDown : undefined}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-2 transition-all duration-150"
          style={{
            borderColor: isDragging ? color : '#D4AF37',
            background: 'linear-gradient(145deg, #1a1a1f 0%, #111114 100%)',
            boxShadow: isDragging 
              ? `0 0 0 1px ${color}40, 0 8px 25px rgb(0 0 0 / 0.5)` 
              : '0 4px 14px rgb(0 0 0 / 0.45), inset 0 2px 3px rgb(255 255 255 / 0.08), inset 0 -3px 6px rgb(0 0 0 / 0.6)',
          }}
        />

        {/* Inner face */}
        <div
          className="absolute inset-[3.5px] rounded-full"
          style={{
            background: '#0f0f12',
            boxShadow: 'inset 0 1px 5px rgb(0 0 0 / 0.9)',
          }}
        />

        {/* Rotating indicator */}
        <motion.div
          className="absolute left-1/2 z-10"
          style={{
            top: size * 0.155,
            rotate: visualRotation,
            transformOrigin: `50% ${size * 0.5 - size * 0.155}px`,
          }}
        >
          <div
            className="w-[5.5px] h-[5.5px] rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 9px ${color}99`,
              transform: 'translateX(-50%)',
            }}
          />
        </motion.div>

        {/* Drag overlay - only for vertical mode */}
        {dragMode === 'vertical' && (
          <motion.div
            drag="y"
            dragConstraints={{ top: -140, bottom: 140 }}
            dragElastic={0.1}
            dragMomentum={true}
            onDrag={handleVerticalDrag}
            whileDrag={{ scale: 1.02 }}
            className="absolute inset-0 z-20 cursor-ns-resize rounded-full"
            style={{ touchAction: 'none' }}
          />
        )}

        {/* Active ring glow */}
        {isDragging && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: `0 0 0 1.5px ${color}55, 0 0 22px ${color}35`,
            }}
          />
        )}
      </div>

      {/* Label + Value */}
      {(label || showValue) && (
        <div className="mt-2 flex flex-col items-center">
          {label && (
            <div className="text-[10px] font-semibold tracking-[1.5px] text-white/60">
              {label}
            </div>
          )}
          {showValue && (
            <div className="font-mono text-lg font-semibold tabular-nums" style={{ color }}>
              {Math.round(value)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
