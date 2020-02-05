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

app.get('/api/products/all/:category', (req, res, next) => {
  const category = [req.params.category];
  const sql = `
    select "productId",
           "album",
           "artist",
           "price",
           "albumArt",
           "name",
           "brand",
           "color",
           "category"
      from "products"
     where "category" = $1
    `;
  db.query(sql, category)
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
           "c"."quantity",
           "p"."productId",
           "p"."albumArt",
           "p"."album",
           "p"."artist",
           "p"."name",
           "p"."brand",
           "p"."color",
           "p"."category"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
     where "c"."cartId" = $1
    `;
    const sessionCartId = [req.session.cartId];
    db.query(sessionSql, sessionCartId)
      .then(data => res.json(data.rows));
  } else {
    res.json([]);
  }
});

app.get('/api/cart/:productId', (req, res, next) => {
  const checkQuantitySQL = `
  select "quantity"
    from "cartItems"
   where "cartId" = $1 and "productId" = $2
  `;
  const checkQuantityParams = [req.session.cartId, req.params.productId];
  db.query(checkQuantitySQL, checkQuantityParams)
    .then(response => res.json(response.rows[0]));
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
        throw new ClientError('Cannot find a product with that ID', 400);
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
      const checkProductIdSql = `
      select * from "cartItems"
      where "cartId" = $1 and "productId" = $2
      `;
      const checkProductIdParams = [data.cartId, req.params.productId];
      return (
        db.query(checkProductIdSql, checkProductIdParams)
          .then(response => {
            if (response.rowCount === 0) {
              const cartIdSql = `
              insert into "cartItems" ("cartId", "productId", "price", "quantity")
              values ($1, $2, $3, 1)
              returning "cartItemId"
              `;
              const cartInfo = [data.cartId, req.params.productId, data.price];
              return db.query(cartIdSql, cartInfo);
            } else {
              const cartIdSql = `
                 update "cartItems"
                    set "quantity" = "quantity" + 1
                  where "cartId" = $1 and "productId" = $2
              returning "cartItemId";
              `;
              const params = [data.cartId, req.params.productId];
              return db.query(cartIdSql, params);
            }
          })
      );
    })
    .then(result => {
      const cartItemIdSql = `
      select "c"."cartItemId",
            "c"."price",
            "c"."quantity",
            "p"."productId",
            "p"."albumArt",
            "p"."album",
            "p"."description",
            "p"."name",
            "p"."brand",
            "p"."color",
            "p"."category"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1
      `;
      const cartItemId = [result.rows[0].cartItemId];
      return db.query(cartItemIdSql, cartItemId)
        .then(data => res.status(201).json(data.rows[0]));
    })
    .catch(err => next(err));
});

app.patch('/api/cart/:productId', (req, res, next) => {
  const cartIdSql = `
      update "cartItems"
        set "quantity" = "quantity" - 1
      where "cartId" = $1 and "productId" = $2
  returning "cartItemId";
  `;
  const params = [req.session.cartId, req.params.productId];
  db.query(cartIdSql, params)
    .then(result => {
      const cartItemIdSql = `
      select "c"."cartItemId",
            "c"."price",
            "c"."quantity",
            "p"."productId",
            "p"."albumArt",
            "p"."album",
            "p"."description",
            "p"."name",
            "p"."brand",
            "p"."color",
            "p"."category"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1
      `;
      const cartItemId = [result.rows[0].cartItemId];
      return db.query(cartItemIdSql, cartItemId)
        .then(data => res.status(201).json(data.rows[0]));
    })
    .catch(err => next(err));
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const sql = `
  delete from "cartItems"
   where "cartItemId" = $1
  `;
  const cartItemId = [req.params.cartItemId];
  db.query(sql, cartItemId)
    .then(res.status(202).json(`Item with Cart Item ID of ${req.params.cartItemId} was successfuly removed.`))
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) throw new ClientError('Cannot find a cart session with that ID', 400);
  const orderSql = `
  insert into "orders" ("cartId", "fName", "lName", "address1", "address2", "city", "state", "zip", "creditCardNumber", "month", "year", "cvv")
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  returning "orderId",
            "createdAt",
            "fName",
            "lName",
            "address1",
            "address2",
            "city",
            "state",
            "zip",
            "creditCardNumber",
            "month",
            "year",
            "cvv"
  `;
  const customerInfo = [req.session.cartId, req.body.fName, req.body.lName, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.creditCardNumber, req.body.month, req.body.year, req.body.cvv];
  db.query(orderSql, customerInfo)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
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
