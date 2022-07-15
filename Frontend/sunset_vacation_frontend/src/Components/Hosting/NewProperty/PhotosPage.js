import { Button, Card, CardContent, Typography } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftSideCard from './LeftSideCard';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function ViewRender(props){
  const handleUploadButton = (event) => {
    let imageFiles = event.target.files;
    let urls = []
    for(let i=0; i<imageFiles.length; i++){
      let url = URL.createObjectURL(imageFiles[i]);
      urls.push({img: url, title: imageFiles[i].name});
    }
    console.log(urls);
    props.setImgSrc(urls);
    props.setImages(imageFiles);
  }

  const handlDelete = (name) => {
    props.hadleDeleteImage(name);
    // let temp = props.imgSrc.filter((img) => img.title !==name);
    props.handleDeleteImageSrc(name);
  }

  if(props.images.length === 0){
    return(
      <Grid container>
        <Grid item xs={12}>
          {/* <TextField 
            multiline
            rows={12}
            variant='filled'
            disabled
            placeholder='Upload at least 5 images'
            inputProps={{style: {fontSize: 32}}}
            sx={{
              width:500,
              height: 397,
              mt: 10
            }}
          /> */}

          <Card elevation={3} sx={{width: 500, height: 450, ml: 15, mt:2}}>
            <CardContent>
              <Typography variant='h4' color="text.secondary" gutterBottom sx={{mt:20}}>
                Upload at least 5 Photos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            sx={{
              mt:1.5
            }}
          >
            Upload Image
            <input
              type="file"
              id='image-upload'
              multiple
              accept="image/*"
              hidden
              onChange={handleUploadButton}
            />
          </Button>
        </Grid>
    </Grid>
    );
  }
  // else if(props.images.length > 0){
  //   let imageFiles = props.images;
  //   let urls = []
  //   for(let i=0; i<imageFiles.length; i++){
  //     let url = URL.createObjectURL(imageFiles[i]);
  //     urls.push({img: url, title: imageFiles[i].name});
  //   }
  //   console.log(urls);
  //   props.setImgSrc(urls);
  // }

  return(
    <div>
      <ImageList sx={{ width: 500, height: 450, ml:17 }}>
      {props.imgSrc.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={item.img}
            loading="lazy"
            alt={item.title}
          />
          <ImageListItemBar
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                onClick={() => {handlDelete(item.title)}}
              >
                <DeleteIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
      <Button
        variant="contained"
        component="label"

      >
        Upload Image
        <input
          type="file"
          id='image-upload'
          multiple
          accept="image/*"
          hidden
          onChange={handleUploadButton}
        />
      </Button>
    </div>
  );
}



export default function PhotosPage(props){

    let navigate = useNavigate();

    const [imgSrc, setImgSrc] = React.useState([]);

    const handleSelectImage = (val) => {
      let temp = [...imgSrc, ...val];
      setImgSrc(temp);
    }

    React.useEffect(()=> {
      if(props.images.length > 0 && imgSrc.length === 0){
        let imageFiles = props.images;
        let urls = []
        for(let i=0; i<imageFiles.length; i++){
          let url = URL.createObjectURL(imageFiles[i]);
          urls.push({img: url, title: imageFiles[i].name});
        }
        console.log(urls);
        handleSelectImage(urls);
      }
    },[props.images,handleSelectImage])

    

    const handleDeleteImageSrc = (name) => {
      let temp = imgSrc.filter((img) => img.title !== name);
      setImgSrc(temp);
    }

    const handleCancel = () => {
      navigate('/hosting');
    }

    let getButton = () => {
      if(props.images.length < 5) {
        return <Button disabled variant='outlined' color='secondary' sx={{ml: '70%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button> 
      }
      else return <Button variant='outlined' color='secondary' sx={{ml: '70%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button>
    }

    let button = getButton()
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"Let's add some photos of your place"}/></Item>
            </Grid>
            <Grid item xs={6} direction='column'>
              <Item sx={{height:"5%", ml:1, mt:0.5}}>
                <Paper elevation={0}>
                  <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Cancel</Button>
                </Paper>
              </Item>
              <Item sx={{ height:'80%', mt: 1, ml:1}}>
                <ViewRender 
                  imgSrc = {imgSrc}
                  setImgSrc = {(val) => {handleSelectImage(val)}}
                  images = {props.images}
                  setImages = {(val) => {props.setImages(val)}}
                  hadleDeleteImage = {(name) => {props.hadleDeleteImage(name)}}
                  handleDeleteImageSrc = {(name) => {handleDeleteImageSrc(name)}}
                />
              </Item>
              <Item sx={{height:'5%', ml:1, mt: 1}}>
                <Paper elevation={0}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button variant='outlined' color='secondary' sx={{mr:"50%"}} onClick={() => {props.setPageNo(props.pageNo - 1)}}>Back</Button>
                    </Grid>
                    <Grid item xs={6}>
                      {button}
                    </Grid>
                  </Grid>
                </Paper>
              </Item>
            </Grid>
          </Grid>
        </Box>
      );
}