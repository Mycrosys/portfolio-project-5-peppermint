import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import {Route,Switch} from 'react-router-dom';
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm.js";
import SignInForm from "./pages/auth/SignInForm";
import IssueCreateForm from "./pages/issues/IssueCreateForm";
import IssuePage from "./pages/issues/IssuePage";
import IssuesPage from "./pages/issues/IssuesPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import IssueEditForm from "./pages/issues/IssueEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          
          <Route
            exact
            path="/"
            render={() => (
              <IssuesPage message="No results. Try another Search."/>
            )}
          />
          
          <Route
            exact
            path="/myissues"
            render={() => (
              <IssuesPage
                message="No results. Create an Issue and try again."
                filter={`owner__profile=${profile_id}&`}
              />
            )}
          />
          
          <Route
            exact
            path="/followed"
            render={() => (
              <IssuesPage
                message="No results. Follow an Issue and try again."
                filter={`issue_following__owner__profile=${profile_id}&`}
              />
            )}
          />

          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/issues/create" render={() => <IssueCreateForm />} />
          <Route exact path="/issues/:id" render={() => <IssuePage />} />
          <Route exact path="/issues/:id/edit" render={() => <IssueEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          
          <Route render={() => <NotFound />} />

        </Switch>
      </Container>
    </div>
  );
}

export default App;