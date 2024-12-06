import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { Navigate } from 'react-router-dom'
import { db } from './firebase'

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  console.log('ProtectedRoute rendered')
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log('auth.onAuthStateChanged called')
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            console.log('User role:', userDoc.data().role)
            setUserRole(userDoc.data().role)
          } else {
            console.error('No such document!')
          }
        } catch (error) {
          console.error('Error fetching user role:', error)
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!auth.currentUser) {
    console.log('No authenticated user')
    return <Navigate to="/login" />
  }

  if (userRole !== role) {
    console.log('User role does not match required role')
    return <Navigate to="/unauthorized" />
  }

  return <Component {...rest} />
}

export default ProtectedRoute
