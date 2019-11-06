import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import TestComponent from '../test';
import OrganizationsPage from 'app/pages/organizations/list';
import OrganizationDetailsPage from 'app/pages/organizations/details';

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
          <Navbar.Brand>Ahora!</Navbar.Brand>
        </Navbar>
        <Container>
          <BrowserRouter>
            <Switch>
              <Route path="/organizations/:login/:section?" component={OrganizationDetailsPage} />
              <Route exact path="/organizations" component={OrganizationsPage} />
              <Route exact path="/" component={TestComponent} />
            </Switch>
          </BrowserRouter>
        </Container>
      </>
    );
  };
}
