import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { login } from "../firebase";

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Add an authentication state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleEmailSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // User registered successfully
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // User signed in successfully
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      // User signed in with Google successfully
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // User signed out successfully
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <h1>destiNation</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName || user.email}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleEmailSignUp}>
            Register
          </button>
          <button onClick={handleEmailSignIn}>
            Sign In
          </button>
          <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
};

export default Login;
