import React from 'react'
import { string, object } from 'prop-types'

class Image extends React.Component {
  static propTypes = {
    title: string.isRequired,
    imageRef: object.isRequired
  }

  state = { src: undefined }

  componentDidMount() {
    this.fetchImage()
  }

  fetchImage = async () => {
    const { imageRef } = this.props
    const src = await imageRef.getDownloadURL()
    this.setState({ src })
  }

  render() {
    const { title, height } = this.props
    const { src } = this.state
    return <img src={src} alt={title} style={{ height }} />
  }
}

export default Image
