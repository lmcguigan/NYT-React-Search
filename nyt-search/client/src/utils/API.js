import axios from "axios";

export default {
  getArticlesFromSearch: function (topic, start, end) {
    let queryParams = {};
    queryParams.q = topic;
    queryParams.begin_date = start + "0101";
    queryParams.end_date = end + "0101";
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + process.env.nyt + "&q=" + queryParams.q + "&begin_date=" + queryParams.begin_date + "&end_date=" + queryParams.end_date);
  },
  getArticles: function () {
    return axios.get("/api/articles");
  },
  getAnArticle: function (id) {
    return axios.get("/api/articles/" + id);
  },
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  },
  saveArticle: function (data) {
    return axios.post("/api/articles", data);
  },
  saveNote: function (data) {
    console.log(data)
    console.log(data.id)
    return axios.post("/api/notes/" + data.id, data);
  },
  deleteNote: function (id) {
    return axios.delete("/api/notes/" + id);
  },
  editNote: function (data) {
    return axios.put("/api/notes/" + data.id, data)
  }
};
