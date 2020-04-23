import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import { addData } from '../../actions/dataActions';
import { register } from '../../actions/authActions';
import { cleaErrors } from '../../actions/errorActions';





class RegisterModal extends Component {




    state = {
        modal: false,
        fname: '', 
        mname: '', 
        lname: '', 
        bdate: '', 
        sex: '',
        mnumber: '', 
        presentAdd: '', 
        email: '', 
        pass: '',
        msg: null

    };



      
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        cleaErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps){
        const {error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg: error.msg.msg});
            }else{
                this.setState({msg: null});
            }
        }

        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
                
            }
        }
    }

    toggle = () => {
        this.props.cleaErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const {fname, mname, lname, bdate, gender, mnumber, presentAdd, email, pass} = this.state;

        const newUser = {
            fname, mname, lname, bdate, gender, mnumber, presentAdd, email, pass
        }

        this.props.register(newUser);

    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register User</ModalHeader>
                    <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>: null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="data">Firstname</Label>
                                <Input 
                                type="text" 
                                name="fname"
                                id="fname"
                                placeholder="Enter the Firstname"
                                onChange={this.onChange}

                                />
                                <Label for="data">Middlename</Label>                                
                                <Input 
                                type="text" 
                                name="mname"
                                id="mname"
                                placeholder="Enter the Middlename"
                                onChange={this.onChange}

                                />
                                <Label for="data">Lastname</Label>                                
                                <Input 
                                type="text" 
                                name="lname"
                                id="lname"
                                placeholder="Enter the Lastname"
                                onChange={this.onChange}

                                />

                                <Label for="bdate">Birthday</Label>
                                <Input
                                 type="date"
                                 name="bdate"
                                 id="bdate"
                                 placeholder="Enter Birthday"

                                 />
                                <Label for="sex">Gender</Label>    
                                <Input type="select" name="gender" id="exampleSelect">
                                <option disabled selected>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                </Input>
                                <Label for="data">Mobile Number</Label>                                
                                <Input 
                                type="text" 
                                name="mnumber"
                                id="mnumber"
                                placeholder="Enter the mobile number"
                                onChange={this.onChange}

                                />
                                <Label for="data">Pressent Address</Label>                                
                                <Input 
                                type="text" 
                                name="presentAdd"
                                id="presentAdd"
                                placeholder="Enter the address"
                                onChange={this.onChange}
                     
                                />
                                 <Label for="data">Email Address</Label>                                
                                <Input 
                                type="text" 
                                name="email"
                                id="email"
                                placeholder="Enter the email address"
                                onChange={this.onChange}
                  
                                />
                                 <Label for="data">Password</Label>                                
                                <Input 
                                type="password" 
                                name="pass"
                                id="pass"
                                placeholder="Enter the password"
                                onChange={this.onChange}
                      
                                />
                                <Button
                                color="primary"
                                style={{marginTop: '2rem'}}
                                block>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )};
}

const mapStateProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error 
});

export default connect(mapStateProps,{register, cleaErrors})(RegisterModal);