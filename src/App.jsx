import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  MessageCircle, Code2, Calculator, Pencil,
  Lightbulb, Languages, FileText, CheckSquare,
  ArrowUp, Trash2
} from 'lucide-react'


const GROQ_API_KEY = ''

const TOOLS = [
  { id: 'chat',      label: 'Chat',      icon: <MessageCircle size={16}/>, emoji: '💬', prompt: 'You are Nova, a friendly and highly capable AI agent. Be concise, warm, and genuinely helpful. Use markdown when it helps clarity.' },
  { id: 'code',      label: 'Code',      icon: <Code2 size={16}/>,         emoji: '💻', prompt: 'You are Nova, an expert coding assistant. Write clean, commented code. Explain what each part does. Use markdown code blocks with language tags.' },
  { id: 'math',      label: 'Math',      icon: <Calculator size={16}/>,    emoji: '🔢', prompt: 'You are Nova, a patient math tutor. Solve problems step by step with clear explanations. Show all working.' },
  { id: 'write',     label: 'Write',     icon: <Pencil size={16}/>,        emoji: '✍️', prompt: 'You are Nova, a skilled writing assistant. Help with essays, emails, stories, any written content. Be expressive and polished.' },
  { id: 'explain',   label: 'Explain',   icon: <Lightbulb size={16}/>,     emoji: '💡', prompt: 'You are Nova, an expert teacher. Explain concepts clearly using analogies and simple language. Make complex ideas memorable.' },
  { id: 'translate', label: 'Translate', icon: <Languages size={16}/>,     emoji: '🌐', prompt: 'You are Nova, a multilingual translator. Translate accurately and naturally. Note cultural nuances when relevant.' },
  { id: 'summarize', label: 'Summarize', icon: <FileText size={16}/>,      emoji: '📋', prompt: 'You are Nova, a summarization expert. Create clear, concise summaries with key points. Use headers and bullets where useful.' },
  { id: 'plan',      label: 'Plan',      icon: <CheckSquare size={16}/>,   emoji: '📅', prompt: 'You are Nova, a strategic planning assistant. Create structured, actionable plans with clear steps and priorities.' },
]

const SUGGESTIONS = [
  { label: '🐍 Python code', text: 'Write a Python function that checks if a number is prime' },
  { label: '🧠 Explain AI',  text: 'Explain how AI language models work in simple terms' },
  { label: '📅 Study plan',  text: 'Create a 30-day learning roadmap for React for a beginner' },
  { label: '✉️ Write email', text: 'Help me write a professional email to my teacher asking for extra help' },
]

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function App() {
  const [messages, setMessages]               = useState([])
  const [history, setHistory]                 = useState([])
  const [input, setInput]                     = useState('')
  const [activeTool, setActiveTool]           = useState(TOOLS[0])
  const [isLoading, setIsLoading]             = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const messagesEndRef = useRef(null)
  const textareaRef    = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  function handleInput(e) {
    setInput(e.target.value)
    const el = textareaRef.current
    if (el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 120) + 'px' }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  async function sendMessage(overrideText) {
    const text = (overrideText || input).trim()
    if (!text || isLoading) return

    setShowSuggestions(false)
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const userMsg = { role: 'user', text, time: getTime() }
    setMessages(prev => [...prev, userMsg])

    // Groq uses OpenAI-compatible format
    const newHistory = [...history, { role: 'user', content: text }]
    setHistory(newHistory)
    setIsLoading(true)

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: activeTool.prompt },
            ...newHistory,
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error.message)

      const reply = data?.choices?.[0]?.message?.content
        || '⚠️ No response received. Please try again.'

      setHistory(prev => [...prev, { role: 'assistant', content: reply }])
      setMessages(prev => [...prev, {
        role: 'assistant', text: reply, time: getTime(),
        toolEmoji: activeTool.emoji, toolLabel: activeTool.label,
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `⚠️ **Error:** ${err.message}\n\nMake sure your Groq API key is correct on **line 11** of App.jsx`,
        time: getTime(),
      }])
    } finally {
      setIsLoading(false)
      textareaRef.current?.focus()
    }
  }

  function clearChat() { setMessages([]); setHistory([]); setShowSuggestions(true) }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">✨</div>
          <span className="logo-text">Nova</span>
        </div>
        <div className="sidebar-label">Modes</div>
        {TOOLS.map(tool => (
          <div
            key={tool.id}
            className={`tool-btn ${activeTool.id === tool.id ? 'active' : ''}`}
            onClick={() => { setActiveTool(tool); textareaRef.current?.focus() }}
          >
            {tool.icon} {tool.label}
          </div>
        ))}
        <div className="sidebar-footer">
          <button className="clear-btn" onClick={clearChat}><Trash2 size={14}/> Clear Chat</button>
          <div className="footer-note">Free · Llama 3.3 70B ✨</div>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div className="agent-info">
            <div className="agent-avatar">✨</div>
            <div>
              <div className="agent-name">Nova AI Agent</div>
              <div className="agent-status"><span className="status-dot"></span> Online · Llama 3.3 70B</div>
            </div>
          </div>
          <div className="mode-badge">{activeTool.emoji} {activeTool.label} Mode</div>
        </div>

        <div className="messages">
          {messages.length === 0 && (
            <div className="msg-row">
              <div className="msg-avatar agent">✨</div>
              <div className="msg-content">
                <div className="bubble agent-bubble">
                  <ReactMarkdown>{`👋 Hi! I'm **Nova**, your personal AI agent — running on **Llama 3.3 70B** via Groq (100% free & super fast!)\n\nI can help with **coding, writing, math, explanations, planning**, and much more!\n\nPick a mode from the sidebar or ask me anything ⬇️`}</ReactMarkdown>
                </div>
                {showSuggestions && (
                  <div className="suggestions">
                    {SUGGESTIONS.map(s => (
                      <span key={s.text} className="sugg-chip" onClick={() => sendMessage(s.text)}>{s.label}</span>
                    ))}
                  </div>
                )}
                <div className="msg-time">{getTime()}</div>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.role === 'user' ? 'user-row' : ''}`}>
              <div className={`msg-avatar ${msg.role === 'user' ? 'user' : 'agent'}`}>
                {msg.role === 'user' ? 'You' : '✨'}
              </div>
              <div className="msg-content">
                {msg.role === 'assistant' && msg.toolLabel && msg.toolLabel !== 'Chat' && (
                  <div className="tool-tag">{msg.toolEmoji} {msg.toolLabel} Mode</div>
                )}
                <div className={`bubble ${msg.role === 'user' ? 'user-bubble' : 'agent-bubble'}`}>
                  {msg.role === 'assistant'
                    ? <ReactMarkdown>{msg.text}</ReactMarkdown>
                    : msg.text}
                </div>
                <div className="msg-time">{msg.time}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="msg-row">
              <div className="msg-avatar agent">✨</div>
              <div className="msg-content">
                <div className="bubble agent-bubble">
                  <div className="typing-bubble">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}/>
        </div>

        <div className="input-area">
          <div className="input-row">
            <textarea
              ref={textareaRef}
              className="msg-textarea"
              placeholder={`Ask Nova to ${activeTool.id === 'chat' ? 'anything...' : activeTool.label.toLowerCase() + ' something...'}`}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
            >
              <ArrowUp size={17}/>
            </button>
          </div>
          <div className="input-hint">Enter to send · Shift+Enter for new line</div>
        </div>
      </div>
    </div>
  )
}