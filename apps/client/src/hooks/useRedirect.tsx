import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useMeQuery } from './useMeQuery'

function useUserRedirect(route: 'guest' | 'private') {
  const navigate = useNavigate()
  const { currentUser, isFetching } = useMeQuery()
  useEffect(() => {
    if (isFetching) return
    if (route === 'guest' && currentUser) {
      navigate('/', { replace: true })
    }
    if (route === 'private' && !currentUser) {
      navigate('/login', { replace: true })
    }
  }, [currentUser, isFetching])
}

export default useUserRedirect
