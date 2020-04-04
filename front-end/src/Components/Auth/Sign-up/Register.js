import React, { useState, useRef } from 'react'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import Spinner from '../../UI/Spinner/Spinner'
import ImageUploader from 'react-images-upload'
import './Register.css'
import BirthdayForm from '../../UI/BirthdayForm/BirthdayForm'
import avatar from '../../../assets/images/user-avatar-placeholder.png'
import {Label, Input, FormGroup, InputGroup} from 'reactstrap'

const Register = props => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [img, setImg] = useState(null)
    const [job, setJob] = useState(null)
    const [day, setDay] = useState(null)
    const [month, setMonth] = useState(null)
    const [year, setYear] = useState(null)
    const [phone, setPhone] = useState(null)
    const [profilePicture, setProfilePicture] = useState(null)
    const [male, setMale] = useState(true)
    const [defaultAvatar, setDefaultAvatar] = useState(avatar)


    const imgInput = useRef(null)
    let deleteImg = null

    let src = defaultAvatar
    if (img) {
        src = img
        deleteImg = <div className="deleteImage text-center" onClick={() => {
            setImg(null)
            setDefaultAvatar(avatar)
        }}> X </div>
    }
    const onDrop = (picture, pictureUrl) => {
        setDefaultAvatar(null)
        setProfilePicture(picture[picture.length - 1])
        setImg(pictureUrl[pictureUrl.length - 1])
    }

    const registerHandler = (event) => {
        event.preventDefault()
        const birthday = month + "/" + day + "/" + year
        const gender = male ? "Male" : "Female"
        props.register(email, password, name, job, phone, birthday, profilePicture, gender, true)
    }

    const submitButtons = <React.Fragment><div className="form-group">
        <button type="submit" className="btn btn-primary btn-block"
        > Create Account  </button>
    </div>
        {/* <!-- form-group// -->       */}
        <p className="text-center">Have an account? <a className="btn" style={{ color: "#007bff" }} onClick={props.clicked} >Log In</a> </p>
    </React.Fragment>

    return (
        <div style={{ borderRadius: "50px" }}>
            <div className="card bg-light" style={{ borderRadius: "50px" }}>
                <div className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                    <h4 className="card-title mt-3 text-center">Create Account</h4>
                    <p className="text-center">Get started with your free account</p>

                    {/* Img Input  */}
                    {/* <div className="form-group input-group text-center"> */}
                    <div className="preview text-center">
                        <div className="onTop">
                            <img className="preview-img text-center" src={src} alt="Preview Image" width="150" height="150" />
                            <div className="browse-button text-center">
                                <i className="fa fa-pencil-alt"></i>

                                <ImageUploader
                                    ref={imgInput}
                                    withIcon={false}
                                    withPreview={false}
                                    buttonText='Choose images'
                                    onChange={onDrop}
                                    singleImage={true}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg', '.heic']}
                                    maxFileSize={5242880}
                                    style={{ display: 'none' }}
                                />
                                <button className='browse-input' onClick={() => imgInput.current.triggerFileUpload()} />
                            </div>
                            <span className="Error"></span>
                            {deleteImg}
                        </div>
                    </div>
                    {/* </div> */}
                    {/* Img Input Finished */}

                    <form onSubmit={(event) => registerHandler(event)}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input name="" className="form-control" placeholder="Full name" type="text" required
                                onChange={event => setName(event.target.value)} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input name="" className="form-control" placeholder="Email address" type="email"
                                onChange={event => setEmail(event.target.value)} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input className="form-control" placeholder="Create password" type="password"
                                onChange={event => setPassword(event.target.value)} required minLength="8" />
                            {/* <span id="passwordHelpInline" className="text-muted" >
                                Your password must be 8-20 characters long
                            </span> */}
                        </div>

                        {/* <!-- form-group// --> */}
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                            </div>
                            {/* <select class="custom-select" style="max-width: 120px;">
                                <option selected="">+971</option>
                                <option value="1">+972</option>
                                <option value="2">+198</option>
                                <option value="3">+701</option>
                            </select> */}
                            <input name="" className="form-control" placeholder="Phone number" type="number"
                                onChange={(event) => setPhone(event.target.value)} />
                        </div>
                        {/* <!-- form-group// --> */}
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-building"></i> </span>
                            </div>
                            <select className="form-control" required onChange={(event) => setJob(event.target.value)}>
                                <option value=""> Job</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Lawyer">Lawyer</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {/* <!-- form-group end.// --> */}

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-birthday-cake"></i> </span>
                            </div>
                            <BirthdayForm
                                yearChange={(event) => setYear(event.target.value)}
                                dayChange={(event) => setDay(event.target.value)}
                                monthChange={(event) => setMonth(event.target.value)} />
                        </div>

                        <FormGroup check className="p-0 mb-3" required >
                            <InputGroup>
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-transgender"></i> </span>
                            </div>
                            <Label check className="mx-5">
                            <Input type="radio" name="radio1" defaultChecked onClick={() => setMale(true) }/>{' '}
                                Male
                            </Label>
                            <Label check className="mx-3">
                                <Input type="radio" name="radio1" onClick={() => setMale(false)}/>{' '}
                                Female
                            </Label>
                            </InputGroup>
                        </FormGroup>

                        {/* <!-- form-group// --> */}
                        {/* <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input className="form-control" placeholder="Repeat password" type="password" />
                        </div> */}
                        {/* <!-- form-group// -->                                       */}
                        {props.loading ? <Spinner /> : submitButtons}
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (email, password, name, job, phone, birthday, profilePicture, gender, isSignUp) => dispatch(actions.signUp(email, password, name, job, phone, birthday, profilePicture, gender, isSignUp))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)