import {Container} from '@material-ui/core'
import Navbar from './navbar/Navbar.js'
import Home from './home/Home'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Auth from './auth/Auth.js'

function App() {

  return (
    <BrowserRouter>
     <Container maxwidth='lg'>
     <Navbar/>
     <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/auth' component={Auth}/>
     </Switch>
     
    </Container>
    </BrowserRouter>
   
  );
}

export default App;
