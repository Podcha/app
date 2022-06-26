import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div>
      <div className="min-h-screen hero bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w">
            <h1 className="text-5xl font-bold">Your favourite podcasts.</h1>
            <h1 className="text-5xl font-bold text-sky-500">On chain.</h1>
            <p className="py-6">
              Decentralized platform where you can find, collect and listen to
              the world’s best podcasts.
            </p>
            <Link to="/podcasts">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
