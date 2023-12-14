import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ArticlesCard from "../../components/articlesCard";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    getNews();
  }, []);

  async function getNews() {
    try {
      setLoading(true);

      const news = await axios.get(
        `https://gnews.io/api/v4/search?q=indonesia&sortby=publishedAt&max=20&apikey=657c9c54cf3abd5a0d6c0825aff807c4`
      );
      setData(news.data.articles);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div class="d-flex justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className="container mt-5">
          {data.map((el, i) => {
            return <ArticlesCard key={i + 1} data={el} />;
          })}
        </div>
        {/* <Sidebar />
        <Feed />
        <Rightbar /> */}
      </div>
    </>
  );
}
