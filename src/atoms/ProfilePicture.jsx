import styled from 'styled-components'
import useProfilePicture from '../hooks/useProfilePicture'
import avatarPlaceholder from '../assets/avatar_placeholder.png'
import { useState } from 'react'

const ProfilePicture = ({ profilePicture, height }) => {
  const { imgErrors, imgLoadings, images } = useProfilePicture()

  const [isImageLoaded, setIsImageLoaded] = useState(true)

  const imageStyle = isImageLoaded ? {} : { display: 'none' }

  return (
    <Wrapper $height={height}>
      {!isImageLoaded && <img src={avatarPlaceholder} />}
      <ImageContent
        style={imageStyle}
        $offset={
          images.find((image) => image.picture.name === profilePicture)?.picture
            ?.offset || { x: -12, y: -12 }
        }
        $scale={
          images.find((image) => image.picture.name === profilePicture)?.picture
            ?.scale || 0.85
        }
        width="125%"
        src={
          images.find((image) => image.picture.name === profilePicture)?.src ||
          avatarPlaceholder
        }
        onLoad={() => setIsImageLoaded(true)}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: ${(props) => props.$height || '4em'};
  height: ${(props) => props.$height || '4em'};
  overflow: hidden;
  border-radius: 50%;
  position: relative;

  cursor: pointer;
`

const ImageContent = styled.img`
  position: absolute;
  top: ${(props) => props.$offset?.y || 0}%;
  left: ${(props) => props.$offset?.x || 0}%;

  transform: scale(${(props) => props.$scale || 1});
  user-select: none;
  -webkit-user-select: none;
`

export default ProfilePicture