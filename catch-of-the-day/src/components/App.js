import React from 'react';
import PropTypes from "prop-types";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  
  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;
    
    // reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Take a copy of the exisitng state
    const fishes = {...this.state.fishes}
    // 2. Add our new fish to fishes
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set new fishes object to state
    this.setState({
      fishes: fishes
    }); 
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes }
    // 2. update the state
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  };
  
  addToOrder = (key) => {
    // Take a copy of state
    const order = {...this.state.order};
    // Either add to order or increment amount in order
    order[key] = order[key] + 1 || 1;
    // Call setState to update our state object
    this.setState({ order })
  };
  
  removeFromOrder = (key) => {
    // Take a copy of the state
    const order = { ...this.state.order }
    // remove item from order
    delete order[key]
    // set the state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
                key={key} 
                index={key}
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder} 
              />
            ))}
          </ul>
        </div>
          <Order 
            fishes={this.state.fishes} 
            order={this.state.order} 
            removeFromOrder={this.removeFromOrder}
          />
          <Inventory 
            addFish={this.addFish}
            updateFish={this.updateFish}
            deleteFish={this.deleteFish}
            loadSampleFishes={this.loadSampleFishes}
            fishes={this.state.fishes}
          />
      </div>
    );
  }
}

export default App;