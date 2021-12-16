const db = require('../store/db');
(async () => {
  try {
    const migration = await db.migrate.latest();
    console.log(`Batch ${migration[0]} run: ${migration[1].length} migrations`);
    migration[1].length ? migration[1].map((i) => console.log(i)) : '';
    await db.seed.run();
  } catch (err) {
    console.log('error ',err)
  }
})();