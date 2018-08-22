import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = theme => ({
  button: {
    marginLeft:'auto',
    marginBottom: 16

  },
  card: {
    width: 400,
  },
  media: {
    height: 140,
  },
  textField: {
    display: 'flex'
  },
  menu: {
    width: 200,
  }
});

const genders = [{
      value: 1,
      label: "Male",
    },{
      value: 2,
      label: "Female"
    }
  ];

const instance = axios.create({
    baseURL: 'http://161.246.94.246:1995/api/',
    timeout: 5000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    

})

class RegisterCard extends React.Component {
    
    state = {
        gender: 1,
        username: "",
        email: "",
        phone: "",
        fullname: ""
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
    handleRegistration = () => {
        const names = this.state.fullname.split(" ")
        const pushData = {
            username : this.state.username,
            email: this.state.email,
            phone_no: this.state.phone,
            first_name: names[0],
            last_name: names[1],
            gender: this.state.gender
        }
        
        instance.post('v1/accounts/register', pushData, {withCredentials: true}).then( response => {
            if (response.data.result) {
                Alert("done")
                this.setState({
                    gender: 1,
                    username: "",
                    email: "",
                    phone: "",
                    fullname: ""
                })
            }
            console.log("YOOOO")
        }).catch( error => Alert("Unable to register : " + error))
    }
    
    render(){
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
            
            <CardContent>
                
                <TextField
                id="usernameField"
                label="Username"
                placeholder="misterShubU"
                value={this.state.username}
                onChange={this.handleChange('username')}
                className={classes.textField}
                margin="normal"
                />
                <TextField
                id="fullnameField"
                label="Full name"
                placeholder="John Doe"
                value={this.state.fullname}
                onChange={this.handleChange('fullname')}
                className={classes.textField}
                margin="normal"
                />
                <TextField
                id="emailField"
                label="Email Address"
                placeholder="email@kmitl.ac.th"
                value={this.state.email}
                onChange={this.handleChange('email')}
                className={classes.textField}
                margin="normal"
                />
                <TextField
                id="phoneField"
                label="Phone number"
                placeholder="081-234-5678"
                value={this.state.phone}
                onChange={this.handleChange('phone')}
                className={classes.textField}
                margin="normal"
                />
                <TextField
                id="select-currency"
                select
                label="Select"
                className={classes.textField}
                value={this.state.gender}
                onChange={this.handleChange('gender')}
                SelectProps={{
                    MenuProps: {
                    className: classes.menu,
                    },
                }}
                helperText="Please select gender"
                margin="normal"
                >
                {genders.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                
            </CardContent>
            <CardActions>
            
                <Button onClick = {this.handleRegistration} variant="contained" color="primary" className={classes.button}>
                    REGISTER
                </Button>
                
             
            </CardActions>
            
            </Card>
        );
    }
}

RegisterCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterCard);