// import React from "react";
// import { NavigationMenu, NavigationMenuList, NavigationMenuItem} from "../ui/navigation-menu"
// import { Link } from "react-router-dom";
// export default function NavBar() {


//     //neeed to add redirecting for search for website that takes them to assetview
//     return (
//         <div className="justify-center container mx-auto p-4">
//             <NavigationMenu className="bg-blue-500  border-4 rounded-md w-full max-w-7xl font-bold flex-shrink ">
//                 <NavigationMenuList >









//                     <NavigationMenuItem>
//                         <Link to="/dashboard">DashBoard</Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/alltickers">All Tickers</Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/news">News</Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem className="border-4 rounded-md border-black text-black bg-white">
//                         <form>
//                             <input classname="text-black placeholder:text-xs " type="search" placeholder="Search Ticker(ex: BTC)" />
//                             <button type="submit">Search</button>
//                         </form>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/watchlist">Watchlist</Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/portfolio">Portfolio</Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/recommendations">Recommendations</Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/login">Login</Link>
//                     </NavigationMenuItem>


//                     <NavigationMenuItem>
//                         <Link to="/signup">Signup</Link>
//                     </NavigationMenuItem>

//                 </NavigationMenuList>
//             </NavigationMenu>
//         </div>
//     )
// }