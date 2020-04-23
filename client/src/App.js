import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import DataList from './components/DataList';
import DataModal from './components/dataModel';
import { Provider } from 'react-redux';
import {Container} from 'reactstrap';
import store from './store';
import { loadUser } from './actions/authActions';
import './App.css';

class App extends Component {

componentDidMount(){
  store.dispatch(loadUser());
} 

render(){
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar />
      <Container>
      <DataModal/>
      <DataList />
      </Container>
    </div>
    </Provider>
    );
  }
}
export default App;
