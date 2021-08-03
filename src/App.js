import './App.css';
import Home from './components/Home';
import { Switch, Route } from "react-router-dom";
import Meanings from './components/Meanings';
import Phonetics from './components/Phonetics';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/meanings/:lg/:word/" component={Meanings}></Route>
        <Route path="/phonetics/:lg/:word/" component={Phonetics}></Route>
      </Switch>
    </>
  );
}

export default App;
