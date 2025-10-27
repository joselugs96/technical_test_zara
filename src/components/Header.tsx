import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

function Header() {
  const isLoading = useAppSelector(
    (state) => state.loading.isLoading as boolean
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sm:px-12">
      <Link
        to="/"
        className="text-xl font-bold text-gray-800 hover:text-blue-600"
      >
        Podcaster
      </Link>

      {isLoading && (
        <div
          className="loading-indicator w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </header>
  );
}

export default Header;
