import { useLocation } from "react-router";

const Footer = () => {
  const { pathname } = useLocation();

  const isInValid =
    pathname !== "/" &&
    pathname !== "/login" &&
    pathname !== "/mypage" &&
    pathname !== "/calendar";

  if (isInValid) {
    return null;
  }

  return (
    <footer className="text-myorange py-4 mt-[40px] mb-[40px]">
      <div className="container mx-auto px-[140px] gap-[40px] flex justify-center items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold">TOY FIVE</span>
          <span className="mx-2">
            &copy; {new Date().getFullYear()} Toyproject Co.{" "}
          </span>
        </div>
        <div className="flex space-x-4">
          <div className="hover:text-gray-400">React</div>
          <div className="hover:text-gray-400">Redux</div>
          <div className="hover:text-gray-400">Firebase</div>
          <div className="hover:text-gray-400">Typescript</div>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://github.com/mj950313/toy-intranet2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="src/images/gitlogo.svg"
              alt="Team Five github"
              className="w-10 h-10 mr-2"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
