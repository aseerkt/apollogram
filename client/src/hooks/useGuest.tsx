import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMeQuery } from '../generated/graphql';

function useGuest() {
  const history = useHistory();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading && data?.me) {
      history.replace('/');
    }
  }, [data, loading]);
}

export default useGuest;
