import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function NavBar() {

    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState("")
    const { session, signOut } = UserAuth()
    const handleSignOut = async (e) => {
        e.preventDefault()
        try {
            await signOut()
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() !== "") {
            navigate(`/assetview/${searchInput.trim().toLowerCase()}`)
            setSearchInput("")
        }
    }
    return (
        <nav className="bg-blue-500 text-white w-full px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold">CryptoApp</h1>
            <Button
                onClick={handleSignOut}
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
            >
                Sign Out
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white text-lg">
                        Open Menu
                    </Button>
                </DropdownMenuTrigger>


                <DropdownMenuContent className="w-56 bg-white text-black z-50">
                    <DropdownMenuLabel className="text-blue-500 font-bold">Navigation</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Link to="/dashboard" className="text-black hover:text-gray-200 transition-colors">Dashboard</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link to="/alltickers" className="text-black hover:text-gray-200 transition-colors">All Tickers</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link to="/news" className="text-black hover:text-gray-200 transition-colors">News</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link to="/watchlist" className="text-black hover:text-gray-200 transition-colors">Watchlist</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link to="/portfolio" className="text-black hover:text-gray-200 transition-colors">Portfolio</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link to="/recommendations" className="text-black hover:text-gray-200 transition-colors">Recommendations</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Link to="/login" className="text-black hover:text-gray-200 transition-colors">Login</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link to="/signup" className="text-black hover:text-gray-200 transition-colors">Signup</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <form onSubmit={handleSearch} className="px-2 pt-2 flex gap-2">
                        <input
                            className="text-sm bg-white placeholder:text-gray-400 border border-black rounded-md"
                            type="search"
                            placeholder="Search Ticker (ex: Bitcoin)"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            size = "sm">
                            Search
                        </button>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}