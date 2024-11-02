"use client";

import TimeGrid from "../../components/Timegrid";

export default function TimeSelectionPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Select a Time Slot</h1>
                {/* Use the TimeGrid component */}
                <TimeGrid />
            </div>
        </div>
    );
}
