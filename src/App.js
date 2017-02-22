import React, { Component } from 'react';

import {
  Grid, Row, Col, PageHeader, Alert, Navbar, Panel, Table, Button
} from 'react-bootstrap';

import getSocket from './socket';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      last: null
    }

    getSocket().connect();
    getSocket().on('message', message => this.handleMessage(message));
    getSocket().on('status', status => this.handleStatus(status));
  }

  handleMessage(message) {
    let events = this.state.events.slice();
    events.push(message);

    this.setState({
      last: message,
      events: events
    });
  }

  handleStatus(status) {
    this.setState({ status });
  }

  dismiss() {
    this.setState({ last: null });
  }

  _last() {
    if (this.state.last === null) {
      return null;
    }

    const last = this.state.last;
    const click = () => this.dismiss();

    return (
      <Alert bsStyle="danger">
        <h4>Alarm: {last.alarm_name}</h4>
        <p>{last.message}</p>
        <ul>
          <li><b>Timestamp:</b> {last.alarm_timestamp}</li>
          <li><b>Message:</b> </li>
          <li><b>Description:</b> {last.alarm_description}</li>
          <li><b>New State:</b> {last.state}</li>
          <li><b>Old State:</b> {last.old_state}</li>
          <li><b>Timestamp:</b> {last.alarm_timestamp}</li>
        </ul>
        <p>
          <Button bsStyle="danger" onClick={click}>Dismiss</Button>
        </p>
      </Alert>
    );
  }

  _eventLog() {
    let content;
    if (this.state.events.length === 0) {
      content = (
        <p>No events yet.</p>
      );
    } else {
      const events = this.state.events.map((event, i) => (
        <tr key={i}>
          <td>{event.alarm_timestamp}</td>
          <td>{event.alarm_name}</td>
          <td>{event.alarm_description}</td>
          <td>{event.state}</td>
        </tr>
      ));

      content = (
        <Table fill hover striped>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Name</th>
              <th>Description</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {events}
          </tbody>
        </Table>
      );
    }

    return (
      <Row>
        <Col lg={12}>
          <Panel header="Event Log">
            {content}
          </Panel>
        </Col>
      </Row>
    );
  }

  render() {

    return (
      <Grid>
        <Row>
          <Col lg={12}>
            <PageHeader>Monasca Webhook Demo</PageHeader>
          </Col>
        </Row>
        {this._last()}
        {this._eventLog()}
        <Row>
          <Navbar fixedBottom>
            <Navbar.Text>status: {this.state.status}</Navbar.Text>
          </Navbar>
        </Row>
      </Grid>
    );
  }
}

export default App;
