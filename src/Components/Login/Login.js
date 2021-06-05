import React, { useState,useContext } from 'react'
import {AuthContext} from '../Auth/Auth.js'
import {Redirect} from 'react-router-dom'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebaseConfig from '../../config';


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit =(e) =>{
        e.preventDefault();
        const {email,password} = e.target.elements
        try{
            firebaseConfig.auth().signInWithEmailAndPassword(email.value,password.value);
        } catch(error)
        {
            alert(error)
        }
    }
    const {currentUser} = useContext(AuthContext);
    if(currentUser){
        return <Redirect to="/home"></Redirect>
    }



    //Login Style
    const paperStyle = { padding: 20, height: '50vh', width: 300, margin: "50px auto" }
    const avatarStyle = { backgroundColor: "red" }
    const buttonStyle = { marginTop: "20px" }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle} component='form' onSubmit={handleSubmit} >
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sing In</h2>
                </Grid>
                <TextField id="email" label="Email" placeholder="Email" type="email" fullWidth required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField id="password" label="Password" v placeholder="Password" type="password" fullWidth required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {/*error && <Grid className="error">{error}</Grid>*/}
                <Button style={buttonStyle} type="submit" color="primary" variant="contained" fullWidth >Sing In</Button>
            </Paper>
        </Grid>
    )
}
