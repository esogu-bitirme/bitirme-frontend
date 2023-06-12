export const LandingPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <a
        href="/login"
        className="w-full rounded-lg  bg-indigo-500 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200"
      >
        Login
      </a>
      <a
        href="/register"
        className="w-full rounded-lg  bg-indigo-800 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200"
      >
        Register
      </a>
      <div>Landing page şu an yertutucu olarak random böyle, güzel bir şey eklenecektir.</div>
    </div>
  );
};
