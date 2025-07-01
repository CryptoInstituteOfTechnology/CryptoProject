import React from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu"
import { Link} from "react-router-dom";
export default function NavBar() {


    //neeed to add redirecting for search for website that takes them to assetview
    // bunch of links to other views
    //later add in logic for asset view when searching!
    return (
        <div className="justify-center container mx-auto p-4">
            <NavigationMenu className="bg-blue-500  border-4 rounded-md w-full max-w-7xl font-bold flex-shrink ">
                <NavigationMenuList >

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/dashboard">DashBoard</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/alltickers">All Tickers</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/news">News</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem className="border-4 rounded-md border-black text-black bg-white">
                        <form>
                            <input className="text-black placeholder:text-xs " type="search" placeholder="Search Ticker(ex: BTC)" />
                            <button type="submit">Search</button>
                        </form>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/watchlist">Watchlist</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/portfolio">Portfolio</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/recommendations">Recommendations</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/login">Login</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/signup">Signup</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}