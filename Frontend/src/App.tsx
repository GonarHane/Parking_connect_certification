
import "./App.css";
import { Route, Switch } from 'react-router-dom';
import Login from "./Components/login/login";
import Header from "./Components/header/header";
import Dashboard from "./Components/dashboard/dashboard";
import AjoutUtilisateur from "./Components/ajout/ajoutUtilisateur";
import Tableaux from "./Components/tableaux/tableaux";




function App() {

  return (
    //<Header />//
   // <Login />//
   //<Dashboard/>//
   // <AjoutUtilisateur/>//
   // <ListeUtilisateur/>//
   <div>
   <Switch>
     <Route path="/" Component={Login} />
     <Route path="/Dashboard" Component={Dashboard} />
     <Route path="/Tableaux" Component={Tableaux}/>
     
   </Switch>
 </div>
  );
}

export default App;
