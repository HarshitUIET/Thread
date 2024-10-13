import { Suspense } from 'react';
import Login from './login';

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<Spinner />}>
      <Login />
    </Suspense>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  );
}
