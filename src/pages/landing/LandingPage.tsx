import { Link } from "react-router-dom";
import Player from "lottie-react";
import podcastgirl from './51643-podcast-girl.json';
import datacenter from './67171-data-center.json';

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

      <div className="bg-base-200 min-h-screen flex flex-col place-content-between">

        <div className="flex flex-row align-start">

          <Player
            animationData={podcastgirl}
            style={{ height: '300px', width: '300px' }}
          >
          </Player>

          <div className="flex flex-col max-w place-items-center text-center space-y-8">
            <h1 className="max-w-md justify-center text-3xl font-bold">Create your own <span className="text-sky-500">monetization</span> strategy.</h1>
            <h1 className="max-w-md py-6">As a creator, you can configure your own monetization strategy: free or paid subscription on a podcast level, and even micropayments on an episode level. Experiment with free and premium content, engage your audience and create your own content market!</h1>
          </div>



        </div>
        <div className="flex flex-row-reverse">

          <div className="flex flex-col max-w place-items-center text-center space-y-8">
            <h1 className="max-w-md justify-center text-3xl font-bold">Be in <span className="text-sky-500">control</span> of your data.</h1>
            <h1 className="max-w-md py-6">The social graph is on the blockchain, and your audio or video is stored and hosted in a peer to peer platform.</h1>
          </div>

          <Player
            animationData={datacenter}
            style={{ height: '300px', width: '300px' }}
          >
          </Player>

        </div>
      </div>

      <div className="min-h-screen bg-base-400 grid grid-col p-20">
        <div className="flex flex-col">
          <p className="max-w-md place-self-center text-center text-3xl font-bold">Built with</p>
          <img src="Sponsors.png"></img>
        </div>

          <p className="max-w-md align-bottom place-self-center text-center text-3xl font-bold">Let’s take back control over podcasts together!</p>

       
      </div>
    </div>
  );
}
