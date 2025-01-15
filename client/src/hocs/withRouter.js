import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function withRouter (Component) {
  function ComponentWithRouterProp (props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  }

  return ComponentWithRouterProp;
}
