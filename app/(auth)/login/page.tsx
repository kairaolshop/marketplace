'use client';

import { useLogin } from '@/app/hooks/use-login';
import Image from 'next/image';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignInPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    isLogin,
    setIsLogin,
    errors,
    setErrors,
    setTouched,
    isLoading,
    disabled,
    handleSubmit,
    handleGoogleSignIn,
    handleBlur,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);


  return (
    <main className="relative min-h-screen w-full flex items-center justify-center">
      <div className=" absolute inset-0 -z-10">
        <Image
          src="/login-bg.png"
          alt="Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Selamat Datang</h1>
        </div>
        <section className="flex-1 text-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {isLogin ? 'Log In' : 'Sign Up'}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4 text-white">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Nama
                </label>
                <input
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  id="name"
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  required={!isLogin}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-6 relative">
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                className={`w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/3 translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              className="w-full bg-[#8b5bff]/70 text-lg text-white p-2 rounded-md font-semibold hover:bg-[#8b5bff] border disabled:bg-gray-400"
              type="submit"
              disabled={isLoading || disabled}
            >
              {isLoading ? 'Memproses...' : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="flex items-center justify-center my-6 text-white">
            <span className="text-lg text-gray-500">
              {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
            </span>
            <button
              className="ml-2 text-blue-500 font-semibold hover:text-blue-700"
              onClick={() => {
                setIsLogin(!isLogin);
                setName('');
                setEmail('');
                setPassword('');
                setErrors({});
                setTouched({ email: false, password: false, name: false });
              }}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
          <div className="flex items-center mb-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-sm text-gray-400 mx-3 select-none">ATAU</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full text-white flex items-center justify-center bg-[#8b5bff]/70 border border-gray-300 text-gray-700 p-3 rounded-md font-semibold hover:bg-[#8b5bff]"
          >
            <Image src="/google-icon.svg" alt="Google Icon" width={24} height={24} className="mr-2 bg-white rounded-full" />
            Login dengan Google
          </button>
        </section>
      </div>
    </main>
  );
}