import React from 'react'
// import { Container, Row, Col } from 'reactstrap'
import Navbar from '../../Components/UI/Navbar/navbar'

const layout = props => {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    )
}

export default layout