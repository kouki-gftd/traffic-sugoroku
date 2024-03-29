const Page = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="mt-8 ml-10 text-4xl text-white font-bold">SUGOROKU</h1>
        <h1 className="mt-8 mr-10 text-4xl text-white font-bold">View Result</h1>
      </div>
      <div className="create-new-room-container">
        <div className="my-10 text-5xl font-bold">
          Create New Room
        </div>
        <p className="mt-5 mb-5 text-2xl font-bold">Choose Game Mode</p>
        <div className="game-mode">
          <div>
            <h1>Basic</h1>
            <p>Who arrives the fastest?</p>
          </div>
          <div>
            <h1>Aging Society</h1>
            <p>Elderly people can only use trains</p>
          </div>
          <div>
            <h1>Mountain Climbing</h1>
            <p>Goal early with everyone</p>
          </div>
          <div>
            <h1>Viewing Cherry Blossoms</h1>
            <p>Two of you must quickly reserve a nice spot</p>
          </div>
        </div>
        <button className="my-5 px-20 py-3 bg-buttonColor font-bold rounded-lg text-white">Next</button>
      </div>
    </div>
  )
}

export default Page;