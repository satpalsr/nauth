'use client'

import { FC, ReactNode, useState } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {

  const { data: session } = useSession();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleAvatarClick = () => {
    setShowOverlay(!showOverlay);
  };

  const loginWithGoogle = () => 
    signIn("google", { callbackUrl: "https://minuteforecast.onrender.com/" });

  return (
    <>
    { session ? (
      <div className="relative">
          <div onClick={handleAvatarClick} className="cursor-pointer">
            {session.user.image ? (
              <div className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={40}
                height={40}
              />
            </div>            
            ) : (
              <div className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={'/images/avatar.webp'}
                alt={session.user.name}
                width={40}
                height={40}
              />
            </div> 
            )}
          </div>
          {showOverlay && (
            <div className="absolute bottom-full mb-2 w-48 rounded-md shadow-lg bg-gray-500">
              <div className="py-3 px-4 text-sm">
                <button onClick={() => signOut()} className="w-full text-left text-white">Sign Out</button>
              </div>
            </div>
          )}
        </div>) : (
    <button
        onClick={loginWithGoogle}
      className="bg-[#2b2826] hover:bg-[#181615] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >
        {children}
    </button>
    )}
    </>
  );
};

export default GoogleSignInButton;