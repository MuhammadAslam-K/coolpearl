import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Index() {
    const navigate = useNavigate()

    const [auth, setAuth] = useState({
        email: "",
        password: ""
    })

    const handleLogin = () => {
        if (auth.email === "admin@admin.com" && auth.password === "admin") {
            localStorage.setItem("admin", true)
            navigate("/admin")
        } else {
            toast.error("Invalid Email or Password")
        }
    }

    useEffect(() => {
        if (localStorage.getItem("admin")) {
            navigate("/admin")
        }
    }, [])

    return (
        <div>
            <section className="text-black bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-gray-200 shadow-xl rounded-2xl md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-md:text-2xl ">
                                Sign in
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium">Your email</label>
                                    <input onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                                        type="email" name="email" id="email" className="bg-white border border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium">Password</label>
                                    <input onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                                        type="password" name="password" id="password" placeholder="••••••••" className="bg-white border border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Index