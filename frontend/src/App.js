import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/footer/Footer";
import Error from "./components/pages/error/Error";
import protectedRoutes from "./routes/protected";
import publicRoutes from "./routes/public";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/pages/login/Login";
import { useEffect } from "react";
import { fetchUserDetails, fetchUserEnrolledClassrooms } from "./axios/user";
import { setUserAuth } from "./redux/actions/userAuthentication";
import { updateClassrooms } from "./redux/actions/enrolledClassrooms";
import enrolledClassrooms from "./Dummy-data/enrolledClassrooms";
import userDetails from "./Dummy-data/userDetails";
import { updateThemes } from "./redux/actions/theme";
import { updateUser } from "./redux/actions/user";

function App() {
    const userAuthentication = useSelector((state) => state.userAuthentication);
    const dispatch = useDispatch();

    /******************   useEffect()   **************/
    //fetch user data from server
    useEffect(() => {
        fetchUserDetails()
            .then((resp) => {
                // console.log(resp);
                dispatch(updateUser(resp.data));
                dispatch(setUserAuth());
            })
            .catch((err) => {
                dispatch(updateUser(userDetails));
                dispatch(setUserAuth());
                console.error(err);
            });
    }, [userAuthentication, dispatch]);

    //fetch user all enrolled classrooms
    useEffect(() => {
        if (userAuthentication) {
            const computeThemeList = (enrolledClassrooms) => {
                let result = {};
                for (let i = 0; i < enrolledClassrooms.length; i++) {
                    result[enrolledClassrooms[i].subjectName] =
                        enrolledClassrooms[i].theme;
                }
                return result;
            };

            fetchUserEnrolledClassrooms()
                .then((resp) => {
                    // console.log(resp);
                    dispatch(updateThemes(computeThemeList(resp.data || [])));
                    dispatch(
                        updateClassrooms(resp.data ? resp.data.reverse() : [])
                    );
                })
                .catch((err) => {
                    dispatch(
                        updateThemes(computeThemeList(enrolledClassrooms))
                    );
                    dispatch(updateClassrooms(enrolledClassrooms.reverse()));
                    console.error(err);
                });
        }
    }, [userAuthentication, dispatch]);
    /******************   useEffect()   **************/
    return (
        <div
            className="app"
            style={!userAuthentication ? { margin: "0px" } : {}}
        >
            {userAuthentication ? (
                <header className="l-header">
                    <Navbar />
                </header>
            ) : null}
            <main
                className="l-main"
                style={!userAuthentication ? { height: "calc(100vh)" } : {}}
            >
                {!userAuthentication ? (
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="*" component={Error} />
                    </Switch>
                ) : (
                    <Switch>
                        {publicRoutes.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    exact
                                    path={route.path}
                                    component={route.component}
                                />
                            );
                        })}
                        {userAuthentication
                            ? protectedRoutes.map((route, index) => {
                                  return (
                                      <Route
                                          key={index}
                                          exact
                                          path={route.path}
                                          component={route.component}
                                      />
                                  );
                              })
                            : null}
                        <Route exact path="*" component={Error} />
                    </Switch>
                )}
            </main>
            {userAuthentication ? (
                <footer className="l-footer">
                    <Footer />
                </footer>
            ) : null}
        </div>
    );
}

export default App;
