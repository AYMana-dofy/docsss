import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ClipboardListIcon,
  FileTextIcon,
  HomeIcon,
  LogOutIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  HeartPulseIcon,
} from "lucide-react";

interface PatientSidebarProps {
  userName?: string;
  userAvatar?: string;
  activePath?: string;
  notificationCount?: number;
  pendingQuestionnaires?: number;
}

const PatientSidebar = ({
  userName = "Sarah Johnson",
  userAvatar = "",
  activePath = "/dashboard",
  notificationCount = 3,
  pendingQuestionnaires = 2,
}: PatientSidebarProps) => {
  // Define navigation items for patient
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <HomeIcon size={20} /> },
    {
      path: "/questionnaires",
      label: "Health Questionnaires",
      icon: <ClipboardListIcon size={20} />,
      badge: pendingQuestionnaires > 0 ? pendingQuestionnaires : undefined,
    },
    {
      path: "/appointments",
      label: "Appointments",
      icon: <CalendarIcon size={20} />,
    },
    {
      path: "/reports",
      label: "Medical Reports",
      icon: <FileTextIcon size={20} />,
    },
    {
      path: "/messages",
      label: "Messages",
      icon: <MessageSquareIcon size={20} />,
    },
    {
      path: "/health-tracker",
      label: "Health Tracker",
      icon: <HeartPulseIcon size={20} />,
    },
    {
      path: "/notifications",
      label: "Notifications",
      icon: <BellIcon size={20} />,
      badge: notificationCount > 0 ? notificationCount : undefined,
    },
    {
      path: "/profile",
      label: "Profile Settings",
      icon: <UserIcon size={20} />,
    },
    {
      path: "/settings",
      label: "Account Settings",
      icon: <SettingsIcon size={20} />,
    },
  ];

  return (
    <div className="h-full w-[280px] bg-background border-r flex flex-col">
      {/* User profile section */}
      <div className="p-6 flex flex-col items-center space-y-3">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {userName
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="font-medium text-lg">{userName}</h3>
          <p className="text-sm text-muted-foreground">Patient Portal</p>
        </div>
      </div>

      <Separator />

      {/* Navigation links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 font-normal h-12",
                activePath === item.path && "bg-accent text-accent-foreground",
              )}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && (
                <Badge variant="destructive" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Logout button */}
      <div className="p-4 mt-auto">
        <Button variant="outline" className="w-full justify-start gap-3 h-12">
          <LogOutIcon size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default PatientSidebar;
