'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface AudioEngine {
    audioCtx: AudioContext | null
    masterGain: GainNode | null
    isEngineActive: boolean
    startEngine: () => void
    stopEngine: () => void
}

export const useAudioEngine = (): AudioEngine => {
    const audioCtxRef = useRef<AudioContext | null>(null)
    const masterGainRef = useRef<GainNode | null>(null)
    const [isEngineActive, setIsEngineActive] = useState(false)

    const startEngine = useCallback(() => {
        if (audioCtxRef.current) {
            return // Engine is already running
        }

        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
            const audioCtx = new AudioContextClass()
            const masterGain = audioCtx.createGain()
            masterGain.gain.setValueAtTime(0.12, audioCtx.currentTime) // Default comfortable volume
            masterGain.connect(audioCtx.destination)

            audioCtxRef.current = audioCtx
            masterGainRef.current = masterGain
            setIsEngineActive(true)
        } catch (e) {
            console.error('Web Audio API is not supported in this browser.', e)
        }
    }, [])

    const stopEngine = useCallback(() => {
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close()
        }
        audioCtxRef.current = null
        masterGainRef.current = null
        setIsEngineActive(false)
    }, [])

    // Ensure the audio context is closed when the component unmounts
    useEffect(() => {
        return () => {
            stopEngine()
        }
    }, [stopEngine])

    return {
        audioCtx: audioCtxRef.current,
        masterGain: masterGainRef.current,
        isEngineActive,
        startEngine,
        stopEngine,
    }
}