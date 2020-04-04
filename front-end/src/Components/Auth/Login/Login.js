import React, { useState } from 'react'
import './Login.css'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import Spinner from '../../UI/Spinner/Spinner'

const Login = props => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const loginHandler = (event) => {
        event.preventDefault()
        props.login(email, password)
    }

    const submitButtons = (<React.Fragment><div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                            </div>
                            <p className="text-center"><a className="btn" style={{ color: "#007bff" }} onClick={props.clicked} >Sign Up</a></p>
                            </React.Fragment>)
    
    return (
        <div >
            <div className="card" style={{ width: "100%", borderRadius:"25px"}}>
                <div className="card-body">
                    <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
                    <hr />
                    {props.error ? <p className="text-danger text-center">Wrong Email or Password!</p> : null}
                    <form onSubmit={event => loginHandler(event)}>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input name="" className="form-control" placeholder="Email or login" type="email" required
                                    onChange={event => setEmail(event.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input className="form-control" placeholder="******" type="password" required
                                    onChange={event => setPassword(event.target.value)} />
                            </div>
                        </div>
                        {props.loading ? <Spinner/> : submitButtons}
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password, isSignUp) => dispatch(actions.login(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)