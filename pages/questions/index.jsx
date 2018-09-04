import React, { Component } from "react"
import axios from "axios"
import Link from "next/link"
import Fade from "react-reveal/Fade"
import classnames from "classnames"

// components
import Loading from "../../components/loading/Loading"
import Navbar from "../../components/navbar/Navbar"

class Questions extends Component {
  // state
  state = {
    questions: [],
    loadPage: false,
    isLoading: false
  }

  // method
  componentDidMount = () => {
    this.loadQuestions()
  }

  loadQuestions = () => {
    axios.get("/api/question/all").then(res => {
      this.setState({
        questions: res.data.res
      })

      setTimeout(() => {
        this.setState({ loadPage: true })
      }, 1000)
    })
  }

  // method
  createQuestion = e => {
    e.preventDefault()
    this.setState({ isLoading: true })

    axios({
      url: "/api/question/create/post",
      method: "POST",
      data: {
        title: this.refs.title.value,
        body: this.refs.body.value,
        created: new Date()
      }
    }).then(res => {
      console.log(res.data)
      this.loadQuestions()
      this.refs.createQuestion.reset()
      this.setState({ isLoading: false })
    })
  }

  // view
  questionsList = questions => {
    return questions.map(item => {
      return (
        <Fade key={item._id}>
          <div className="column">
            <Link href={`/question/${item._id}`}>
              <a className="box has-text-dark">
                <p>คำถาม : {item.title}</p>
                <small>คำตอบ : {item.answers.length}</small>
                <br />
                <small>{new Date(item.created).toLocaleDateString()}</small>
              </a>
            </Link>
          </div>
        </Fade>
      )
    })
  }

  // render
  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#209cee"
        }}
      >
        <div style={{ backgroundColor: "#209cee" }}>
          <div style={{ position: "absolute", width: "100%" }}>
            <Navbar color="is-info" />
          </div>
          {this.state.loadPage ? (
            <div className="container">
              {/* QuestionsList */}
              <div className="column" style={{ paddingTop: "7rem" }}>
                <div
                  className="box has-background-info has-text-white"
                  style={{ border: "2px white solid" }}
                >
                  <h4 className="title is-4 has-text-white">
                    <span className="icon m-5px">
                      <i className="fas fa-question" />
                    </span>
                    คำถาม
                  </h4>
                  {this.questionsList(this.state.questions)}
                </div>
              </div>

              {/* Create question */}
              <div className="column">
                <h4 className="title is-5 has-text-white">
                  <span className="icon m-5px">
                    <i className="fas fa-pen" />
                  </span>
                  ตั้งกระทู้
                </h4>
                <form ref="createQuestion">
                  <div className="column">
                    <div className="control">
                      <input
                        className="input is-primary"
                        ref="title"
                        type="text"
                        placeholder="หัวข้อคำถาม"
                      />
                    </div>
                  </div>
                  <div className="column">
                    <textarea
                      className="textarea is-primary"
                      ref="body"
                      placeholder="รายละเอียด"
                    />
                  </div>
                  <div className="column">
                    <button
                      className={classnames({
                        "button is-warning": true,
                        "is-loading": this.state.isLoading
                      })}
                      onClick={this.createQuestion}
                    >
                      โพสต์
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <Loading bg="#209cee" color="white" />
          )}
        </div>
      </div>
    )
  }
}

export default Questions
