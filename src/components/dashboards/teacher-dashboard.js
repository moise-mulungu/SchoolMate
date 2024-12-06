import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { Oval } from 'react-loader-spinner'

const TeacherDashboard = () => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            setUsername(userDoc.data().username)
          } else {
            console.log('No such document!')
          }
        } else {
          console.log('No user is signed in.')
        }
      } catch (error) {
        console.error('Error fetching username:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsername()
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <Oval color="#00BFFF" height={80} width={80} />
      </div>
    )
  }

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>Welcome {username} to the Teacher Dashboard.</p>
    </div>
  )
}

export default TeacherDashboard