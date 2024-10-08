import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header () {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.log(error);
      alert("Login failed, please try again");
    },
  });

  const GetUserProfile = (tokenInfo) => {
    setLoading(true);
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDailog(false);
        window.location.reload();
      })
      .finally(() => setLoading(false));
  };
  
  return (
    <div className='absolute top-0 left-0 right-0 p-3 flex justify-between items-center px-5 z-10 mt-2'>
      <img src="/logo2.png" className='h-[45px] w-[160px] mx-3' />

      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button className='rounded-full' onClick={() => setOpenDailog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button 
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className='h-7 w-7' />Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );


}


export default Header;

