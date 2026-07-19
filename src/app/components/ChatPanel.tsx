'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { Send } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface Message {
    role: 'user' | 'assistant'
    text: string
}

interface ChatPanelProps {
    messages: Message[]
    chatLoading: boolean
    onSendMessage: (message: string) => void
    quickQuestions: { label: string; prompt: string }[]
}

export function ChatPanel({ messages, chatLoading, onSendMessage, quickQuestions }: ChatPanelProps) {
    const [chatInput, setChatInput] = useState('')
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, chatLoading])

    const onSubmitChat = (e: React.FormEvent) => {
        e.preventDefault()
        if (!chatInput.trim()) return
        onSendMessage(chatInput)
        setChatInput('')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-3xl overflow-hidden h-[460px]"
        >
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={cn(
                            'flex flex-col max-w-[85%] rounded-2xl p-3 text-xs md:text-sm leading-relaxed transition-all',
                            msg.role === 'user'
                                ? 'bg-purple-600/20 border border-purple-500/20 text-purple-100 ml-auto rounded-tr-none'
                                : 'bg-neutral-950/80 border border-neutral-800 text-neutral-300 mr-auto rounded-tl-none'
                        )}
                    >
                        <span className="text-[8px] uppercase tracking-wider font-bold text-neutral-500 mb-1">
                            {msg.role === 'user' ? 'You' : 'Analyst'}
                        </span>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                ))}
                {chatLoading && (
                    <div className="bg-neutral-950/80 border border-neutral-800 text-neutral-300 mr-auto rounded-2xl rounded-tl-none p-3 max-w-[85%] flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-neutral-800/80 bg-black/45 space-y-3">
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {quickQuestions.map((q, idx) => (
                        <button key={idx} onClick={() => onSendMessage(q.prompt)} className="text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-purple-500/40 px-2 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer font-semibold">
                            {q.label}
                        </button>
                    ))}
                </div>
                <form onSubmit={onSubmitChat} className="flex gap-1.5 items-center">
                    <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask more about this song..." className="flex-1 bg-neutral-950/80 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/80 transition-all" />
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-2 transition-colors cursor-pointer">
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </form>
            </div>
        </motion.div>
    )
}