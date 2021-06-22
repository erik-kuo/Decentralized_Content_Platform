import React, {useState, useEffect} from 'react'
import { Image, Header, Container } from 'semantic-ui-react'
import uint8ArrayConcat from 'uint8arrays/concat';


const Profile = (props) => {

  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [intro, setIntro] = useState('');
  const { contracts, address } = props;

  const getImage = async (cid) => {
    let content = []
    for await (const chunk of props.ipfs.cat(cid)) {
      content.push(chunk)
    }
    const imageRaw = uint8ArrayConcat(content)
    const buffer = new Blob([imageRaw.buffer])
    const imageUrl = URL.createObjectURL(buffer)
    // console.log(imageURL)
    setImgUrl(imageUrl);
  }

  const getProfile = async() => {
    const name = await contracts[1].methods.getNickname(address).call();
    setName(name);
    const imgHash = await contracts[1].methods.getPhoto(address).call();
    getImage(imgHash);
    const introStr = await contracts[1].methods.getSelfIntro(address).call();
    setIntro(introStr);
  }
  useEffect(() => {getProfile()},[]);

  return (
    <Container textAlign='center'>
      <Image src={imgUrl} size='small' circular centered/>
      <Header as='h3'>{name}</Header>
      <Container textAlign='center'>{intro}</Container>
    </Container>
  )
}

export default Profile
