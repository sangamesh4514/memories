import React from 'react'
import Form from '../Form/Form.js'
import Posts from '../Posts/Posts.js'
import {Grow,Container,Grid} from '@material-ui/core'
import {useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import {getPosts} from '../actions/posts.js'

const Home = () => {
    const dispatch = useDispatch()
    const [currentId,setCurrentId]=useState(null)

    useEffect(() => {
      dispatch(getPosts())
    },[currentId,dispatch])

  return (
    <div>
       <Grow in>
        <Container>
          <Grid  container justify="space-between" align-items="stretch" spacing={3}>
            <Grid item={true} xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item={true} xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}

export default Home
