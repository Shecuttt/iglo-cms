import React from 'react'

const Login = () => {
  return (
    <div className='overflow-hidden'>
      <section className="bg-red-100 h-screen relative">

      {/* <!-- Circle --> */}
      <div className=" absolute bg-red-200 rounded-full w-80 h-80 -m-16 ml-32 -mt-48"></div>
      <div className=" absolute bg-rose-700 rounded-full w-96 h-96 -m-16 -ml-28 opacity-85"></div>
      {/* <!-- Circle --> */}

      {/* <!-- Circle --> */}
      <div className="bottom-0 right-0 absolute bg-red-200 rounded-full w-80 h-80 -mb-36 mr-24"></div>
      <div className="bottom-0 right-0 absolute bg-rose-700 rounded-full w-96 h-96 -mb-24 -mr-24 opacity-85"></div>
      {/* <!-- Circle --> */}

      {/* <!-- Start Form --> */}

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-950">TECH <span className="text-red-900">TOLK</span></h1>
              <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">IGLO</h2>
            </div>
          
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg shadow-xl p-10">
              <h2 className="mb-6 font-bold text-red-900 text-xl text-center">Sign in</h2>
              <form className="space-y-4" action="index.html" method="POST">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>                      
                  </div>
                  <input name="username" type="username" autocomplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 px-4 ps-10 bg-slate-200" placeholder="Username" />
                </div>
          
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>                      
                  </div>
                  <input name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 px-4 ps-10 bg-slate-200" placeholder="Password" />
                  <div className="absolute inset-y-0 end-0 flex items-center pe-2.5 text-gray-400">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hidden">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                  </div>
                </div>
          
                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 text-lg">Sign in</button>
                </div>
              </form>
            </div>
          </div>

      {/* <!-- End form --> */}

      </section>
    </div>
  )
}

export default Login