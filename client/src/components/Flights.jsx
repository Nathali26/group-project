import React from 'react'
import { useEffect } from 'react';

export default function Flights() {
  
    //I set the backgrounds here because I was having trouble setting different backgrounds for different components
    useEffect(() => {
      // Set the background image when the component mounts
      document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1592462131333-62cacb894b9e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
  
      // Cleanup function to reset the background when the component unmounts
      return () => {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundAttachment = '';
      };
    }, []);
    
  return (
    <div>
        <h1>Flights</h1>
    </div>
  )
}
