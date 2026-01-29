import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    const { error } = await signIn(email, password);

    if (error) {
      setLoginError(error.message);
      setIsLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-primary-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/shippo.png')]"></div>

      <div className="bg-white rounded-sm shadow-2xl p-8 w-full max-w-md relative z-10 border-t-4 border-accent-500">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-primary-900 rounded-full flex items-center justify-center mb-6 shadow-xl border-2 border-accent-500/30">
            <Lock className="h-10 w-10 text-accent-400" />
          </div>
          <h1 className="text-3xl font-playfair font-bold text-primary-900 tracking-tight">Yoshihara Admin</h1>
          <p className="text-primary-500 mt-2 font-light tracking-wide italic">Secure Portal Access</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-primary-400 mb-2 tracking-[0.2em] uppercase">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-primary-100 rounded-sm focus:ring-1 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all placeholder:text-primary-200"
              placeholder="admin@yoshihara.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-primary-400 mb-2 tracking-[0.2em] uppercase">Security Key</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-primary-100 rounded-sm focus:ring-1 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all pr-12 placeholder:text-primary-200"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-300 hover:text-primary-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-sm">
              <p className="text-red-600 text-xs font-medium">{loginError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-900 text-accent-400 py-4 rounded-sm hover:bg-primary-850 transition-all duration-300 font-bold tracking-[0.2em] uppercase text-xs shadow-xl active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Authenticate'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
