



const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">{title}</h2>
        {children}
    </div>
);


export default ProfileSection;
