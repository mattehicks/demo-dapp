import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from 'actions/User'
import Timelapse from './timelapse'

class Review extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchUser(this.props.review.reviewerAddress)
  }

  render() {
    const { review, user } = this.props
    const { content, createdAt, score } = review
    const { address, profile } = user
    const claims = profile && profile.claims
    const fullName = (claims && claims.name) || 'Unnamed User'

    return (
      <div className="review">
        <div className="d-flex">
          <div className="avatar-container">
            <img src="images/avatar-purple.svg" alt="reviewer avatar" />
          </div>
          <div className="identification d-flex flex-column justify-content-center text-truncate">
            <div className="name">{fullName}</div>
            <div className="address text-muted text-truncate">{address}</div>
          </div>
          <div className="score d-flex flex-column justify-content-center text-right">
            <div className="stars">{[...Array(5)].map((undef, i) => {
              return (
                <img key={`score-star-${i}`} src={`images/star-${score > i ? 'filled' : 'empty'}.svg`} alt="review score star" />
              )
            })}</div>
            <div className="age text-muted"><Timelapse reactive={false} reference={createdAt} /></div>
          </div>
        </div>
        <p className="content">{content}</p>
      </div>
    )
  }
}

const mapStateToProps = (state, { review }) => {
  return {
    user: state.users.find(u => u.address === review.reviewerAddress) || {},
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: address => dispatch(fetchUser(address))
})

export default connect(mapStateToProps, mapDispatchToProps)(Review)
