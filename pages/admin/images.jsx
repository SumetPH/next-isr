import React, { Component } from 'react'
import axios from 'axios'
import Zoom from 'react-reveal/Zoom'
import File64 from 'react-file-base64'

// redux
import { connect } from 'react-redux'

// components
import Loading from '../../components/loading/Loading'
import NoAccess from '../../components/noaccess/NoAccess'

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
            images: res.data.res
         })
      })
      setTimeout(() => {
         this.setState({ loadPage: true })
      }, 1000)
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
                     <br />
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
      if (!this.state.loadPage) {
         return <Loading />
      }

      if (!this.props.isAuth) {
         return <NoAccess />
      }

      const { name = '......' } = this.state.file
      return (
         <div className="container">
            <div className="column" style={{ marginTop: '1rem' }}>
               <h5 className="title is-5">เพิ่ม / ลบ รูปภาพ</h5>
               <form ref="form">
                  <div
                     className="columns"
                     style={{ margin: 40, justifyContent: 'center' }}>
                     <div
                        className="file has-name"
                        style={{ justifyContent: 'center' }}>
                        <label className="file-label">
                           <div style={{ display: 'none' }}>
                              <File64
                                 className="file-input"
                                 onDone={file => this.setState({ file })}
                              />
                           </div>
                           <span className="file-cta">
                              <span className="file-icon">
                                 <i className="fas fa-upload" />
                              </span>
                              <span className="file-label">Choose a file…</span>
                           </span>
                           <span className="file-name">{name}</span>
                        </label>
                        <button
                           className={`button is-info ${
                              this.state.loadingUpload
                           }`}
                           style={{ marginLeft: '1rem' }}
                           onClick={this.uploadImage}>
                           Upload
                        </button>
                     </div>
                  </div>
               </form>
               <div className="columns is-multiline">
                  {/* images list */}
                  {this.imagesList(this.state.images)}
                  {/* --- */}
               </div>
            </div>
            {/* --- */}

            {/* Images Admin. */}
            <div className="column">
               <h5 className="subtitle is-5">Images Table</h5>
               <div className="box">
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
            </div>
         </div>
      )
   }
}

export default connect(state => state)(AdminImages)
