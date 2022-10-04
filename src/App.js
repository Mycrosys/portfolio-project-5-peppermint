import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import {Route,Switch} from 'react-router-dom';
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm.js";
import SignInForm from "./pages/auth/SignInForm";
import IssueCreateForm from "./pages/issues/IssueCreateForm";
import IssuePage from "./pages/issues/IssuePage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/issues/create" render={() => <IssueCreateForm />} />
          <Route exact path="/issues/:id" render={() => <IssuePage />} />
          <Route render={() => <p>Invalid URL</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;