import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w">
            <h1 className="text-5xl font-bold">Your favourite podcasts.</h1>
            <h1 className="text-5xl font-bold text-sky-500">On chain.</h1>
            <p className="py-6">Decentralized platform where you can find, collect and listen to the world’s best podcasts.</p>
            <Link to="/podcasts"><button className="btn btn-primary">Get Started</button></Link>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-base-400">

        <div className="carousel carousel-center justify-center p-4 space-x-4 rounded-box">
          <div className="carousel-item rounded-box">
            <img src="Image-2.png" alt="Podcast" />
          </div>
          <div className="carousel-item">
            <img src="Image-3.png" alt="Podcast" />
          </div>
          <div className="carousel-item">
            <img src="Image-4.png" alt="Podcast" />
          </div>
          <div className="carousel-item">
            <img src="Image-5.png" alt="Podcast" />
          </div>

        </div>

        <div className="grid grid-cols-1 max-w place-items-center text-center space-y-8">
          <h1 className="max-w-md justify-center text-3xl font-bold">Support your favourite creators and get access to <span className="text-sky-500">premium</span> content. </h1>
          <h1 className="max-w-md text-3xl font-bold">Pick episode, <span className="text-sky-500">collect</span>, and tune in.</h1>
          <p className="max-w-md text-3xl font-bold">Show off your collected episodes as <span className="text-sky-500">NFTs</span>.</p>
        </div>

      </div>

      <div className="min-h-screen bg-base-400">

<img src="podcast-girl.gif"></img>
      <div className="grid grid-cols-1 max-w place-items-center text-center space-y-8">
          <h1 className="max-w-md justify-center text-3xl font-bold">Create your own <span className="text-sky-500">monetization</span> strategy.</h1>
          <h1 className="max-w-md py-6">As a creator, you can configure your own monetization strategy: free or paid subscription on a podcast level, and even micropayments on an episode level. Experiment with free and premium content, engage your audience and create your own content market!</h1>
        </div>

      </div>

    </div>
  );
}
