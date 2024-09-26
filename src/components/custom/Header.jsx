import React from 'react'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
     <img src="/logo.svg" className='size-22'/>
     <div>
      <Button>Sign In</Button>
     </div>
    </div>
   
  )
}

export default Header