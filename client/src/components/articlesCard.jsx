export default function ArticlesCard({ data }) {
  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "100vw", maxHeight: "270px" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={data.image}
            className="img-fluid rounded-start"
            alt="..."
            style={{ height: "270px", width: "400px" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.content}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                {data.publishedAt.split("T")[0]}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
