// Create web server application with express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = require('./comments.json');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static('public'));

// GET /comments
// Respond with the list of comments from comments.json
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments
// Add a comment to the list of comments in comments.json
app.post('/comments', (req, res) => {
  // Get the comment from the request body
  const comment = req.body;
  // Add the comment to the list of comments
  comments.push(comment);
  // Write the comments to the file
  fs.writeFile(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(comments),
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
      // Respond with the updated list of comments
      res.json(comments);
    }
  );
});

// DELETE /comments/:id
// Delete the comment with the given id from comments.json
app.delete('/comments/:id', (req, res) => {
  // Get the id of the comment to delete from the parameters
  const id = req.params.id;
  // Find the comment with the given id
  const commentIndex = comments.findIndex((comment) => comment.id == id);
  // If the comment doesn't exist, respond with a 404 status code
  if (commentIndex === -1) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  // Remove the comment from the list of comments
  comments.splice(commentIndex, 1);
  // Write the comments to the file
  fs.writeFile(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(comments),
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
      // Respond with the updated list of comments
      res.json(comments);
    }
  );
});

// Start the server
app.listen(port, () => {
  console
    .log(`Server running at http://localhost:${port}/`);
}
);

