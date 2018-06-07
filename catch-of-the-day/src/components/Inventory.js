import React from 'react';
import PropTypes from "prop-types";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.shape({
      key: PropTypes.string
    }),
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  render() {
    return (
      <div className="inventory-container">
        <h2>Inventory</h2> 
        { Object.keys(this.props.fishes).map(key => (
          <EditFishForm 
            key={key} 
            fish={this.props.fishes[key]} 
            index={key}
            updateFish={this.props.updateFish} 
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Samples
        </button>
      </div> 
    ) 
  }
}

export default Inventory