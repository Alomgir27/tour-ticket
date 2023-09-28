import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function withAuth(Component) {
  return function Authenticated(props) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      // Check if the user is authenticated
      if (!session) {
        // Redirect to the login page if not authenticated
        router.push('/login'); // Replace with your login page URL
      }
    }, [session, router]);

    // Render the component if the user is authenticated
    return session ? <Component {...props} /> : null;
  };
}
