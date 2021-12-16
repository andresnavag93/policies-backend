const db = require('../store/db');
(async () => {
  await db.seed.run();
})();