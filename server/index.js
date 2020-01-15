require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  select "productId",
         "name",
         "price",
         "image",
         "shortDescription"
    from "products"
  `;
  db.query(sql)
    .then(data => res.json(data.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const sql = `
  select *
    from "products"
   where "productId" = $1
  `;
  const productId = [req.params.productId];
  db.query(sql, productId)
    .then(data => {
      if (data.rows[0]) {
        res.json(data.rows[0]);
      } else {
        next(new ClientError('Cannot find a product with that ID', 404));
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (req.session.cartId) {
    const sessionSql = `
    select "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
     where "c"."cartId" = $1
    `;
    const sessionCartId = [req.session.cartId];
    db.query(sessionSql, sessionCartId)
      .then(data => res.json(data.rows));
  } else {
    const sql = `
    select *
      from "cartItems"
    `;
    db.query(sql)
      .then(data => res.json(data.rows));
  }
});

app.post('/api/cart/:productId', (req, res, next) => {
  if (req.params.productId < 1) next(new ClientError('Product ID must be a positive integer', 400));
  const sql = `
  select "price"
    from "products"
   where "productId" = $1
  `;
  const productId = [req.params.productId];
  db.query(sql, productId)
    .then(data => {
      if (!data.rows) {
        next(new ClientError('Cannot find a product with that ID', 400));
      } else {
        if (req.session.cartId) {
          return {
            cartId: req.session.cartId,
            price: data.rows[0].price
          };
        } else {
          const cartSql = `
          insert into "carts" ("cartId", "createdAt")
          values (default, default)
          returning "cartId"
          `;
          return db.query(cartSql)
            .then(result => {
              return {
                cartId: result.rows[0].cartId,
                price: data.rows[0].price
              };
            });
        }
      }
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const cartIdSql = `
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId"
      `;
      const cartInfo = [data.cartId, req.params.productId, data.price];
      return db.query(cartIdSql, cartInfo);
    })
    .then(result => {
      const cartItemIdSql = `
      select "c"."cartItemId",
            "c"."price",
            "p"."productId",
            "p"."image",
            "p"."name",
            "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1
      `;
      const cartItemId = [result.rows[0].cartItemId];
      db.query(cartItemIdSql, cartItemId)
        .then(data => res.status(201).json(data.rows[0]));
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
