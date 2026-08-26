import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> milestones
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in AI & Machine Learning</h4>
                <h5>LNCT, Bhopal</h5>
              </div>
              <h3>2024 - 2028</h3>
            </div>
            <p>
              Current GPA: 7.43 / 10. Deep theoretical and practical coursework in Data Structures & Algorithms, DBMS, Python Engineering, and Machine Learning Systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Second Round Qualifier</h4>
                <h5>EY Techathon 6.0 (Ernst & Young)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Nationwide competitive technology hackathon organized by Ernst & Young, evaluating advanced system architecture, algorithmic correctness, and real-world problem execution.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathon Submission (Vaani Voice RAG)</h4>
                <h5>HH Goa 2026 Hackathon</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Engineered the async FastAPI intake backend, benchmarking suite, and health check services under competitive 48-hour sprint deadlines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
