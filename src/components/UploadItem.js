import React from 'react'
import { object } from 'prop-types'
import { storage } from '../firebase'

class UploadItem extends React.Component {
  static propTypes = { file: object }
  state = { status: 'idle', progress: 0, error: null }

  componentDidMount() {
    this.setState({ status: 'loading' }, this.upload)
  }

  upload = () => {
    const handleChange = snapshot => {
      const { bytesTransferred, totalBytes } = snapshot
      const progress = Math.round((bytesTransferred / totalBytes) * 100)
      this.setState({ progress })
    }

    const handleError = error => {
      this.setState({ status: 'failure', error })
    }

    const handleComplete = async () => {
      const storageRef = storage.ref()
      const url = await storageRef.child(file.name).getDownloadURL()
      url && this.setState({ status: 'success', error: null })
    }

    const { file } = this.props
    const uploadTask = storage.ref(file.name).put(file)
    uploadTask.on('state_changed', handleChange, handleError, handleComplete)
  }

  getBackground = (style = {}) => ({
    backgroundImage: `url(${this.props.url})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    ...style
  })

  getProgress = (style = {}) => {
    const getGradient = color => `linear-gradient(${color}, ${color})`
    const { status, progress } = this.state
    const GREEN = 'hsl(138, 57%, 95%)'
    const BLUE = 'hsl(206, 82%, 89%)'

    return {
      backgroundImage: getGradient({ loading: BLUE, success: GREEN }[status]),
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${progress}% 100%`,
      ...style
    }
  }

  render() {
    const { file } = this.props

    const Thumbnail = ({ height, children }) => (
      <section style={this.getBackground({ height })} />
    )

    const Title = ({ height }) => (
      <h1 style={this.getProgress(style.Title)}>
        {file.name}
        <small>{getFileSizeString(file.size)}</small>
      </h1>
    )

    return (
      <article style={style}>
        <Thumbnail height={150} />
        <Title height={40} />
      </article>
    )
  }
}

const style = {
  width: 150,
  overflow: 'hidden',
  Title: { fontSize: 16, padding: 5, display: 'flex' }
}

export default UploadItem

/* utils */
const getFileSizeString = number => {
  const kb = Math.round(number / 1024)
  const mb = Math.round((kb / 1000) * 10) / 10
  return mb < 1 ? kb + 'KB' : mb + 'MB'
}
