import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { useEffect, useState } from "react";
import ArticlesCard from "../../components/articlesCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../features/counter/newsSlice";

export default function Home() {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const news = useSelector((state) => {
    return state.news.data;
  });

  const loading = useSelector((state) => {
    return state.news.loading;
  });

  useEffect(() => {
    // getNews();
    dispatch(fetchNews());
  }, []);

  // async function getNews() {
  //   try {
  //     setLoading(true);

  //     const news = await axios.get(
  //       `https://gnews.io/api/v4/search?q=indonesia&sortby=publishedAt&max=20&apikey=657c9c54cf3abd5a0d6c0825aff807c4`
  //     );
  //     setData(news.data.articles);
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: error.message,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
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
          {news.map((el, i) => {
            return <ArticlesCard key={i + 1} data={el} />;
          })}
        </div>
      </div>
    </>
  );
}
