import { useState } from 'react'
import axios from 'axios'

const API_ROOT = import.meta.env.VITE_API_URL || ''

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setError(null)
    try {
      const url = `${API_ROOT}/api/auth/${mode}`
      const payload = mode === 'login' ? { email, password } : { name, email, password }
      const res = await axios.post(url, payload)
      const { token, user } = res.data
      localStorage.setItem('token', token)
      onAuth(user, token)
    } catch (err) {
      setError(err?.response?.data?.error || 'Auth failed')
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={submit}>
        {mode === 'register' && (
          <div>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} autocomplete="name" />
          </div>
        )}
        <div>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} autocomplete="email" />
        </div>
        <div>
          { mode === 'register' ?
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autocomplete="new-password" />
          :
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autocomplete="current-password" />
          }
        </div>
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </div>
  )
}
