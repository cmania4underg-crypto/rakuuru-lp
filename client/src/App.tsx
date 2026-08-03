import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Thanks from "./pages/Thanks";

function App() {
  return (
    <Switch>
      <Route path="/thanks" component={Thanks} />
      <Route path="/" component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

export default App;
