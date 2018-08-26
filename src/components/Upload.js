import React from 'react'
import UploadItem from './UploadItem'

class ImageUpload extends React.Component {
  state = {}

  handleChange = event => {
    const { files } = event.target
    files.length && this.setState({ ...Array.from(files) })
  }

  render() {
    const List = () => (
      <section style={{ display: 'flex' }}>
        {Object.entries(this.state).map(([index, file]) => (
          <UploadItem file={file} url={URL.createObjectURL(file)} key={index} />
        ))}
      </section>
    )

    const Input = () => (
      <input
        type="file"
        accept="image/*"
        onChange={this.handleChange}
        multiple
      />
    )

    return (
      <section>
        <List />
        <Input />
      </section>
    )
  }
}

export default ImageUpload
