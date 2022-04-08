import { useEffect, useState } from 'react'
import profile_pictures from '../assets/profile_pictures.json'
import { shuffle } from '../utils/arrays'

// const throwErrorUseProfilePicture = () => {
//   const [imgLoadings, setLoadings] = useState([])
//   const [imgErrors, setErrors] = useState([])
//   const [images, setImages] = useState([])

//   useEffect(() => {
//     setLoadings([])
//     setErrors([])
//     setImages([])

//     const fetchImage = async (picture) => {
//       setLoadings((prev) => [...prev, true])
//       try {
//         const response = await import(
//           `../assets/profile_pictures/${picture.name}.${picture.ext}`
//         ) // change relative path to suit your needs
//         setImages((prev) => [
//           ...prev,
//           {
//             src: response.default,
//             picture
//           }
//         ])
//       } catch (err) {
//         console.log(err)
//         if (err.name === 'ModuleNotFoundError') {
//           setImages((prev) => [
//             ...prev,
//             {
//               src: `https://raw.githubusercontent.com/DeathlyBower959/studis-school/images/images/${picture.name}.${picture.ext}`,
//               picture
//             }
//           ])
//         }
//         setErrors((prev) => [...prev, err])
//       } finally {
//         setLoadings((prev) => [...prev.slice(0, prev.length - 1), false])
//       }
//     }

//     profile_pictures.forEach(fetchImage)
//   }, [profile_pictures])

//   return {
//     imgLoadings,
//     imgErrors,
//     images
//   }
// }

const useProfilePicture = () => {
  const [imgLoadings, setLoadings] = useState([])
  const [imgErrors, setErrors] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    setLoadings([])
    setErrors([])
    setImages([])

    const fetchImage = async (picture) => {
      setLoadings((prev) => [...prev, true])
      setImages((prev) => [
        ...prev,
        {
          src: `https://raw.githubusercontent.com/DeathlyBower959/studis-school/images-v2/images/${picture.name}.${picture.ext}`,
          picture
        }
      ])
      setLoadings((prev) => [...prev.slice(0, prev.length - 1), false])
    }

    profile_pictures.forEach(fetchImage)
  }, [])

  return {
    imgLoadings,
    imgErrors,
    images: shuffle(images, 123213123)
  }
}

export default useProfilePicture
