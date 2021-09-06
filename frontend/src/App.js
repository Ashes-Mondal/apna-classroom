import './App.scss';
import { Route, Switch } from "react-router-dom";
import Navbar from './components/common/navbar/Navbar';
import Footer from './components/common/footer/Footer';
import Error from './components/pages/error/Error'
import protectedRoutes from './routes/protected';
import publicRoutes from './routes/public';
import { useSelector} from "react-redux";

function App() {
  const userAuthentication = useSelector(state => state.userAuthentication);
  return (
    <>
      <header className='l-header'>
        <Navbar />
      </header>
      <main className='l-main'>
        <Switch>
          {
            publicRoutes.map((route, index) => {
              return (
                <Route
                  key={index}
                  exact path={route.path}
                  component={route.component}
                />
              );
            })
          }
          {
            userAuthentication ?
              protectedRoutes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    exact path={route.path}
                    component={route.component}
                  />
                );
              })
              :
              null
          }
          <Route
            exact path='*'
            component={Error}
          />
        </Switch>
      </main>
      <footer className='l-footer'>
        <Footer />
      </footer>
    </>
  );
}

export default App;
