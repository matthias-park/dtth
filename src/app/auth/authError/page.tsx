// pages/auth/signin-error.js
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SignInErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      <h1>Sign In Error</h1>
      {error && <p style={{ color: 'red' }}>Error: {'An unknown error occurred.'}</p>}
      <p>Please try signing in again.</p>
      <Link href="/">
        <button>Go to Home Page</button>
      </Link>
    </div>
  );
};