import app from './app'

const PORT = parseInt(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Listening on port ${PORT}`);
});