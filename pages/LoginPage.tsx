import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

// This page handles both user login and registration.
// It uses local state to manage which form is visible and to handle form inputs.
const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { setFlashMessage } = useData();

  // State for forms
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(loginEmail, loginPassword);
    setIsLoading(false);
    if (result === 'error') {
      setError('Invalid email or password.');
    } else {
      setFlashMessage(`Welcome back!`);
      navigate(result === 'admin' ? '/admin' : '/');
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if(regPassword.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    setIsLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setIsLoading(false);
    if (result === 'exists') {
      setError('An account with this email already exists.');
    } else {
      setFlashMessage('Registration successful! Welcome.');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-200">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="••••••••" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-700 hover:bg-brand-600 disabled:bg-gray-600">
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" value={regName} onChange={e => setRegName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="Your full name"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="you@example.com"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="At least 6 characters"/>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600">
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-800 text-gray-300">Or</span></div>
            </div>
            <div className="mt-6">
              <button onClick={() => { setIsLogin(!isLogin); setError('') }} className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-200 hover:bg-gray-600">
                {isLogin ? 'Create new account' : 'Sign in to existing account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;