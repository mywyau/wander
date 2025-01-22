import DeskListingController from "@/controllers/desk/DeskListingController";

interface DesksPageProps {
  params: { officeId: string };
}

export default async function DesksPage({ params }: DesksPageProps) {
  if (!params?.officeId) {
    return <p>Invalid or missing Office ID.</p>;
  }

  const { officeId } = params;
  const url = `http://localhost:1011/pistachio/business/desk/listing/cards/stream/${officeId}`;

  const desks: any[] = []; // Ensure desks array is defined
  try {
    const res = await fetch(url);

    if (!res.body) {
      throw new Error("ReadableStream not supported");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim());
        for (const line of lines) {
          try {
            const parsedLine = JSON.parse(line);
            desks.push(parsedLine);
          } catch (err) {
            console.error("Failed to parse JSON chunk:", line);
          }
        }
      }
    }

    return (
      <div>
        <h1>Desk Listings for Office ID: {officeId}</h1>
        <ul>
          {desks.map((desk, index) => (
            <li key={index}>
              <strong>{desk.deskName}</strong>: {desk.description}
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching desk listings:", error);
    return <p>Failed to load desk listings. Please try again later.</p>;
  }
}
