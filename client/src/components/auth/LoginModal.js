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
import {login} from '../../actions/authActions';
import { cleaErrors } from '../../actions/errorActions';





class LoginModal extends Component {




    state = {
        modal: false,
        email: '', 
        pass: '',
        msg: null
    };



      
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        cleaErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps){
        const {error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
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
        const { email, pass } = this.state;

        const user ={
            email,
            pass,
        }
        this.props.login(user);
    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>: null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
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

export default connect(mapStateProps,{login, cleaErrors})(LoginModal);