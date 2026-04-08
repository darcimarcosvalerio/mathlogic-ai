'use client'

import { useState } from 'react'

export default function MathLogicPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!input) return
    setLoading(true)
    setOutput('')
    
    try {
      const response = await fetch('http://localhost:3333/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: input, level: 'iniciante' })
      })

      if (!response.body) return
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        setOutput((prev) => prev + decoder.decode(value))
      }
    } catch (err) {
      console.error(err)
      setOutput('Erro ao conectar com o backend. Verifique se ele está rodando na porta 3333.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#09090b', color: 'white', minHeight: '100vh' }}>
      <h1>MathLogic AI</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #27272a', backgroundColor: '#18181b', color: 'white' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: Teorema de Pitágoras"
        />
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? 'Gerando...' : 'Gerar Fluxo'}
        </button>
      </div>
      <div style={{ whiteSpace: 'pre-wrap', backgroundColor: '#18181b', padding: '20px', borderRadius: '8px', border: '1px solid #27272a' }}>
        {output || 'O roteiro aparecerá aqui...'}
      </div>
    </main>
  )
}