'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store/store'

interface LoginGuardProps {
  children: ReactNode
}

const LoginGuard: React.FC<LoginGuardProps> = ({ children }) => {
  const { accessToken } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  useEffect(() => {
    if (accessToken) {
      router.replace('/')
    }
  }, [accessToken, router])

  return <>{domLoaded && !accessToken && <>{children}</>}</>
}

export default LoginGuard
