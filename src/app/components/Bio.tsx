import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Pause, Volume2 } from "lucide-react";

export function Bio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const textToRead = "Every bar is a body of evidence. Cold Case is a Los Angeles-based rapper whose music sits at the intersection of street narrative and cinematic storytelling.";

  const handlePlayQuote = async () => {
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb";

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (window.speechSynthesis) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      }
      return;
    }

    // If already paused / suspended by browser speaking
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      return;
    }

    setIsLoading(true);

    if (apiKey) {
      // Use ElevenLabs API
      try {
        if (!audioRef.current) {
          const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: "POST",
            headers: {
              "xi-api-key": apiKey,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              text: textToRead,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            }),
          });

          if (!response.ok) {
            throw new Error(`ElevenLabs API returned ${response.status}: ${response.statusText}`);
          }

          const blob = await response.blob();
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          audioRef.current = audio;

          audio.onended = () => {
            setIsPlaying(false);
          };
          audio.onerror = () => {
            setIsPlaying(false);
            setIsLoading(false);
          };
        }

        setIsLoading(false);
        setIsPlaying(true);
        audioRef.current.play();
      } catch (err) {
        console.error("ElevenLabs Voice Synthesis failed, falling back to browser SpeechSynthesis.", err);
        playBrowserSpeech();
      }
    } else {
      // Fallback: Web Speech API
      playBrowserSpeech();
    }
  };

  const playBrowserSpeech = () => {
    if (!window.speechSynthesis) {
      setIsLoading(false);
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel(); // Reset any ongoing speech

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    // Try to find a good deep, low-pitched voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(voice => voice.lang.startsWith("en"));
    if (englishVoices.length > 0) {
      utterance.voice = englishVoices[0];
    }
    
    utterance.rate = 0.95; // Slightly slower, matching a narrative noir tone
    utterance.pitch = 0.85; // Slightly deeper pitch

    utterance.onstart = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (e) => {
      console.error("SpeechSynthesis error:", e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section id="bio" className="py-24 px-6 bg-stone-900 text-stone-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-bold tracking-widest text-stone-500 uppercase mb-4 block">Biography</span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-stone-100">
              "Every bar is a body of evidence."
            </h2>
            <button
              onClick={handlePlayQuote}
              className="w-fit shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-700 bg-stone-800 text-stone-300 text-xs tracking-widest uppercase hover:bg-stone-700 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
              {isLoading ? "Generating..." : isPlaying ? "Pause Audio" : "Listen to Bio"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-stone-400 leading-relaxed font-light">
            <p>
              Cold Case is a Los Angeles-based rapper whose music sits at the intersection of street narrative and
              cinematic storytelling. Drawing from the gritty textures of West Coast hip-hop and the introspective
              weight of noir fiction, Cold Case crafts verses that feel like open investigations — unresolved, urgent,
              and impossible to ignore.
            </p>
            <p>
              After years of building underground credibility through local showcases and self-released mixtapes,
              Cold Case broke through with a sound that refuses easy categorization. Lyrically dense and atmospherically
              dark, the music has earned comparisons to early Kendrick Lamar and the late-night energy of ScHoolboy Q.
            </p>
            <p>
              Currently working on a debut studio album, Cold Case continues to push the boundaries of West Coast rap —
              weaving cold-case crime motifs, personal testimony, and philosophical inquiry into something wholly original.
              Featured in XXL, HotNewHipHop, and Complex.
            </p>
            <div className="bg-stone-800 p-6 border-l-2 border-stone-700">
              <h3 className="text-stone-100 font-medium mb-2">Milestones</h3>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>2025 — <span className="italic">Evidence</span> EP — 500K+ streams</li>
                <li>2024 — XXL Freshman Class Nomination</li>
                <li>2024 — <span className="italic">Night Court</span> mixtape — HotNewHipHop Pick</li>
                <li>2023 — Complex "Artists to Watch" feature</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
