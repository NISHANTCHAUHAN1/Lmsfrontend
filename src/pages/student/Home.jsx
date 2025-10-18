// home page where categories of courses
import { courseCategories } from "@/config";
import banner from "/banner-img.png";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/studentContext";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Home = () => {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function fetchAllStudentViewCourseList() {
    const response = await fetchStudentViewCourseListService();
    // console.log(response);
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  function handleNavigateToCoursesPage(getCurrentId) {
    // console.log(getCurrentId);
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  useEffect(() => {
    fetchAllStudentViewCourseList();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white">
        <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl font-bold mb-4">Learning thet gets you</h1>
            <p className="text-xl">
              Skills for your present and your future. Get Started with US
            </p>
          </div>
          <div className="lg:w-full mb-8 lg:mb-0">
            <img
              src={banner}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="py-8 px-4 lg:px-8 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {courseCategories.map((categoryItem) => (
              <Button
                className="justify-start"
                variant="outline"
                key={categoryItem.id}
                onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              >
                {categoryItem.label}
              </Button>
            ))}
          </div>
        </section>

        <section className="py-12 px-4 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
              studentViewCoursesList.map((courseItem, index) => (
                <div
                  key={index}
                  onClick={() => handleCourseNavigate(courseItem?._id)}
                  className="border rounded-lg overflow-hidden shadow cursor-pointer transform
                   transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                >
                  <img
                    src={courseItem?.image}
                    width={300}
                    height={150}
                    className="w-full h-40 object-cover"
                    alt="courseImg"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      {courseItem?.instructorName}
                    </p>
                    <p className="font-bold text-[16px]">
                      ${courseItem?.pricing}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Course Found</h1>
            )}
          </div>
        </section>
      </div>

      <footer className="bg-white text-gray-800 py-4 px-6 border-t border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © 2024 Developed by{" "}
            <Link
              to="https://nish14.vercel.app/"
              className="text-blue-500 hover:underline hover:text-blue-700 transition duration-300"
            >
              Nishant
            </Link>
          </p>

          <div className="flex items-center space-x-6 mt-2 md:mt-0">
            <Link
              to="https://www.linkedin.com/in/nishant-chauhan-b76371255/"
              className="text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:scale-125"
            >
              <Linkedin size={24} />
            </Link>

            <span className="text-sm text-gray-600 hover:text-gray-800 transition duration-300 cursor-pointer">
              Terms of Service
            </span>
            <span className="text-sm text-gray-600 hover:text-gray-800 transition duration-300 cursor-pointer">
              Privacy
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
