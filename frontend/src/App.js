import './App.scss';
import { Route, Switch } from "react-router-dom";
import Navbar from './components/common/navbar/Navbar';
import Footer from './components/common/footer/Footer';
import Error from './components/pages/error/Error'
import protectedRoutes from './routes/protected';
import publicRoutes from './routes/public';
import { useSelector } from "react-redux";

function App() {
  const userAuthentication = useSelector(state => state.userAuthentication);
  return (
    <div className='app' style={!userAuthentication?{margin:"0px"}:{}}>
      {userAuthentication ?
        <header className='l-header'>
          <Navbar />
        </header> : null}
      <main className='l-main' style={!userAuthentication?{height:"calc(100vh)"}:{}}>
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
      {
        userAuthentication ? <footer className='l-footer'>
          <Footer />
        </footer> : null
      }

    </div>
  );
}

export default App;
