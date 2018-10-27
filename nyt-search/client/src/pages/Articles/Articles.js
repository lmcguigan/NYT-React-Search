import React, { Component } from "react";
//import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import ArticleHolder from "../../components/ArticleHolder"
import NoteBox from "../../components/NoteBox"
import { List, ListItem } from "../../components/List";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import DeleteNoteBtn from "../../components/DeleteNoteBtn";
import AddNoteBtn from "../../components/AddNoteBtn";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { ModalContainer, Modal } from "../../components/Modal";

class Articles extends Component {
  state = {
    savedArticles: [],
    searchedArticles: [],
    topic: "",
    startyear: "",
    endyear: "",
    modalShow: false,
    currentArticleId: "",
    currentArticleTitle: "",
    noteTitle: "",
    noteText: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ savedArticles: res.data })
      )
      .catch(err => console.log(err));
  };

  searchArticles = () => {
    console.log(this.state);
    API.getArticlesFromSearch(this.state.topic, this.state.startyear, this.state.endyear)
      .then(res =>
        //console.log(res.data.response.docs)
        this.setState({ searchedArticles: res.data.response.docs })
      )
      .catch(err => console.log(err));
  };

  saveArticle = (headline, byline, url, pub_date) => {
    API.saveArticle({
      title: headline,
      author: byline,
      link: url,
      date: pub_date
    })
      .then(res => this.loadArticles())
      .catch(err => console.log(err))
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveNote = () => {
    console.log(this.state)
    API.saveNote({
      title: this.state.noteTitle,
      text: this.state.noteText,
      id: this.state.currentArticleId
    })
      .then(res => this.setState({ modalShow: false, noteText: "", noteTitle: "", currentArticleId: "" }), this.loadArticles())
      .catch(err => console.log(err))
  };

  deleteNote = id => {
    API.deleteNote(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }

  handleDelete = (id) => {
    this.deleteArticle(id)
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.topic && this.state.startyear && this.state.endyear) {
      this.searchArticles()
    }
  };

  handleNoteSubmit = event => {
    event.preventDefault();
    if (this.state.noteText && this.state.noteTitle) {
      this.saveNote()
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "topic") {
      this.setState({ topic: value })
    }
    else if (name === "startdate") {
      this.setState({ startyear: value })
    }
    else if (name === "enddate") {
      this.setState({ endyear: value })
    }
    this.forceUpdate();
  };

  handleNoteChange = event => {
    const { name, value } = event.target;
    if (name === "noteText") {
      this.setState({ noteText: value })
    }
    else if (name === "noteTitle") {
      this.setState({ noteTitle: value })
    }
    this.forceUpdate();
  };

  handleNoteDelete = (id) => {
    this.deleteNote(id);
  };

  handleSave = (headline, byline, url, pub_date) => {
    this.saveArticle(headline, byline, url, pub_date);
  };

  handleModalShow = (articleTitle, articleID) => {
    console.log(articleTitle)
    this.setState({ modalShow: true })
    this.setState({ currentArticleId: articleID })
    this.setState({ currentArticleTitle: articleTitle })
  };

  handleModalClose = () => {
    this.setState({ modalShow: false })
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12 sm-3" clName="searchcol">
            <form>
              <Input name="topic" placeholder="Topic (required)" onChange={this.handleInputChange} />
              <Input name="startdate" placeholder="Start Year (required)" onChange={this.handleInputChange} />
              <Input name="enddate" placeholder="End Year (optional)" onChange={this.handleInputChange} />
              <FormBtn onClick={this.handleFormSubmit}>Search</FormBtn>
            </form>
          </Col>
          <Col size="12 sm-9" clName="green">
            <Row>
              <Col size="12" >
                <ArticleHolder type="Search Results">
                  {this.state.searchedArticles.length ? (
                    <List>
                      {this.state.searchedArticles.slice(0, 5).map(article => {
                        let headline = article.headline.main;
                        let byline = article.byline.original;
                        let url = article.web_url;
                        let pub_date = article.pub_date.slice(0, 10);
                        return (
                          <ListItem key={article._id}>
                            <Row>
                              <Col size="6">
                                <h4>{article.headline.main}</h4>
                                <h5>{article.byline.original}</h5>
                                <a href={article.web_url}>Link</a>
                                <p>{article.pub_date.slice(0, 10)}</p>
                              </Col>
                              <Col size="6" clName="btn-holder">
                                <SaveBtn onClick={() => this.handleSave(headline, byline, url, pub_date)} id={article._id} />
                              </Col>
                            </Row>
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                      <ListItem>
                        <p>No results to display</p>
                      </ListItem>
                    )}
                </ArticleHolder>
              </Col>
            </Row>
            <Row>
              <Col size="12">
                <ArticleHolder type="Saved Articles">
                  {this.state.savedArticles.length ? (
                    <List>
                      {this.state.savedArticles.map(article => {
                        return (
                          <ListItem key={article._id}>
                            <Row>
                              <Col size="6" clName="col-lg-8">
                                <h4>{article.title}</h4>
                                <h5>{article.author}</h5>
                                <a href={article.link}>Link</a>
                                <p>Published: {article.date.slice(0, 10)}</p>
                              </Col>
                              <Col size="6" clName="col-lg-4 btn-holder">
                                <DeleteBtn onClick={() => this.handleDelete(article._id)} id={article._id} />
                                <AddNoteBtn onClick={() => this.handleModalShow(article.title, article._id)} />
                              </Col>
                            </Row>
                            {article.notes.length > 0 ? (
                              <Row>
                                <Col size="12" clName="note-holder">
                                  <h4>Notes:</h4>
                                  {article.notes.map(note => {
                                    console.log(note);
                                    return (
                                      <NoteBox key={note._id}>
                                        <Col size="6" clName="col-lg-8">
                                          <h5>{note.title}</h5>
                                          <p>{note.text}</p>
                                        </Col>
                                        <Col size="6" clName="col-lg-4 btn-holder">
                                          <DeleteNoteBtn onClick={() => this.handleNoteDelete(note._id)} id={article._id} />
                                        </Col>
                                      </NoteBox>
                                    );
                                  })}
                                </Col>
                              </Row>
                            ) : (<div></div>)}
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                      <ListItem>
                        <p>No results to display</p>
                      </ListItem>
                    )}
                </ArticleHolder>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.state.modalShow ? (
          <ModalContainer>
            <Modal>
              <span className="close" onClick={() => this.handleModalClose()}>&times;</span>
              <h2>Note for "{this.state.currentArticleTitle}"</h2>
              <form>
                <Input name="noteTitle" placeholder="Title" onChange={this.handleNoteChange} />
                <TextArea name="noteText" placeholder="Text" onChange={this.handleNoteChange} />
                <FormBtn onClick={this.handleNoteSubmit}>Save Note</FormBtn>
              </form>
            </Modal>
          </ModalContainer>
        ) : (
            <ModalContainer>
            </ModalContainer>
          )}
      </Container>
    );
  }
}

export default Articles;
