import React from "react";
import Sidebar from "../components/Sidebar";
import supabase from "../config/supabaseClient";

function Home() {
  console.log(supabase)
  return (
    
    <div className="home">
      <Sidebar/>
      <h1>Home</h1>
    </div>
  );
}

export default Home;