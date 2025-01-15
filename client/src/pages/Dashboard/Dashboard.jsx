import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';

const Dashboard = props => {
  const navigate = useNavigate();
  const params = useParams();

  const { role } = useSelector(state => state.userStore.data);
  return role === CONSTANTS.CUSTOMER ? (
    <CustomerDashboard navigate={navigate} params={params} />
  ) : (
    <CreatorDashboard navigate={navigate} params={params} />
  );
};

export default Dashboard;
