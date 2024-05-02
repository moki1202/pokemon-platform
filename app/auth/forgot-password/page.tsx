'use client'

import { redirect } from 'next/dist/server/api-utils';
import { supabaseConfig } from '../supabase/supabase-config'

const supabase = supabaseConfig

const PasswordResetPage = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(
              email, {
              redirectTo: "https://pokemon-platform.vercel.app/auth/reset",          
        });

            if (error) {
                console.error('Error resetting password:', error.message);
                alert('An error occurred while resetting your password. Please try again later.');
            } else {
                console.log('Password reset email sent successfully!');
                alert('Password reset email sent successfully!');
            }
        } catch (error: any) {
            console.error('Error:', error.message);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>
              <h1>Password Reset</h1>
              <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                  <button type="submit">Reset Password</button>
              </form>
          </div>
      </div>
  );
};

export default PasswordResetPage;
