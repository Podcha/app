export function PodcastListPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
  <div className="card shadow-xl bg-base-100">
    <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">Lex Fridman Podcast</h2>
      <p>Hello!</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Follow</button>
      </div>
    </div>
  </div>
  
  <div className="card shadow-xl bg-base-100">
  <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Lex Fridman Podcast</h2>
    <p>Hello!</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Follow</button>
    </div>
  </div>
</div>
</div>
  );

}