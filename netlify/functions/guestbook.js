// netlify/functions/guestbook.js
exports.handler = async function(event) {
  const GIST_ID = 'ef5e3a7116b9bf56ee8f9376096dd5c7';
  const GIST_FILE = 'guestbook.json';
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  // GET existing messages
  const getRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: { 
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  const gist = await getRes.json();
  let arr = [];
  if (gist.files?.[GIST_FILE]) {
    arr = JSON.parse(gist.files[GIST_FILE].content || '[]');
  }
  if (event.httpMethod === 'GET') {
    return { statusCode: 200, body: JSON.stringify(arr) };
  }

  // POST new message
  const { text } = JSON.parse(event.body || '{}');
  arr.push({ date: new Date().toLocaleString(), text });
  await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      files: { [GIST_FILE]: { content: JSON.stringify(arr, null, 2) } }
    })
  });
  return { statusCode: 200, body: JSON.stringify(arr) };
};
