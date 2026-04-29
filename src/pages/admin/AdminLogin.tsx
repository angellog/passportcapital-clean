import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, resetPassword, user, isAdmin, isModerator } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (isAdmin || isModerator)) {
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, isModerator, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (forgotPassword) {
      const { error } = await resetPassword(email);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset link sent. Check your email.');
        setForgotPassword(false);
      }
      setLoading(false);
      return;
    }

    if (isSignUp) {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Account created. Check your email to confirm, then sign in.');
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        navigate('/admin');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-royal-dark p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {forgotPassword ? 'Reset Password' : isSignUp ? 'Create Account' : 'Admin Login'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Passport Capital Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          {!forgotPassword && (
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Please wait...' : forgotPassword ? 'Send Reset Link' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-4 text-center space-y-2">
          {!forgotPassword && (
            <button onClick={() => setForgotPassword(true)} className="text-sm text-muted-foreground hover:text-primary">
              Forgot password?
            </button>
          )}
          <div>
            <button
              onClick={() => { setIsSignUp(!isSignUp); setForgotPassword(false); }}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </button>
          </div>
          {forgotPassword && (
            <button onClick={() => setForgotPassword(false)} className="text-sm text-muted-foreground hover:text-primary">
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
