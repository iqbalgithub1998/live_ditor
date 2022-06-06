import { useEffect } from "react";
import HomeForm from "../components/HomeForm";

const Home = () => {
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-[#f8fff8] flex justify-center items-center">
      <HomeForm />
    </div>
  );
};

export default Home;
