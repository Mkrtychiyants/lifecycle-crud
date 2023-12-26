import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

const notes = [
  {
    "id": 0,
    "content": "Google and startup Quantinuum performed breakthrough experiments in quantum computing. Conflicting views of the results’ significance show the challenges of making quantum computers practical. " 
  },
  {
    "id": 1,
    "content": "he world’s biggest computing companies and a raft of well-funded startups all agree: The future of computing is manipulating data with quantum mechanics. Over the past decade, governments, private companies, and venture capitalists have collectively invested billions of dollars into quantum computing,  " 
  }
];
let nextId = 1;

app.get("/notes", (req, res) => {
  // console.log(req.body)
  console.log(req.body+ "get")
  res.send(JSON.stringify(notes));
});

app.post("/notes", (req, res) => {
  notes.push({ ...req.body, id: nextId++ });
  res.status(204);
  res.end();
});

app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);
  console.log(req.params.id);
  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  res.status(204);
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));