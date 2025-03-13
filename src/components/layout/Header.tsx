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
import { Bell, LogOut, Menu, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface HeaderProps {
  userName?: string;
  userRole?: "patient" | "doctor" | "admin";
  userAvatar?: string;
  notificationCount?: number;
  onLogin?: () => void;
  onLogout?: () => void;
  onNotificationsClick?: () => void;
}

const Header = ({
  userName = "Guest",
  userRole = "patient",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=medical",
  notificationCount = 3,
  onLogin = () => {},
  onLogout = () => {},
  onNotificationsClick = () => {},
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
                <DropdownMenuItem onClick={onNotificationsClick}>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                  {notificationCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </DropdownMenuItem>
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
            {/* Notifications */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onNotificationsClick}
                    className="relative"
                  >
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

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
