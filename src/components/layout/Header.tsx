import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Menu, User } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userRole?: "patient" | "doctor" | "admin";
  userAvatar?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Header = ({
  userName = "Guest",
  userRole,
  userAvatar,
  onLogin = () => {},
  onLogout = () => {},
}: HeaderProps) => {
  const isLoggedIn = !!userRole;

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-8 lg:px-12">
      <div className="flex items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xl font-bold">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Medical Office</h1>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isLoggedIn ? (
              <>
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={onLogin}>
                <User className="mr-2 h-4 w-4" />
                <span>Login</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Authentication */}
      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
            <Avatar>
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={userName} />
              ) : (
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={onLogin}>
            <User className="mr-2 h-4 w-4" />
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
