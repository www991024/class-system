import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();

  const handleTakeToLogin = () => {
    history.push("/login");
  };
  const handleTakeToPostCourse = () => {
    history.push("/postCourse");
  };

  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert("註冊成功");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    console.log("Using effect");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }
    if (currentUser.user.role == "instructor") {
      CourseService.get(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
          if (data.data.length === 0) {
            alert("您沒有課程，請先註冊");
            handleTakeToPostCourse();
          }
        })
        .catch((err) => {
          console.log(err);
          alert("無法查詢課程！");
        });
    } else if (currentUser.user.role == "student") {
      CourseService.getEnrolledCourse(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>再查看您的課程之前，您必須登入.</p>
          <button
            onClick={handleTakeToLogin}
            className="btn btn-primary btn-lg"
          >
            轉到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師頁面</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生頁面</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div>
          <p>這是我們從伺服器收到的資料</p>
          {courseData.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>

                <p>student :{course.student.length}</p>
                {/* <a
                  href="#"
                  onClick={handleEnroll}
                  className="card-text"
                  className="btn btn-primary"
                  id={course._id}
                >
                  註冊
                </a> */}
                {/* <button className="btn btn-primary">{course.price}</button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CourseComponent;
