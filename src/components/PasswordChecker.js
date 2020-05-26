import React, { Component } from 'react';

class PasswordChecker extends Component {
    state = {
        password: '',
        passwordLength: false,
        containsNumbers: false,
        isUpperCase: false,
        containsSymbols: false,
        submitted: false
    }

    checkForNumbers(string){
        let matches = string.match(/\d+/g);
        this.setState({
            containsNumbers: matches != null ? true : false
        });
    }

    checkForUpperCase(string){
        let matches = string.match(/[A-Z]/);
        this.setState({
            isUpperCase: matches != null ? true : false
        });
    }

    checkForSymbols(string){
        let symbols = new RegExp(/[^A-Z a-z0-9]/);
        this.setState({
            containsSymbols: symbols.test(string) ? true : false
        });
    }
    handleChange = input => e =>{
        let targetValue = e.target.value;
        this.checkForNumbers(targetValue);
        this.checkForUpperCase(targetValue);
        this.checkForSymbols(targetValue);
        this.setState({
            [input]: targetValue,
            passwordLength: targetValue.length > 7 ? true : false
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({password: '', submitted: true})
    }

    render(){
        const {
            password,
            passwordLength,
            containsNumbers,
            isUpperCase,
            containsSymbols,
            submitted
        } = this.state

        let disabledBtn = passwordLength && containsNumbers && isUpperCase && containsSymbols ? false : true;
        return(
            <div id="formWrapper">
            {
                !submitted ?
                
                <div id="content">
                <h2 id="title">Password Checker</h2>
                    <form onSubmit={this.submitForm}>
                        <input type="password" onChange={this.handleChange('password')} value={password} placeholder="Enter Password" />
                        <div>
                            <h2 className={passwordLength ? 'boldText' : ''}>Password must contain more than 7 characters</h2>
                            <h2 className={containsNumbers ? 'boldText' : ''}>Password must contain numbers</h2>
                            <h2 className={isUpperCase ? 'boldText' : ''}>Password must contain uppercase letters</h2>
                            <h2 className={containsSymbols ? 'boldText' : ''}>Password must contain symbols</h2>
                        </div>
                        <button id="submitBtn" disabled={disabledBtn}>Submit</button>
                    </form>
                </div> : <h2>Form Submitted!</h2>
            }
            </div>
        );
    }
}

export default PasswordChecker;