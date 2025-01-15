import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { getUser } from '../../../store/slices/userSlice';
import Spinner from '../../Spinner/Spinner';

const OnlyNotAuthorizedUserRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector(state => state.userStore);

  useEffect(() => {
    dispatch(getUser(navigate));
  }, []);

  if (isFetching) {
    return <Spinner />;
  }

  return data ? navigate('/') : <Outlet />;
};

export default OnlyNotAuthorizedUserRoute;
