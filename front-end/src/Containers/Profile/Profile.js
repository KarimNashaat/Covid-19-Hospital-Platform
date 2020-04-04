import React, { useState, useRef } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, InputGroup } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import BirthdayForm from '../../Components/UI/BirthdayForm/BirthdayForm'
import defaultAvatar from '../../assets/images/user-avatar-placeholder.png'
import ImageUploader from 'react-images-upload'
import Spinner from '../../Components/UI/Spinner/Spinner'

const Profile = props => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [job, setJob] = useState(null)
    const [day, setDay] = useState(null)
    const [month, setMonth] = useState(null)
    const [year, setYear] = useState(null)
    const [phone, setPhone] = useState(null)
    const [gender, setGender] = useState(null)
    const [img, setImg] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [userAvatar, setUserAvatar] = useState(props.user.avatar)
    const [avatarChanged, setAvatarChanged] = useState(null)

    let birthday = null
    if (year !== null && day !== null && month !== null) {
        birthday = month + "/" + day + "/" + year
    }

    let edits = { email, name, password, job, birthday, phone, avatar, avatarChanged }
    let enableSubmit = Object.values(edits).some(edit => edit !== null)
    const imgInput = useRef(null)
    let deleteImg = null

    if (img || userAvatar) {
        deleteImg = <button type="button" onClick={() => {
            setImg(null)
            setUserAvatar(null)
            setAvatarChanged(true)
        }} className="close text-center mt-2" aria-label="Close" style={{ float: "none" }}>
            <span aria-hidden="true">&times;</span>
        </button>

    }

    const onDrop = (picture, pictureUrl) => {
        setUserAvatar(null)
        setAvatarChanged(true)
        setAvatar(picture[picture.length-1])
        setImg(pictureUrl[pictureUrl.length - 1])
    }

    const enableEditing = (value, userValue, setValue) => {
        if (value === null) {
            setValue(userValue)
        }
    }

    const submit = (event) => {
        Object.keys(edits).forEach(key => {
            if (edits[key] === null) {
                delete edits[key]
            }
        })

        edits.gender = gender === null ? props.user.gender : gender ? "Male" : "Female"

        if (birthday !== null) {
            let split = birthday.split('/')
            birthday = {
                month: parseInt(split[0]),
                day: parseInt(split[1]),
                year: parseInt(split[2]),
            }
            edits.birthday = birthday
        }

        if (avatar === null && userAvatar === null) {
            edits.avatar = null
        }
        props.editProfile(edits)
    }

    return (
        <Container fluid className="mt-3" >
            <Row>
                <Col md={3} className="mx-3 mb-3">
                    <div className="text-center">
                        <img src={userAvatar ? `data:image/png;base64,${userAvatar}` : img ? img : defaultAvatar} className="avatar img-circle img-thumbnail rounded" alt="avatar" />
                        <br />
                        {deleteImg} <hr />
                        <h6>Upload a different photo...</h6>
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
                        <button onClick={() => imgInput.current.triggerFileUpload()}> Choose Image </button>
                        <span className="Error"></span>
                    </div>
                </Col>
                <Col md={6} className="mx-5">
                    <Form onSubmit={event => submit(event)}>
                        <h1 className="text-left mb-4">
                            {props.user.name}
                        </h1>
                        <FormGroup className="text-left">
                            <Label for="name" className="text-left">Name</Label>
                            <InputGroup>
                                <Input type="text" name="text" id="name" placeholder="Name" disabled={name === null} defaultValue={props.user.name} onChange={event => setName(event.target.value)} required />
                                <Button outline type="button" className="btn btn-default btn-sm mx-2" onClick={() => enableEditing(name, props.user.name, setName)}>
                                    <i className="fa fa-pencil-alt" aria-hidden="true"></i>
                                </Button>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="text-left">
                            <Label className="text-left" for="exampleEmail">Email</Label>
                            <InputGroup>
                                <Input type="email" name="text" id="email" placeholder="Email" disabled={email === null} defaultValue={props.user.email} onChange={event => setEmail(event.target.value)} required />
                                <Button outline type="button" className="btn btn-default btn-sm mx-2" onClick={() => enableEditing(email, props.user.email, setEmail)}>
                                    <i className="fa fa-pencil-alt" aria-hidden="true"></i>
                                </Button>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="text-left">
                            <Label className="text-left" for="password">Password</Label>
                            <InputGroup>
                                <Input type="password" name="password" id="password" placeholder="Password" disabled={password === null} onChange={event => setPassword(event.target.value)} required />
                                <Button outline type="button" className="btn btn-default btn-sm mx-2" onClick={() => enableEditing(password, "", setPassword)}>
                                    <i className="fa fa-pencil-alt" aria-hidden="true"></i>
                                </Button>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="text-left">
                            <Label className="text-left" for="phone">Phone Number</Label>
                            <InputGroup>
                                <Input type="tel" name="phone" id="phone" placeholder="Phone Number" disabled={phone === null} defaultValue={props.user.phone} onChange={event => setPhone(event.target.value)} required />
                                <Button outline type="button" className="btn btn-default btn-sm mx-2" onClick={() => enableEditing(phone, props.user.phone, setPhone)}>
                                    <i className="fa fa-pencil-alt" aria-hidden="true"></i>
                                </Button>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="text-left">
                            <Label for="job" > Job </Label>
                            <InputGroup>
                                <select className="form-control" type="select" name="job" id="job" value={props.user.job} disabled={job === null} onChange={event => setJob(event.target.value)} required>
                                    <option value=""> Job</option>
                                    <option value="Engineer">Engineer</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Lawyer">Lawyer</option>
                                    <option value="Other">Other</option>
                                </select>
                                <Button outline type="button" className="btn btn-default btn-sm mx-2" onClick={() => enableEditing(job, props.user.job, setJob)}>
                                    <i className="fa fa-pencil-alt" aria-hidden="true"></i>
                                </Button>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="text-left">
                            <Label for="birthday" > Birthday </Label>
                            <InputGroup>
                                <BirthdayForm
                                    d_year={year === null}
                                    d_day={day === null}
                                    d_month={month === null}
                                    month={props.user.birthday.month}
                                    day={props.user.birthday.day}
                                    year={props.user.birthday.year}
                                    yearChange={(event) => setYear(event.target.value)}
                                    dayChange={(event) => setDay(event.target.value)}
                                    monthChange={(event) => setMonth(event.target.value)} />
                                <Button outline type="button" className="btn btn-default btn-sm mx-2" onClick={() => {
                                    enableEditing(year, props.user.birthday.year, setYear)
                                    enableEditing(day, props.user.birthday.day, setDay)
                                    enableEditing(month, props.user.birthday.month, setMonth)
                                }}>
                                    <i className="fa fa-pencil-alt" aria-hidden="true"></i>
                                </Button>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="text-left">
                            <Label for="gender" > Gender </Label>
                            <InputGroup>
                                <Label check className="mx-4">
                                    <Input type="radio" name="radio1" defaultChecked={props.user.gender === "Male" ? true : false} onClick={() => {
                                        setGender(true)
                                    }} />{' '}
                                    Male
                            </Label>
                                <Label check className="mx-3">
                                    <Input type="radio" name="radio1" defaultChecked={props.user.gender === "Female" ? true : false} onClick={() => {
                                        setGender(false)
                                    }} />{' '}
                                    Female
                            </Label>
                            </InputGroup>
                        </FormGroup>
                        {props.loading ? <Spinner /> :
                            <div className="text-left my-4">
                                <Button type="submit" color="success" disabled={!enableSubmit}> <i className="fa fa-pencil-alt" aria-hidden="true"></i> Save Edit </Button>
                            </div>
                        }
                    </Form>
                </Col>
            </Row>
        </Container >
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        loading: state.user.editingProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editProfile: (profile) => dispatch(actions.editProfile(profile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)