const fetch = require('node-fetch');

exports.handler = async function(event) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { text } = JSON.parse(event.body);
    if (!text) throw new Error("No text provided");

    const GIST_ID = "5c3e7a48dbd5b88c9cb5f6bff7da2dce";
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Set in Netlify dashboard

    // Get current gist
    const gistRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const gistData = await gistRes.json();

    // Update messages
    const messages = JSON.parse(gistData.files['comments.json'].content);
    messages.push({
      date: new Date().toLocaleString(),
      text: text
    });

    // Save updated gist
    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: { 
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        files: {
          "comments.json": { content: JSON.stringify(messages) }
        }
      })
    });

    return { statusCode: 200, body: "Message saved" };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};
