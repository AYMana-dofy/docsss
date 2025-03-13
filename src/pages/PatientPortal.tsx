import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import PatientOverview from "@/components/dashboard/PatientOverview";
import QuestionnaireManager from "@/components/questionnaires/QuestionnaireManager";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import PatientReportViewer from "@/components/reports/PatientReportViewer";
import PatientProfile from "@/components/profile/PatientProfile";

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock patient data
  const patientData = {
    id: "P-12345",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    summaryData: {
      nextAppointment: {
        date: "May 15, 2023",
        time: "10:30 AM",
        doctor: "Dr. Emily Chen",
        type: "Annual Check-up",
      },
      pendingQuestionnaires: 2,
      recentLabResults: {
        count: 3,
        new: 1,
      },
      notifications: {
        count: 5,
        urgent: 2,
      },
    },
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Render the appropriate content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <PatientOverview
            patientName={patientData.name}
            patientId={patientData.id}
            summaryData={patientData.summaryData}
          />
        );
      case "questionnaires":
        return <QuestionnaireManager patientId={patientData.id} />;
      case "appointments":
        return <AppointmentCalendar />;
      case "reports":
        return <PatientReportViewer patientName={patientData.name} />;
      case "profile":
        return <PatientProfile />;
      default:
        return (
          <PatientOverview
            patientName={patientData.name}
            patientId={patientData.id}
            summaryData={patientData.summaryData}
          />
        );
    }
  };

  return (
    <MainLayout
      userRole="patient"
      userName={patientData.name}
      userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
      notificationCount={patientData.summaryData.notifications.count}
      pendingQuestionnaires={patientData.summaryData.pendingQuestionnaires}
    >
      <div className="w-full h-full bg-gray-50">
        {/* Mobile Tabs - Only visible on small screens */}
        <div className="md:hidden w-full bg-white p-2 border-b sticky top-0 z-10">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="dashboard">Home</TabsTrigger>
              <TabsTrigger value="questionnaires">Forms</TabsTrigger>
              <TabsTrigger value="appointments">Appts</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="container mx-auto p-4">{renderContent()}</div>
      </div>
    </MainLayout>
  );
};

export default PatientPortal;
