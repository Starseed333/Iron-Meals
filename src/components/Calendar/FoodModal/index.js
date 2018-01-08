// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'react-loading'
import Modal from 'react-modal';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';

// Our Dependencies
import { capitalize } from '../../../utils/helpers'

// Our Components 
import FoodList from './FoodList';
//FoodModal here extend the component
class FoodModal extends Component {
  //mount the modal into the body
  componentWillMount() {
    Modal.setAppElement('body');
 }

  static propTypes = {
    meal: PropTypes.string,
    day: PropTypes.string,
    foodList: PropTypes.array,
    isLoadingFood: PropTypes.bool.isRequired,
    isFoodModalOpen: PropTypes.bool.isRequired,
    searchFood: PropTypes.func.isRequired,
    selectRecipe: PropTypes.func.isRequired,
    closeFoodModal: PropTypes.func.isRequired,
  }

  render() {
    const { 
      isLoadingFood, 
      isFoodModalOpen, 
      closeFoodModal, 
      searchFood,
      selectRecipe,
      foodList,
      meal, 
      day 
    } = this.props;

    return (
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={isFoodModalOpen}
        onRequestClose={closeFoodModal}
        contentLabel="Modal"
      >
        <div>
          { isLoadingFood
            ? <Loading delay={200} type="bubbles" color="#222" className="loading"/>
            : <div className="search-container">
                <h3 className="subheader">
                  Find a meal for {capitalize(day)} ({meal})
                </h3>
                <div className="search">
                  <input
                    type="text"
                    className="food-input"
                    placeholder="Search Foods"
                    ref={input => this.input = input}
                  />
                  <button
                    className="icon-btn"
                    onClick={() => searchFood(this.input.value)}>
                      <ArrowRightIcon size={30} />
                  </button>
                </div>
                { foodList !== null && (
                  <FoodList 
                    foodList={foodList}
                    onSelect={food => {
                      selectRecipe({ food, day, meal }) 
                      closeFoodModal();
                    }}
                  />
                )}
              </div>
            } 
        </div>
      </Modal>
    )
  }
}

export default FoodModal;
