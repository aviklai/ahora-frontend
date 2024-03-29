import * as React from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import OrganizationsPage from 'app/pages/organizations';
import OrganizationDetailsPage from 'app/pages/organizations/details';
import { BrowserRouter, Link } from 'react-router-dom';
import CurrentUser from 'app/components/CurrentUser';
import RootPageComponent from 'app/pages/RootPage';
import AddOrganizationPage from 'app/pages/organizations/add';

interface LoginParams {
}

interface Props extends RouteComponentProps<LoginParams> {
  selectedMenu: number;
  actions: any;
  user: any;
}

interface State {
  user: any;
}

export class Dashboard extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {};

  constructor(props: Props, context?: any) {
    super(props, context);
  }

  openChangePassword = () => {
    return <></>;
  };

  async componentDidMount() {

  }

  render = () => {
    return (
      <>
        <Navbar bg="light">
          <Navbar.Brand><Link to="/">Ahora!</Link></Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <CurrentUser></CurrentUser>
        </Navbar>
        <Container>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={RootPageComponent} />
              <Route path="/organizations/add" component={AddOrganizationPage} />
              <Route path="/organizations/:login/:section?" component={OrganizationDetailsPage} />
              <Route path="/organizations" component={OrganizationsPage} />
            </Switch>
          </BrowserRouter>
        </Container>
      </>
    );
  };
}
