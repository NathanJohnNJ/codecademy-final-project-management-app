import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Auth from './Auth'

const API_ROOT = import.meta.env.VITE_API_URL || ''

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const tokenUser = null
    // If token exists, you may want to fetch user info or trust stored data.
    const token = localStorage.getItem('token')
    if (token) {
      // Optionally decode or fetch profile. For now, try fetching users list.
      fetchUsers()
    }
  }, [])

  async function fetchUsers() {
    try {
      const res = await axios.get(`${API_ROOT}/api/users`, { headers: authHeaders() })
      setUsers(res.data)
    } catch (err) {
      setError('Failed to fetch users')
    }
  }

  async function addUser(e) {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_ROOT}/api/users`, { name, email }, { headers: authHeaders() })
      setUsers(prev => [...prev, res.data])
      setName('')
      setEmail('')
    } catch (err) {
      setError('Failed to add user')
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`${API_ROOT}/api/users/${id}`, { headers: authHeaders() })
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      setError('Failed to delete user')
    }
  }

  function handleAuth(userData, token) {
    setUser(userData)
    fetchUsers()
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    setUsers([])
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Project Management Tool</h1>
      {user ? (
        <div>
          <div>Logged in as: {user.name} ({user.email}) <button onClick={logout}>Logout</button></div>
        </div>
      ) : (
        <Auth onAuth={handleAuth} />
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={addUser} style={{ marginBottom: 20 }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} ({u.email}) <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
