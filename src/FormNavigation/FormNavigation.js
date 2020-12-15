import {Component} from 'react';
import './FormNavigation.css';

export default class FormNavigation extends Component {
    
    
    render(){
        return (
            <>
                <h2>New Entry</h2>
                <button className="goBack" onClick={() => this.props.history.push('/')}>Go Back</button>
            </>
        )
    }
}