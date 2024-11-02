import Link from 'next/link';

interface Desk {
  id: number;
  name: string;
  price: number;
  location: string;
}

export default function HomePage() {

  const desks: Desk[] = [
    { id: 1, name: "Desk 1", price: 25, location: "Downtown" },
    { id: 2, name: "Desk 2", price: 30, location: "Uptown" },
    { id: 3, name: "Desk 3", price: 20, location: "Suburban" },
    { id: 4, name: "Desk 4", price: 35, location: "Suburban" },
    { id: 5, name: "Desk 5", price: 35, location: "Downtown" },
    { id: 6, name: "Desk 6", price: 35, location: "Downtown" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Available Workspaces</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {desks.map((desk) => (
            <li key={desk.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{desk.name}</h2>
              <p className="text-gray-700">Price: <span className="font-medium">${desk.price}</span> per day</p>
              <p className="text-gray-700 mb-4">Location: {desk.location}</p>
              <Link href={`/desk/${desk.id}`}>
                Book Now
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
