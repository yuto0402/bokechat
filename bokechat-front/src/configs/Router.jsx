import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Bottom from '../components/Bottom';
import SearchPage from '../pages/SearchPage';
import SchedulePage from '../pages/SchedulePage';
import GroupPage from '../pages/GroupPage';
import ProfilePage from '../pages/ProfilePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import { AuthProvider, useAuth } from '../hook/AuthContext';
import PropTypes from 'prop-types';
import GroupDetailPage from '../pages/GroupDetailPage';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <PrivateRoute>
          <Bottom />
        </PrivateRoute>
      </AuthProvider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'groups', element: <GroupPage /> },
      { path: 'group/:uuid', element: <GroupDetailPage /> },
      { path: 'schedule', element: <SchedulePage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  { path: '/signup', element: <SignupPage /> },
  { path: '/login', element: <AuthProvider><LoginPage /></AuthProvider> },
]);

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // childrenを必須のノードとして指定
};

export default router;
