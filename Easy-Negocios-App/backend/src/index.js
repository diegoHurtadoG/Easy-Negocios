import app from './app'

const PORT = parseInt(process.env.PORT) || 8080;
//const HOST = '0.0.0.0'; // For local docker, update to app.listen(PORT, HOST, ()...)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});