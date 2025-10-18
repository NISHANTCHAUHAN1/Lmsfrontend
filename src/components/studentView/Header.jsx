import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { GraduationCap, MenuIcon, TvMinimalPlay, XIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext";

const Header = () => {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // Fixed the useState hook

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold md:text-xl text-[14px]">
            Study Club
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="font-extrabold md:text-xl text-[14px]">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button onClick={handleLogout}>Sign Out</Button>
        </div>
        {/* Hamburger Button */}
        <button
          className="md:hidden flex justify-center items-center w-8 h-8 bg-gray-200 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <XIcon className="w-4 h-4" />
          ) : (
            <MenuIcon className="w-4 h-4" />
          )}
        </button>
      </div>
      {/* Hamburger Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full right-0 bg-white shadow-md p-4 w-48">
          <div className="flex flex-col space-y-2">
            <div
              onClick={() => {
                location.pathname.includes("/courses")
                  ? null
                  : navigate("/courses");
              }}
              className="flex cursor-pointer items-center gap-2"
            >
              <span className="font-extrabold text-[14px]">
                Explore Courses
              </span>
              {/* <TvMinimalPlay className="w-6 h-6 cursor-pointer" /> */}
            </div>
            <div
              onClick={() => navigate("/student-courses")}
              className="flex cursor-pointer items-center gap-2"
            >
              <span className="font-extrabold text-[14px]">My Courses</span>
              <TvMinimalPlay className="w-6 h-6 cursor-pointer" />
            </div>
            <Button onClick={handleLogout} className="text-[14px]">
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
