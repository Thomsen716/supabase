import { Link } from "react-router";

function Brand() {
  return (
    <div className="w-full mx-auto flex gap-2">
      <img
        src="/vite.svg"
        alt="Sterner Solutions logo"
        className="h-6 sm:h-8 w-auto"
      />

      <Link to="/" className="text-white text-lg font-bold">
        Sterner Solutions
      </Link>
    </div>
  );
}

export default Brand;
