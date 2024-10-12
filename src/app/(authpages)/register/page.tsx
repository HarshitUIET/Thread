"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import {useRouter} from 'next/navigation'

export default function Register() {

  const router = useRouter();

  const [authState, setAuthState] = useState<AuthStateType>({
    name:"",
    username:"",
    email: "",
    password: "",
    password_confirmation:""
  })

  const [errors,setErrors] = useState<AuthErrors>({})
  const [loading,setLoading] = useState<boolean>(false)

  const submit = async (e:React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    axios.post('/api/auth/register',authState)
    .then((res) => {
      setLoading(false);
      const response = res.data;

      if(response.status === 200) {
         router.push(`login?message=${response.message}`);  
      }
      else if(response.status === 400) {
        setErrors(response.errors);
      }
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    })
  }

  return (
    <div className='bg-background'>
      <div className='h-screen w-screen flex justify-center items-center' >
        <div className='w-full md:w-1/3 bg-muted p-6 rounded-lg mx-2'>
          <div className='flex justify-center' >
            <Image src='/images/logo.svg' width={50} height={50} alt='logo' />
          </div>
          <h1 className='text-2xl font-bold'>Register</h1>
          <p>Welcome to the threads</p>
          <form onSubmit={submit}>
          <div className='mt-5' >
              <Label htmlFor='name' >Name</Label>
              <Input type='name' id='name' placeholder='Enter your name'
                onChange={(e) => setAuthState({ ...authState, name: e.target.value })}
              />
              {errors.name && <span className='text-red-500' >{errors.name}</ 
              span>}
            </div>
            <div className='mt-5' >
              <Label htmlFor='username' >Username</Label>
              <Input type='username' id='username' placeholder='Enter your username'
                onChange={(e) => setAuthState({ ...authState, username: e.target.value })}
              />
              {errors.username && <span className='text-red-500' >{errors.username}</
              span>}
            </div>
            <div className='mt-5' >
              <Label htmlFor='email' >Email</Label>
              <Input type='email' id='email' placeholder='Enter your email'
                onChange={(e) => setAuthState({ ...authState, email: e.target.value })}
              />
              {errors.email && <span className='text-red-500' >{errors.email}</span>}
            </div>
            <div className='mt-5' >
              <Label htmlFor='password' >Password</Label>
              <Input type='password' id='password' placeholder='Enter your password'
                onChange={(e) => setAuthState({ ...authState, password: e.target.value })}
              />
              {errors.password && <span className='text-red-500' >{errors.password}</span>}
            </div>
            <div className='mt-5' >
              <Label htmlFor='password_confirmation' >Confirm Password</Label>
              <Input type='password' id='password_confirmation' placeholder='Confirm your password'
                onChange={(e) => setAuthState({ ...authState, password_confirmation: e.target.value })}
              />
              {errors.password_confirmation && <span className='text-red-500' >{errors.password_confirmation}</span>}
            </div>
            <div className='mt-5' >
              <Button className='w-full' onClick={submit}
              disabled={loading}
              >
                {loading ? "Loading..." : "Register"}
              </Button>
            </div>
            <div className='mt-5' >
              <span>Already have an account ?
                <Link className='text-orange-400 font-bold ml-2' href='/login'>Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

