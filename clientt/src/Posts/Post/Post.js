import React from 'react'
import useStyles from './styles'
import {Card,CardContent,CardActions,CardMedia,Button,Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIccon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {deletePost,likePost} from '../../actions/posts'

const Post=({post,setCurrentId})=>{
   const classes=useStyles()
   const user=JSON.parse(localStorage.getItem('profile'))
   const dispatch=useDispatch()
   
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator)&&(
      <div className={classes.overlay2} >
        <Button style={{color:'white'}} size='small' onClick={()=>{setCurrentId(post._id)}}>
          <MoreHorizIccon fontSize='default'/>
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag} `)}</Typography>
      </div>
      <Typography  className={classes.title} variant='h5'>{post.title}</Typography>
      <CardContent>
        
        <Typography   variant='body2' component='p'>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result}  onClick={()=>{dispatch(likePost(post._id))}}>
          <ThumbUpAltIcon fontSize='small'/>
           {post.likes.length} 
           &nbsp;like &nbsp;
          </Button>

        {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator)&&(
          <Button size='small' color='primary' onClick={()=>{dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize='small'/>
                    &nbsp; delete
                  </Button>

        )}
        
      </CardActions>
    </Card>
    
  )
}
export default Post