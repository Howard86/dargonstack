import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchGeneration } from 'store/generation/actions';
import { RootState } from 'store/reducers';
import { FetchStates } from 'constants/fetch';

const MINIMUM_DELAY = 3000;

const Generation: FC = () => {
  const dispatch = useDispatch();
  const { expiration, status, id, message } = useSelector(
    ({ generation }: RootState) => generation,
  );

  const isError = status === FetchStates.ERROR;
  const expirationTime = moment(new Date(expiration)).format('h:mm:ss a');

  useEffect(() => {
    let delay = new Date(expiration).getTime() - new Date().getTime();

    if (delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY;
    }

    const timer = setTimeout(() => dispatch(fetchGeneration()), delay);
    return () => clearTimeout(timer);
  }, [expiration]);

  return isError ? (
    <div>{message}</div>
  ) : (
    <div className='card'>
      <div className='card-heading'>
        <h3 className='card-title'>{`Generation ${id}`}</h3>
      </div>
      <div className='card-body'>
        <h4>{`Expires at ${expirationTime}`}</h4>
      </div>
    </div>
  );
};

export default Generation;
