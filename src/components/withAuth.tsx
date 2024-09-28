import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from './AuthProvider';

export default function withAuth(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { user, status } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return;

      if (!user) router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, status]);

    return user ? <WrappedComponent {...props} /> : null;
  };
}
