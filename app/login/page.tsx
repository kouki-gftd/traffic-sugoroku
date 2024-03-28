const Page = () => {
  return (
    <div>
      <h1 className="m-10 text-4xl text-white font-bold">SUGOROKU</h1>
      <div className="login-container">
        <h1 className="mb-8 text-4xl font-bold">Login!</h1>
        <form action="" className="flex flex-col">
          <input type="text" name="password" className="mb-5 py-1 border rounded-lg" />
          <button className="submit bg-buttonColor py-2 font-bold rounded-lg text-white">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page;