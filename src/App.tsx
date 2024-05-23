import { useState, useEffect } from 'react';

function App() {
  const [researchs, setResearchs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/research", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log("Result:", result.items);
        setResearchs(result.items);
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {researchs.length>0 && researchs.map((research: any) => (
        <div key={research.pureId}>
          <h3>{research.title.value}</h3>
          <a href={research.links[0].url}>Link del documento</a>
        </div>
      ))}
    </div>
  );
}

export default App;
