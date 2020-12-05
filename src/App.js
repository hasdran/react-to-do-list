import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';

import ToDoList from './pages/ToDoList/ToDoList';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={ToDoList} />
      </Switch>
    </BrowserRouter >
  );
}

export default App;
