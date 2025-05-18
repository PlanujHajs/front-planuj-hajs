import { useContext } from 'react';

import AuthContext, { AuthContextType } from './AuthContext';

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!(ctx as AuthContextType | undefined))
    throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default useAuth;
