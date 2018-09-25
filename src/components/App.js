import React from 'react'
import {} from 'prop-types'
import { storage } from '../firebase'
import Image from './Image'
import Upload from './Upload'

const propTypes = {}
const defaultProps = {}

const App = () => {
  return (
    <React.Fragment>
      <Upload />
      <SampleImages />
    </React.Fragment>
  )
}

App.propTypes = propTypes
App.defaultProps = defaultProps

export default App

/* Sample */
const SampleImages = () =>
  images.map(({ title, name }, index) => (
    <Image
      title={title}
      imageRef={storage.ref().child(name)}
      height={150}
      key={index}
    />
  ))

const images = [
  { title: '남여', name: 'stock-photo-118787347.jpg' },
  { title: '여자', name: 'stock-photo-247802589.jpg' }
]
