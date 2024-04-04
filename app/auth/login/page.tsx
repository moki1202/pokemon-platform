import React from 'react'
import SupabaseLogo from '@/components/logo-supabase'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white/10 rounded-md p-6 border border-white/5 w-[300px]">
        <div className="flex justify-center mb-6 mt-2"><SupabaseLogo/></div>
        
        <form className='flex flex-col gap-2'>
          <Label htmlFor="username">Username:</Label>
          <Input id="username" name="username" type="username" required />
          <Label htmlFor="email">Email:</Label>
          <Input id="email" name="email" type="email" required />
          <Label htmlFor="password">Password:</Label>
          <Input id="password" name="password" type="password" required/>
          <Separator />
          <Button formAction={login}>Log in</Button>
          <Button formAction={signup}>Sign up</Button>
        </form>
      </div>
    </main>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
  return <button className="rounded hover:bg-white hover:text-black font-semibold px-4 py-2 border border-white/20 transition duration-100 ease-in-out" {...rest}>
    {children}
  </button>
}

const Input: React.FC<InputProps> = ({...rest}) => {
  return <input className="rounded px-4 py-2 text-white outline-none bg-black/30 border border-white/10 focus:bg-white focus:text-black" {...rest}/>
}

const Label: React.FC<LabelProps> = ({children, ...rest}) => {
  return <label {...rest} className="text-sm text-white/30">{children}</label>
}

const Separator = () => <hr className="border-white/10 my-2"/>