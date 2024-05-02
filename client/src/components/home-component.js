import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AuthService from "../services/auth.service";
const HomeComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  console.log(currentUser);
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">課程學習網</h1>
            <p className="col-md-8 fs-4">
              在我們的平台上，您可以輕鬆註冊想要學習的課程，無需擔心地理位置或時間限制。我們的課程由經驗豐富的教師和專家設計，
              以互動式和富有趣味性的方式呈現，讓您能夠輕鬆自在地學習，同時享受學習的樂趣。
            </p>
            <button className="btn btn-primary btn-lg" type="button">
              See how it works.
            </button>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>學生登入</h2>
              <p>學生可以註冊他們感興趣的課程</p>
              {!currentUser && (
                <Link to="/login">
                  <button className="btn btn-outline-light">登入</button>
                </Link>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>講師登入</h2>
              <p>可以通過註冊成為一名講師，並開始製作線上課程</p>
              {!currentUser && (
                <Link to="/login">
                  <button className="btn btn-outline-secondary">登入</button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2024 Eric
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
