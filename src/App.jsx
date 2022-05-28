import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Box, Flex, Grid, Heading, Image, Input, Text } from '@chakra-ui/react'


function App() {
  // let initialState = {
  //   kind: "youtube#searchResult",
  //   etag: "ugPevhxmvk_fwqFzmj7KkXDR5A4",
  //   id: {
  //   kind: "youtube#video",
  //   videoId: "vniNki7HMQs"
  //   },
  //   snippet: {
  //   publishedAt: "2021-08-14T10:29:55Z",
  //   channelId: "UC8DlfShpgfbXAjOlgdgc0MA",
  //   title: "Nokia Lumia 1520 in 2021 | The PERFECT Lumia from 2013!",
  //   description: "IF YOU WANT TO BUY A LUMIA 1520, CHECK BELOW. In this video we take a look back at the Nokia Lumia 1520, the first Nokia ...",
  //   thumbnails: {
  //   default: {
  //   url: "https://i.ytimg.com/vi/vniNki7HMQs/default.jpg",
  //   width: 120,
  //   height: 90
  //   },
  //   medium: {
  //   url: "https://i.ytimg.com/vi/vniNki7HMQs/mqdefault.jpg",
  //   width: 320,
  //   height: 180
  //   },
  //   high: {
  //   url: "https://i.ytimg.com/vi/vniNki7HMQs/hqdefault.jpg",
  //   width: 480,
  //   height: 360
  //   }
  //   },
  //   channelTitle: "TheMrNokia I Abdulla Zaki",
  //   liveBroadcastContent: "none",
  //   publishTime: "2021-08-14T10:29:55Z"
  //   }
  //   }
  const [data,setData]=useState({})

  const handleChange = async (e) =>{
    console.log(e.target.value);
    let value = e.target.value;
    if(value.length > 2){
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value}&key=AIzaSyAF-ByPKNvBqma0OD-IB-viyqvF9SGU_BM&maxResults=30`);
      const res = await response.json();
      setData(res.items);
    }
  }

  console.log(data)

  return (
    <div className="App">
      <Box m='auto' maxW='98%' bgColor='#F7FAFC'>
        <Box ml='5'>
        <Flex gap='5'>
        <Image mb='5' mt='5' h='10' src='https://www.pngfind.com/pngs/m/591-5915021_clip-art-youtube-social-media-logos-hd-png.png'></Image>
        <Input mb='5' mt='5' maxW='50%' type='text' onChange={handleChange}></Input>
        </Flex>
        </Box>
        <hr/>
        <Box maxW='100%'>
          <Grid  templateColumns={{base:'repeat(1,99%)', md:'repeat(2, 48%)', lg:'repeat(4, 24%)'}}gap={4} p='3'>
            
            {
              (data.length==null) ?
              <iframe src={`https://www.youtube.com/embed/vniNki7HMQs`}></iframe>
              :
              data.map((e=>{
                return (
                  <Box boxShadow='base' p='' rounded='md' bg='white'>
                  <Flex direction='column'>
                  <iframe w='100%' src={`https://www.youtube.com/embed/${e.id.videoId}`}></iframe>
                  <Heading pl='1' textAlign='left' h='40px' overflow='hidden' size='sm'>{e.snippet.title}</Heading>
                  <Text pl='1' textAlign='left' h='10%' lineHeight='5' overflow='hidden'>{e.snippet.description}</Text>
                  </Flex>
              </Box>
                )
              }))
            }
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default App
