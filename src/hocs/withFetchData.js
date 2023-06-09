import React, { useState, useEffect, useCallback, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function withFetchData(WrappedComponent, fetchDataFn) {
  return function(props) {
    const [data, setData] = useState([]);
    const auth = useContext(AuthContext);

    const onDataFetch = useCallback(async () => {
      const json = await fetchDataFn(auth.token);
      if (json) {
        setData(json);
      }
    }, [auth.token]);

    useEffect(() => {
      onDataFetch();
    }, [onDataFetch]);

    return <WrappedComponent {...props} data={data} />;
  }
}

export default withFetchData;
