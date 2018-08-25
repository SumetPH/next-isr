import React, { Component } from 'react'
import axios from 'axios'
import Zoom from 'react-reveal/Zoom'
import File64 from 'react-file-base64'

// components
import Loading from '../../components/loading/Loading'

class AdminImages extends Component {
   // state
   state = {
      images: [],
      loadPage: false,
      loadingUpload: '',
      loadingDel: {},
      file: ''
   }

   // method
   componentDidMount = () => {
      this.loadImages()
   }

   loadImages = () => {
      axios.get('/api/image/all').then(res => {
         this.setState({
            images: res.data.res,
            loadPage: true
         })
      })
   }

   uploadImage = e => {
      e.preventDefault()
      this.setState({ loadingUpload: 'is-loading' })

      axios.post('/api/image/upload', { img: this.state.file }).then(res => {
         console.log(res.data)
         this.refs.form.reset()
         this.setState({ loadingUpload: '', file: '' })
         this.loadImages()
      })
   }

   deteteImage = _id => {
      let loadingDel = this.state.loadingDel
      loadingDel[_id] = 'is-loading'
      this.setState({ loadingDel })

      axios({
         url: `/api/image/delete/${_id}`,
         method: 'DELETE'
      }).then(res => {
         console.log(res.data)
         this.loadImages()
      })
   }

   //view
   imagesList = images => {
      return images.map((item, i) => {
         return (
            <Zoom key={i}>
               <div className="column is-4">
                  <div className="box">
                     <img src={`${item.path}`} alt="" />
                     <button
                        onClick={() => this.deteteImage(item._id)}
                        className={`button is-danger is-small ${
                           this.state.loadingDel[item._id]
                        }`}>
                        Del.
                     </button>
                  </div>
               </div>
            </Zoom>
         )
      })
   }

   imagesTable = images => {
      return images.map(item => {
         return (
            <tr key={item._id}>
               <td>{item.filename}</td>
               <td>
                  <button
                     onClick={() => this.deteteImage(item._id)}
                     className={`button is-warning is-small ${
                        this.state.loadingDel[item._id]
                     }`}>
                     Del.
                  </button>
               </td>
            </tr>
         )
      })
   }

   // render
   render() {
      return (
         <div className="container">
            {this.state.loadPage ? (
               <div>
                  {/* Upload image */}
                  <div className="column">
                     <h3>Upload Image</h3>
                     <div
                        className="columns"
                        style={{ margin: 30, justifyContent: 'center' }}>
                        <form ref="form">
                           <File64 onDone={file => this.setState({ file })} />
                           <button
                              className={`button is-info is-small ${
                                 this.state.loadingUpload
                              }`}
                              onClick={this.uploadImage}>
                              Upload
                           </button>
                        </form>
                     </div>
                     <div className="columns is-multiline">
                        {/* images list */}
                        {this.imagesList(this.state.images)}
                        {/* --- */}
                     </div>
                  </div>
                  {/* --- */}

                  {/* Images Admin. */}
                  <div className="column">
                     <h3>Images Admin</h3>
                     <table className="table is-fullwidth">
                        <thead>
                           <tr>
                              <th>Images</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {/* images row */}
                           {this.imagesTable(this.state.images)}
                           {/* --- */}
                        </tbody>
                     </table>
                  </div>
                  {/* --- */}
               </div>
            ) : (
               <Loading />
            )}
         </div>
      )
   }
}

export default AdminImages
