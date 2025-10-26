//import './App.css'

import {Guild} from "./model.ts"


function App() {
  
  const guild = new Guild();
  
  guild.update();
  
  setInterval(() => {guild.update()}, 10000);
  
  window.guild = guild;

  return (
    <>
    </>
  )
}


export default App
