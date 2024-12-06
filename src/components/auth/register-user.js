import React, { useState, useEffect } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { FaGoogle } from 'react-icons/fa'
import { db, app } from '../../firebase'
import '../../style.css'

const RegisterUser = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student') // Default role

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
        })
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await registerUser(username, email, password, role)
      alert('Registration successful')
      setUsername('') // clear username input
      setEmail('') // Clear email input
      setPassword('') // Clear password input
      setRole('student') // Reset role to default
    } catch (error) {
      alert('Registration failed')
    }
  }

  const handleGoogleSignup = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role, // Assign the selected role
        username: user.displayName || 'Google User', // Use displayName or a default value
      })
      alert(`Login successful: ${user.displayName}`)
    } catch (error) {
      alert('Google login failed')
    }
  }

  return (
    <>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <h1 className="text-color">Register</h1>
          <label htmlFor="registerUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="registerUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registerEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registerPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Register
          </button>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
      </form>
      <hr />
      <div className="d-flex justify-content-center">
        <button onClick={handleGoogleSignup} className="btn btn-danger">
          <FaGoogle /> Register with Google
        </button>
      </div>
    </>
  )
}

const registerUser = async (username, email, password, role) => {
  const auth = getAuth(app)
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: user.email,
      role: role,
    })
    console.log('User registered with role:', role)
  } catch (error) {
    console.error('Error registering user:', error)
  }
}

export default RegisterUser
