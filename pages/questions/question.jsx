import React, { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import axios from "axios"
import classNames from "classnames"

// components
import Loading from "../../components/loading/Loading"
import Navbar from "../../components/navbar/Navbar"

class Question extends Component {
  static getInitialProps({ query }) {
    return { id: query.id }
  }

  // state
  state = {
    question: [],
    loadPage: false,
    isLoading: false
  }

  // method
  componentDidMount = () => {
    this.loadQuestion()
  }

  loadQuestion = () => {
    const { id } = this.props
    axios.get(`/api/question/get/${id}`).then(res => {
      console.log(res.data)
      if (res.data.msg === "Error" || res.data.res === null) {
        return Router.push("/questions")
      }
      this.setState({ question: res.data.res })

      setTimeout(() => {
        this.setState({ loadPage: true })
      }, 1000)
    })
  }

  addComment = e => {
    e.preventDefault()

    const { id } = this.props
    this.setState({ isLoading: true })

    axios({
      url: "/api/question/create/answer",
      method: "POST",
      data: {
        questionId: id,
        body: this.refs.comment.value,
        created: new Date()
      }
    }).then(res => {
      console.log(res.data)
      this.loadQuestion()
      this.refs.form.reset()
      this.setState({ isLoading: false })
    })
  }

  // view
  answersView = (answers = []) => {
    const answersList = answers.map(item => {
      return (
        <div key={item._id}>
          <p>{item.body}</p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <small>
              โพสต์เมื่อ : {new Date(item.created).toLocaleDateString()}
            </small>
          </div>
          <hr />
        </div>
      )
    })

    if (answers.length > 0) {
      return (
        <div className="column">
          <div className="box">{answersList}</div>
        </div>
      )
    }
  }

  // render
  render() {
    const { title, body, created, answers = [] } = this.state.question

    if (this.state.loadPage === false) {
      return <Loading bg="white" color="black" />
    }

    return (
      <div>
        {/* navbar */}
        <Navbar />
        <div className="container">
          {/* Breadcrumb */}
          <div className="column">
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <span className="icon">
                  <i className="far fa-compass" />
                </span>
                <li>
                  <Link href="/questions">
                    <a>คำถาม</a>
                  </Link>
                </li>
                <li className="is-active">
                  <a>{title}</a>
                </li>
              </ul>
            </nav>
          </div>
          {/* --- */}
          {/* Question */}
          <div className="column">
            <div className="box">
              <b>หัวข้อ : {title}</b>
              <p>{body}</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <small>
                  โพสต์เมื่อ : {new Date(created).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
          {/* --- */}

          {/* Answers */}
          {this.answersView(answers)}
          {/* --- */}

          {/* Comment */}
          <div className="column">
            <label>แสดงความคิดเห็น</label>
            <form ref="form">
              <div className="column">
                <textarea
                  className="textarea"
                  ref="comment"
                  placeholder="คุณมีความคิดเห็นอย่างไรบ้าง"
                />
              </div>
              <div className="column">
                <button
                  className={classNames({
                    button: true,
                    "is-info": true,
                    "is-loading": this.state.isLoading
                  })}
                  onClick={this.addComment}
                >
                  โพสต์
                </button>
              </div>
            </form>
          </div>
          {/* --- */}
        </div>
      </div>
    )
  }
}

export default Question
