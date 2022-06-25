import './app.css'

function App() {

  return (

    <div className="navbar flex-5 bg-base-100 rounded-box">

      <a className="btn btn-ghost normal-case text-xl">Podcha</a>

    

      <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-152">
        <li><a>Podcasts</a></li>
        <li><a>Episodes</a></li>
        <li><a>My show</a></li>


      </ul>

      <div className="dropdown dropdown-end">
      
      

      <button className="btn justify-right"><label className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=33791" />
        </div>
      </label>@lensrocks</button>

      </div>
 
    </div>

    );
}

export default App;
