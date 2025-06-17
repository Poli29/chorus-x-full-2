import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];
      const response = await fetch("https://Poli76-chorus-x-full.hf.space", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image })
      });
      const data = await response.json();
      setVerdict(data);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CHORUS-X™ Verdict Viewer</h1>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {verdict && (
        <pre style={{ textAlign: "left", marginTop: "20px" }}>
          Verdict: {verdict.finalVerdict}
          <br />
          {JSON.stringify(verdict, null, 2)}
        </pre>
      )}
    </div>
  );
}