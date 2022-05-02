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
          <h2>Enter your breed name: </h2>
          <form className="form-container" onSubmit={(e) =>this.handleSubmit(e)}>
            <div>
              <label className="label"> Breed: </label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                value={name}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <button type="submit">Search</button>
          </form>
          <ul>
           {
            this.props.breeds?.map(b =>
               <div className="buscador" key={b.id}>
                 <Link to={`/home/breedDetail/${b.id}`}>
                  <li>{b.name}</li>
                 </Link>
              </div>)
           }
          </ul>
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
        findBreedByName: name => dispatch(findBreedByName(name)),
        // addMovieFavorite: movie => dispatch(addMovieFavorite(movie))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
    // { getMovies , addMovieFavorite }
  )(SearchBar);