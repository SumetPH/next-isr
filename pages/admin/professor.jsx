import React, { Component } from "react"
import axios from "axios"
import classnames from "classnames"

// redux
import { connect } from "react-redux"

// components
import Loading from "../../components/loading/Loading"
import NoAccess from "../../components/noaccess/NoAccess"

export class Professor extends Component {
  state = {
    professors: [],
    loadPage: false,
    loadingAdd: false,
    loadingDel: {}
  }

  // method
  componentDidMount = () => {
    this.loadProfessors()
  }

  loadProfessors = () => {
    axios
      .get("/api/professor/all")
      .then(res => this.setState({ professors: res.data.res }))

    setTimeout(() => {
      this.setState({ loadPage: true })
    }, 1000)
  }

  addProfessor = e => {
    e.preventDefault()
    this.setState({ loadingAdd: true })
    axios({
      method: "POST",
      url: "/api/professor/post",
      data: {
        firstname: this.refs.firstname.value,
        lastname: this.refs.lastname.value
      }
    }).then(res => {
      console.log(res.data)
      this.setState({ loadingAdd: false })
      if (res.data.msg === "Success") {
        this.refs.form.reset()
        this.loadProfessors()
      }
    })
  }

  deleteProfessor = _id => {
    let loadingDel = this.state.loadingDel
    loadingDel[_id] = "is-loading"
    this.setState({ loadingDel })

    axios({
      method: "DELETE",
      url: "/api/professor/delete",
      data: {
        _id
      }
    }).then(res => {
      this.loadProfessors()
    })
  }

  // view
  professorList = professors => {
    return professors.map(professor => {
      return (
        <tr key={professor._id}>
          <td>
            {professor.firstname} {professor.lastname}
          </td>
          <td>
            <button
              className={`button is-danger is-small ${
                this.state.loadingDel[professor._id]
              }`}
              onClick={() => this.deleteProfessor(professor._id)}
            >
              ลบ
            </button>
          </td>
        </tr>
      )
    })
  }

  render() {
    if (!this.state.loadPage) {
      return <Loading />
    }

    if (!this.props.isAuth) {
      return <NoAccess />
    }

    return (
      <div className="container">
        <div className="column" style={{ marginTop: "1rem" }}>
          <h5 className="title is-5">Professor Management</h5>
          <div className="box">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Professor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.professorList(this.state.professors)}</tbody>
            </table>
          </div>
        </div>

        {/* add professor */}
        <div className="column">
          <h6 className="subtitle is-6">เพิ่มอาจารย์</h6>
          <form ref="form">
            <div className="columns">
              <div className="column">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    ref="firstname"
                    placeholder="ชื่อ"
                  />
                </div>
              </div>
              <div className="column">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    ref="lastname"
                    placeholder="นามสกุล"
                  />
                </div>
              </div>
              <div className="column is-1">
                <button
                  className={classnames({
                    "button is-info": true,
                    "is-loading": this.state.loadingAdd
                  })}
                  onClick={this.addProfessor}
                >
                  เพิ่ม
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* --- */}
      </div>
    )
  }
}

export default connect(state => state)(Professor)
