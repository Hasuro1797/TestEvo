const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const createUser = require('./src/utils/createUser');


conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
})
.then(()=>{
  createUser();
})
.catch(error => {
  throw Error("Ocurrio un error agregando los usuarios", error);
})