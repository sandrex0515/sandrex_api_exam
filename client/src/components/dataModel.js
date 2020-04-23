import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addData } from '../actions/dataActions';
import PropTypes from 'prop-types';

class DataModal extends Component {
    state = {
        modal: false,
        case_name: '',
        are:''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newData = {
            case_name: this.state.case_name,
            group: this.state.group
        }

        this.props.addData(newData);

        this.toggle();
    }

    render(){


        return(
            <div>

                {this.props.isAuthenticated ?    <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}>
                    Add Data
                </Button> : <h4 className="mb-3 ml-4">Please login to add or delete data</h4>}
             

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Database</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="data">Name</Label>
                                <Input 
                                type="text" 
                                name="case_name"
                                id="case_name"
                                placeholder="Enter the name"
                                onChange={this.onChange}
                                />
                                <Label for="data">Area</Label>
                                <Input 
                                type="text" 
                                name="area"
                                id="area"
                                placeholder="Enter the Area"
                                onChange={this.onChange}
                                />
                                <Button
                                color="primary"
                                style={{marginTop: '2rem'}}
                                block>
                                    Add Data
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )};
}

const mapStateProps = state => ({
    data: state.data,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateProps, { addData })(DataModal);