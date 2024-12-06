import React, { useState } from 'react'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db, app } from '../../firebase'
import { FaGoogle } from 'react-icons/fa'
import '../../style.css'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const auth = getAuth(app)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userRole = userDoc.data().role
        if (userRole === 'admin') {
          navigate('/admin')
        } else if (userRole === 'teacher') {
          navigate('/teacher')
        } else if (userRole === 'student') {
          navigate('/student')
        } else {
          navigate('/unauthorized')
        }
      } else {
        console.error('No such document!')
      }
      alert('Login successful')
      setEmail('') // Clear email input
      setPassword('') // Clear password input
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed')
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userRole = userDoc.data().role
        if (userRole === 'admin') {
          navigate('/admin')
        } else if (userRole === 'teacher') {
          navigate('/teacher')
        } else if (userRole === 'student') {
          navigate('/student')
        } else {
          navigate('/unauthorized')
        }
      } else {
        console.error('No such document!')
      }
      alert(`Login successful: ${user.displayName}`)
    } catch (error) {
      console.error('Google login failed:', error)
      alert('Google login failed')
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <h1 className="text-color">Login</h1>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <hr />
      <div className="d-flex justify-content-center">
        <button onClick={handleGoogleLogin} className="btn btn-danger">
          <FaGoogle /> Login with Google
        </button>
      </div>
    </>
  )
}

export default Login
