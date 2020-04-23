import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getDatas, deleteData } from '../actions/dataActions';
import { GET_DATAS } from '../actions/types';
import PropTypes from 'prop-types';

class DataList extends Component {

    componentDidMount(){
        this.props.getDatas();
    }

    onDeleteClick = (id) => {
        this.props.deleteData(id);
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
    render() {
        const { datas } = this.props.data;
        return(
            <Container>

                <ListGroup>
                   
                    <TransitionGroup classNames="data-list">
                    <Table>
                    <thead>
                         <tr>
                         <th>Name</th>
                        </tr>
                      </thead>
                   
                        {datas.map(({ _id, case_name, area }) =>(
                        <CSSTransition key={_id} timeout={500} classNames="fade"> 

                           <ListGroupItem>
                           {this.props.isAuthenticated ? 
                                <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this, _id)}>
                                    &times;
                                </Button>: <h4></h4> }
                    
                                <tr>
                        
                            <th scope="row">{case_name}</th>
  

                         
                                
                                </tr>
                      
                         

                                </ListGroupItem> 
                        
                        </CSSTransition>
                        ))}
                  
                 
                    </Table>
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
} 

DataList.propTypes = {
    getDatas: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateProps = (state) => ({
    data: state.data,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateProps, { getDatas, deleteData })(DataList);