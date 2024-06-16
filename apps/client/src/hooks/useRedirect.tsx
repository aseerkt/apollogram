import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMeQuery } from '../generated/graphql'

function useRedirect(route: 'guest' | 'private') {
  const navigate = useNavigate()
  const { data, loading } = useMeQuery()

  useEffect(() => {
    if (loading) return
    if (route === 'guest' && data?.me) {
      navigate('/', { replace: true })
    }
    if (route === 'private' && !data?.me) {
      navigate('/login', { replace: true })
    }
  }, [data, loading])
}

export default useRedirect
