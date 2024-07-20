'use client';
import { useRouter } from 'next/navigation';

import { getValidAuthTokens } from '@/lib/cookies';
import { useEffect } from 'react';
import { logout } from '@/redux/features/auth/auth-slice';
import { RootState } from '@/redux/store';
import { useGetAuthDataQuery } from '@/redux/services/auth/auth-api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const { token, refreshToken } = getValidAuthTokens();

  // this query will only execute if the token is valid and the user email is not already in the redux store
  const { error, isLoading } = useGetAuthDataQuery(
    { token: token || '' },
    {
      // The useGetAuthDataQuery hook will not execute the query at all if these values are falsy
      skip: !token,
    }
  );

  // if the user doesnt have a valid token, redirect to login page

  useEffect(() => {
    if (!token) {
      push('/login');
      // will explain this in a moment
      dispatch(logout());
    }
  }, [token, push]);

  // optional: show a loading indicator while the query is loading
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return children;
};
