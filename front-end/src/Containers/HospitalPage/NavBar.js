import React, {useState} from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Badge } from 'reactstrap';
import classnames from 'classnames'
import './HospitalPage.css'
import Doctors from './Doctors/Doctors'
import Waitings from './Waitings/Waitings';
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const NavBar = props => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
  
    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Doctors
            </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Waiting <Badge color="danger">{props.waitings ? props.waitings.length : ""}</Badge>
            </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <Doctors/>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="10">
                            <Waitings/>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        waitings: state.hospital.waitings,
        loading : state.hospital.loading
    }
}
export default connect(mapStateToProps)(NavBar)