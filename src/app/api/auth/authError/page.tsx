

import Link from 'next/link';

export default function SignInErrorPage() {

  return (
    <div>
      <h1>Sign In Error</h1>
      <p>Please try signing in again.</p>
      <Link href="/">
        <button>Go to Home Page</button>
      </Link>
    </div>
  );
};