import React from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState("")

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() !== "") {
            navigate(`/assetview/${searchInput.trim().toLowerCase()}`)
            setSearchInput("")
        }
    }
    return (
        <div className="container mx-auto p-4 flex flex-shrink">
            <NavigationMenu className="bg-blue-500 border-4 rounded-md w-full max-w-7xl font-bold flex-shrink justify-center">
                <NavigationMenuList className="flex items-center gap-4">
                    <div className="flex flex-shrink">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/dashboard" className="text-white hover:text-gray-200 transition-colors">Dashboard</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                    <div className="flex flex-shrink">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/alltickers" className="text-white hover:text-gray-200 transition-colors">All Tickers</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                    <div className="flex flex-shrink">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/news" className="text-white hover:text-gray-200 transition-colors">News</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                    <div className="flex flex-shrink">
                        <NavigationMenuItem className="border-4 rounded-md border-black text-black bg-white flex items-center gap-2">
                            <form onSubmit={handleSearch}>
                                <input
                                    className="text-black placeholder:text-xs w-48"
                                    type="search"
                                    placeholder="Search Ticker (ex: Bitcoin)" 
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-1 px-2 rounded-md">
                                    Search
                                </button>
                            </form>
                        </NavigationMenuItem>
                    </div>
                    <div className="flex flex-shrink">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/watchlist" className="text-white hover:text-gray-200 transition-colors">Watchlist</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                    <div className="flex flex-shrink">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/portfolio" className="text-white hover:text-gray-200 transition-colors">Portfolio</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                    <div className="flex flex-shrink">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/recommendations" className="text-white hover:text-gray-200 transition-colors">Recommendations</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                    <div className="flex flex-shrink">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/login" className="text-white hover:text-gray-200 transition-colors">Login</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                    <div className="flex flex-shrink">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/signup" className="text-white hover:text-gray-200 transition-colors">Signup</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </NavigationMenu >
        </div >
    )
}