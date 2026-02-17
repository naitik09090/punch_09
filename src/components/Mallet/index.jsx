import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './mallet.css'

const Mallet = () => {
  const cursorRef = useRef(null)
  const malletRef = useRef(null)
  const whackRef = useRef(null)

  useEffect(() => {
    // Initial position
    gsap.set(malletRef.current, {
      xPercent: -5,
      yPercent: 0,
      rotate: 0,
      transformOrigin: '50% 100%'
    })

    // Whack Animation - A swift vertical strike
    const tl = gsap.timeline({ paused: true })
      .to(malletRef.current, {
        yPercent: -50,
        xPercent: 10,
        rotate: 45,
        duration: 0.05,
        ease: 'power2.in',
      })
      .to(malletRef.current, {
        yPercent: 10,
        xPercent: -5,
        rotate: -10,
        duration: 0.1,
        ease: 'power4.out',
      })
      .to(malletRef.current, {
        yPercent: 0,
        rotate: 0,
        duration: 0.2,
      })

    whackRef.current = tl

    const UPDATE = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX)
      const y = e.clientY || (e.touches && e.touches[0].clientY)

      if (cursorRef.current && x !== undefined && y !== undefined)
        gsap.set(cursorRef.current, {
          '--x': x,
          '--y': y,
        })
    }

    UPDATE({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 })

    const WHACK = () => {
      if (whackRef.current) whackRef.current.restart()
    }

    window.addEventListener('pointermove', UPDATE)
    window.addEventListener('pointerdown', WHACK)
    // Add touch support
    window.addEventListener('touchmove', UPDATE)
    window.addEventListener('touchstart', WHACK)

    gsap.set(cursorRef.current, { display: 'block' })

    return () => {
      if (whackRef.current) whackRef.current.kill()
      window.removeEventListener('pointerdown', WHACK)
      window.removeEventListener('pointermove', UPDATE)
      window.removeEventListener('touchmove', UPDATE)
      window.removeEventListener('touchstart', WHACK)
    }
  }, [])

  return (
    <div ref={cursorRef} className="mallet">
      <svg
        ref={malletRef}
        viewBox="0 0 100 200"
        className="shadow-hammer"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="stick-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" />
            <stop offset="50%" stopColor="#333" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
          <filter id="blade-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dark Stick */}
        <rect x="45" y="50" width="10" height="150" rx="2" fill="url(#stick-gradient)" stroke="#555" strokeWidth="1" />

        {/* Glowing Energy Blade Head */}
        <path d="M10 20 L90 20 L80 60 L20 60 Z" fill="#000" stroke="#a29bfe" strokeWidth="2" filter="url(#blade-glow)" />

        {/* Energy Core */}
        <circle cx="50" cy="40" r="10" fill="#a29bfe" filter="url(#blade-glow)" opacity="0.8">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
        </circle>

        {/* Tech Lines */}
        <path d="M25 30 L75 30 M30 50 L70 50" stroke="#a29bfe" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  )
}

export default Mallet
