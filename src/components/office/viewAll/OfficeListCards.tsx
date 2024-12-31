

import { OfficeListing } from "@/types/office/OfficeListing";
import Link from "next/link";


interface OfficeListingsCardsProp {
    filteredOffices: OfficeListing[];
    currentOffices: OfficeListing[];
    onDeleteLinkSubmit: (officeId: string) => Promise<void>;
}

const OfficeListCards: React.FC<OfficeListingsCardsProp> = (
    {
        filteredOffices,
        currentOffices,
        onDeleteLinkSubmit
    }
) => {
    return (
        filteredOffices.length === 0 ? (
            <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No offices found.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentOffices.map((office) => (
                    <div
                        key={office.officeId}
                        className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">{office.officeSpecifications.officeName}</h2>
                            <p className="text-gray-600 text-sm">
                                {office.officeSpecifications.description || "No description provided."}
                            </p>
                        </div>
                        <div className="mt-2 flex gap-6">
                            <Link
                                href={`/business/office/detailed-view`}
                                className="text-base text-blue-600 rounded hover:text-blue-800 underline"
                            >
                                View listing
                            </Link>
                            <button
                                className="text-base text-red-500 rounded hover:text-red-700 underline"
                                onClick={
                                    () => onDeleteLinkSubmit(office.officeId)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    )
}

export default OfficeListCards;







