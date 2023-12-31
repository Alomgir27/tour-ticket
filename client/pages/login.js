import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import GoogleSvg from '@/components/Svg/GoogleSvg';
import { HiArrowLongRight } from 'react-icons/hi2';
import { AuthRepo } from '@/App/Repositories/Auth/AuthRepo';


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await AuthRepo.login(formData);
    if (res?.status === 200) {
      signIn('credentials', {
        email: formData.email,
        password: formData.password,
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res));
        })
    } else {
      setLoading(false);
      setError(res?.data?.message);
      console.log(res);
    }
  }

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-orange-100">
      <p className="text-center text-xl font-semibold text-gray-900">{error}</p>
    </div>
  )


  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-orange-100">
      <p className="text-center text-xl font-semibold text-gray-900">Logging in...</p>
    </div>
  )


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="card p-4 shadow-lg rounded-lg bg-white border border-gray-200 w-full max-w-md space-y-8 bg-gradient-to-b from-orange-50 to-orange-100/0">
        <div>
          <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">Log in to your account</h2>
        </div>
        {/* Google Sign-in Button */}
        <div className="text-center mt-4">
          <button
            onClick={() => signIn('google')}
            className="group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border border-gray-300 hover:border-gray-400 hover:shadow-md transition duration-300 ease-in-out block"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <GoogleSvg />
                <span className="ml-2">Sign in with Google</span>
              </div>
              <div className="flex items-center">
                <HiArrowLongRight className="text-xl" />
              </div>
            </div>
          </button>
        </div>
        <form className="mt-8 space-y-6 card-body" action="#" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px space-y-4">
            <div className="mb-4">
              <label htmlFor="email-address" className="text-sm text-gray-900 mb-1 block font-semibold text-left w-full">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-sm text-gray-900 mb-1 block font-semibold text-left w-full">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
          <div className="mt-4">
            <p className="text-center text-sm text-gray-900">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
