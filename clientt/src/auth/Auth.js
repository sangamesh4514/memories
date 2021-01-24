import React,{useState} from 'react'
import {Container,Paper,Typography,Avatar,Button, Grid} from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles.js'
import Input from './Input.js'
import Icon from './icon.js'
import {signin,signup} from '../actions/auth'

const initialdata={firstName:"",lastName:"",email:"",pssword:"",confirmpassword:""}

const Auth=()=>{
  const classes=useStyles()
  const history=useHistory()
  const [isSignup,setIsSignUp]=useState(true)
  const [formData,setFormData]=useState(initialdata)
  const [showPassword,setShowPassWord]=useState(false)
 const dispatch=useDispatch()
  const googlesuccess=(res)=>{
    
      const result=res?.profileObj;
      const token=res?.tokenId;
      try {
        dispatch({type:'AUTH', data:{result,token}})
        history.push('/')
      } catch (error) {
        console.log(error)
      }
  }

  const googleFailure=()=>{
    console.log("google login failed")
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    // console.log(formData)
    if(isSignup){
      dispatch(signup(formData,history))
    }
    else{
       dispatch(signin(formData,history))
    }


  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const switchMode=()=>{
    setIsSignUp((s)=>!s)
  }

  const handleShowPassword=()=>(
    setShowPassWord((s)=>!s)
  )
  return (
   <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"  />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmpassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin 
          clientId="884744859070-gnueks577jei3ned1cg7hbtpm2j0v1gt.apps.googleusercontent.com"
          render={(renderProps)=>(
          <Button className={classes.googleButton} fullWidth  color='primary' onClick={renderProps.onClick} variant="contained"  startIcon={<Icon/>} disabled={renderProps.disabled}>Google Sign In</Button>
          )}
          onSuccess={googlesuccess}
          onFailure={googleFailure}
          cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup?"Already have an account? Sign In":"Don't have an ccount? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;
