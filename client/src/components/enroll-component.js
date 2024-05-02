import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    history.push("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (!searchInput.trim()) {
      window.alert("請輸入課程！");
      return;
    }
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = async (e) => {
    try {
      const enrolledCourses = await CourseService.getEnrolledCourse(
        currentUser.user._id
      );

      const courseId = e.target.id;
      const isAlreadyEnrolled = enrolledCourses.data.some(
        (course) => course._id === courseId
      );

      if (isAlreadyEnrolled) {
        window.alert("您已註冊過該課程！");
      } else {
        // 如果用户没有注册过当前课程，则进行注册
        await CourseService.enroll(courseId, currentUser.user._id);
        window.alert("註冊成功");
        history.push("/course");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleEnroll = (e) => {
  //   CourseService.enroll(e.target.id, currentUser.user._id)
  //     .then(() => {
  //       window.alert("註冊成功");
  //       history.push("/course");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>只有學生可以註冊新的課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            class="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult ? (
        searchResult.length != 0 ? (
          <div>
            <p>這是我們從伺服器收到的資料</p>
            {searchResult.map((course) => (
              <div key={course._id} className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p>Price: {course.price}</p>
                  <p>Student: {course.student.length}</p>
                  <a
                    href="#"
                    onClick={handleEnroll}
                    className="card-text"
                    className="btn btn-primary"
                    id={course._id}
                  >
                    註冊
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>搜尋不到課程</p>
        )
      ) : null}

      {/* {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>Data we got back from API.</p>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>Price: {course.price}</p>
                <p>Student: {course.student.length}</p>
                <a
                  href="#"
                  onClick={() => handleEnroll(course._id)}
                  className="btn btn-primary"
                >
                  Enroll
                </a>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default EnrollComponent;
