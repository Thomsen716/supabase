import React, { createContext, useState, useEffect, ReactNode } from "react";

import {
  AuthError,
  PostgrestError,
  Session,
  User,
  WeakPassword,
} from "@supabase/supabase-js";
import { supabase } from "./Supabase";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signInSupabase: (
    email: string,
    password: string
  ) => Promise<
    | {
        error: AuthError;
        data?: undefined;
      }
    | {
        data: {
          user: User;
          session: Session;
          weakPassword?: WeakPassword;
        };
        error?: undefined;
      }
  >;
  // Definer returtypen
  signOutSupabase: () => Promise<
    | {
        data?: undefined;
        error: AuthError;
      }
    | {
        data: boolean;
        error?: undefined;
      }
  >;
  signUpSupabase: (
    email: string,
    password: string
  ) => Promise<
    | {
        error: AuthError;
        data?: undefined;
      }
    | {
        error?: undefined;
        data: boolean;
      }
  >;
  updateUserProfileSupabase: (
    userId: string,
    firstName: string,
    lastName: string
  ) => Promise<
    | {
        error: PostgrestError;
        data?: undefined;
      }
    | {
        error?: undefined;
        data: boolean;
      }
  >;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signInSupabase = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      return { error };
    }
    setSession(data.session);
    setUser(data.user);
    return { data };
  };

  const signOutSupabase = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return { error };
    }
    setSession(null);
    setUser(null);
    return { data: true };
  };

  const signUpSupabase = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error(error);
      return { error };
    }
    return { data: true };
  };

  const updateUserProfileSupabase = async (
    userId: string,
    firstName: string,
    lastName: string
  ) => {
    const { error } = await supabase
      .from("profiles")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", userId);
    if (error) {
      console.error(error);
      return { error };
    }
    return { data: true };
  };

  const value: AuthContextType = {
    session,
    user,
    loading,
    signInSupabase,
    signOutSupabase,
    signUpSupabase,
    updateUserProfileSupabase,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };

// I din App.tsx eller en anden top-level komponent:
// import { AuthProvider } from './AuthContext';
//
// function App() {
//   return (
//     <AuthProvider>
//       {/* Dine andre komponenter */}
//     </AuthProvider>
//   );
// }

// I en komponent, hvor du har brug for session-oplysninger:
// import { useAuth } from './AuthContext';
//
// const MyComponent: React.FC = () => {
//   const { session, user } = useAuth();
//
//   if (session) {
//     console.log('Session:', session); // TypeScript ved, at session er af typen Session | null
//     console.log('Bruger:', user); // TypeScript ved, at user er af typen User | null
//     // Brug session.access_token til API-kald osv.
//   }
//
//   return (
//     <div>
//       {user ? <p>Velkommen, {user.email}</p> : <p>Du er ikke logget ind</p>}
//     </div>
//   );
// };
