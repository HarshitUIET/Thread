"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const { status } = useSession();
  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState<AuthStateType>({
    email: "",
    password: ""
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios.post('/api/auth/login', authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status === 200) {
          signIn('credentials', {
            email: authState.email,
            password: authState.password,
            callbackUrl: '/',
            redirect: true
          });
        } else if (response.status === 400) {
          setErrors(response.errors);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <div className='bg-background'>
      <div className='h-screen w-screen flex justify-center items-center'>
        <div className='w-full md:w-1/3 bg-muted p-6 rounded-lg mx-2'>
          <div className='flex justify-center'>
            <Image src='/images/logo.svg' width={50} height={50} alt='logo' />
          </div>

          {params.get("message") && (
            <div className='bg-green-500 p-4 rounded-lg my-4'>
              <strong>Success</strong> {params.get("message")}
            </div>
          )}

          <h1 className='text-2xl font-bold'>Login</h1>
          <p>Welcome Back</p>
          <form onSubmit={submit}>
            <div className='mt-5'>
              <Label htmlFor='email'>Email</Label>
              <Input type='email' id='email' placeholder='Enter your email'
                onChange={(e) => setAuthState({ ...authState, email: e.target.value })} />
              {errors.email && <span className='text-red-500'>{errors.email}</span>}
            </div>
            <div className='mt-5'>
              <Label htmlFor='password'>Password</Label>
              <Input type='password' id='password' placeholder='Enter your password'
                onChange={(e) => setAuthState({ ...authState, password: e.target.value })} />
              {errors.password && <span className='text-red-500'>{errors.password}</span>}
            </div>
            <div className='mt-5'>
              <Button className='w-full' onClick={submit} disabled={loading}>
                {loading ? 'Logging In...' : 'Login'}
              </Button>
            </div>
            <div className='mt-5'>
              <span>Don't have an account?
                <Link className='text-orange-400 font-bold ml-2' href='/register'>Register</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
