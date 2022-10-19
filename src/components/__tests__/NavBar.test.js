import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test('Rendering NavBar', () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signInLink = screen.getByRole('link', { name: 'Login' });
  expect(signInLink).toBeInTheDocument();
});


test('Logged in User will have Profile Link with User name', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );
  
  const profileAvatar = await screen.findByText('matthias');
  expect(profileAvatar).toBeInTheDocument();
});
  
test('Logged out User will have login and register link', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );
  
  const signOutLink = await screen.findByRole('link', { name: 'Logout' });
  fireEvent.click(signOutLink);
  
  const signInLink = await screen.findByRole('link', { name: 'Login' });
  const signUpLink = await screen.findByRole('link', { name: 'Register' });
  
  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});
