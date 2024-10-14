'use client'
import GoogleSignInButton from "@/components/Auth/GoogleSignInButton";
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-white text-center p-8">
      <div className="">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto"
        />
        </Link>
      </div>
      <div className="bg-white p-24">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-8">Welcome Back!</h2>
          <p className="text-xl text-gray-500">Please sign in to access the content.</p>
        </div>
        <GoogleSignInButton>
          <div className="flex items-center justify-center">
            <Image
              src="/images/Google.webp"
              alt="Google Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            <span className="text-lg">Sign in with Google</span>
          </div>
        </GoogleSignInButton>
      </div>
      <div className="mt-8 space-x-4">
        <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm">
          Terms
        </Link>
        <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">
          Privacy
        </Link>
      </div>
    </div>
  );
};

export default page;