import React, { useState, useEffect } from 'react'
import { Circles } from 'react-loader-spinner'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

export default function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 10_000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="animated-text mb-8">
          Smart School. <br /> Simplify School Management, Empower Your Institution.
        </h1>
        <Circles
          height="80"
          width="80"
          color="blue"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    )
  }

  return <>{children}</>
}
