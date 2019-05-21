import React, { Component } from 'react';
import axios from 'axios';
import './home.css'

class Currency extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <>
        <p>Go to the search page:<a href="/search">here</a></p>
        <p>Today's prices: <a href="/list"><button>View</button></a></p>
        <div class="row"><h1>Welcome to CurrentCrypt!</h1></div>

        <div class="desc">
        Click on <code>Today's Rates</code>, to view the the rates of 10 cryptocurriencies <br />
        Click on <code>Search</code>, to search a specific cryptocurrency
        </div>
      </>
    );
  }
}

export default Currency;
