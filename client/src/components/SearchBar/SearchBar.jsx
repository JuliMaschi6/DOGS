import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
// import './Buscador.css';
import { findBreedByName } from "../../actions/index";

export class SearchBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ""
      };
      // this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
      this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.findBreedByName(this.state.name);
    }
  
    render() {
      const { name } = this.state;
      return (
        <div>
          <form className="form-container" onSubmit={(e) =>this.handleSubmit(e)}>
            <div>
              <input
                type="text"
                id="name"
                autoComplete="off"
                placeholder="Enter yout breed name..."
                value={name}
                onChange={(e) => this.handleChange(e)}
              />
              <button type="submit">Search</button>
            </div>
          </form>
          {/* <ul>
           {
            this.props.breeds?.map(b =>
               <div className="buscador" key={b.id}>
                 <Link to={`/home/breedDetail/${b.id}`}>
                  <li>{b.name}</li>
                 </Link>
              </div>)
           }
          </ul> */}
        </div>
      );
    }
  }
  
  function mapStateToProps(state) {
    return {
      breeds: state.breeds
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        findBreedByName: name => dispatch(findBreedByName(name))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBar);