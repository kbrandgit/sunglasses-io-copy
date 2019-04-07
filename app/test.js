let chai = require("chai");
let chaiHttp = require("chai-http");
let server = "http://localhost:3001";
let expect = require("chai").expect;
let should = chai.should();

chai.use(chaiHttp);

describe("/GET brands", () => {
  //GET all Brands - should return 200 Successful operation.
  it("it should GET all the brands", done => {
    chai
      .request(server)
      .get("/api/brands")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an("array");
        res.body[0].should.have.deep.keys("id", "name");
        res.body[4].should.have.deep.property("name", "Burberry");
        res.body.should.have.length(5);
        done();
      });
  });
});

describe("/GET /brands/{brandId}/products", () => {
  //GET all products of a specific brandId - successful - should return 200 Successful operation
  it("it should GET all brandId products", done => {
    chai
      .request(server)
      .get("/api/brands/1/products")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an("array");
        res.body[0].should.have.deep.keys(
          "id",
          "categoryId",
          "name",
          "description",
          "price",
          "imageUrls"
        );
        res.body[0].should.have.deep.property("name", "Superglasses");
        res.body[0].should.have.deep.property(
          "description",
          "The best glasses in the world"
        );
        done();
      });
  });
  //GET all products of a specific brandId - invalid input - should return 400 Invalid brandId supplied.
  it("it should return 400", done => {
    chai
      .request(server)
      .get("/api/brands/potato/products")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  //GET all products of a specific brandId - brandId does not exist - should return 404 brandId not found.
  it("it should return 404", done => {
    chai
      .request(server)
      .get("/api/brands/7/products")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe("/GET /products", () => {
  //GET all products - should return 200 - Successful operation.
  it("it should GET all products", done => {
    chai
      .request(server)
      .get("/api/products")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an("array");
        res.body[0].should.have.deep.keys(
          "id",
          "categoryId",
          "name",
          "description",
          "price",
          "imageUrls"
        );
        res.body[0].should.have.deep.property("name", "Superglasses");
        res.body[0].should.have.deep.property(
          "description",
          "The best glasses in the world"
        );
        done();
      });
  });
  //GET all products - optional query product results based off string query - should return 200 Successful operation.
  it("it should GET all products related to the query", done => {
    chai
      .request(server)
      .get("/api/products?query=dkny")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an("array");
        res.body[0].should.have.deep.keys(
          "id",
          "categoryId",
          "name",
          "description",
          "price",
          "imageUrls"
        );
        res.body[0].should.have.deep.property("name", "Coke cans");
        res.body[0].should.have.deep.property(
          "description",
          "The thickest glasses in the world"
        );
        done();
      });
  });
  //GET all products - optional query product results based off invalid string query - should return 400 Invalid search
  it("it should return 400", done => {
    chai
      .request(server)
      .get("/api/products?query=hellothereiamarealllllllllllllllllllllllylongstring")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  //GET all products - optional query product results based off valid but non-existent string query - should return 404 No results found.
  it("it should return 404", done => {
    chai
      .request(server)
      .get("/api/products?query=asdf")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

// describe("GET /me/cart", () => {
//   //GET contents of users cart while logged in - should return 200 Successful operation.
//   it("should get user cart contents", done => {
//     chai
//       .request(server)
//       .get("/api/me/cart")
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
//   //GET contents of users cart while not logged in - should return 403 Not authorized. User must login to view cart.
//   it("should return 403", done => {
//     chai
//       .request(server)
//       .get("/api/me/cart")
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//   });
// });

// describe("/POST /me/cart", () => {
//   //POST to cart to update an item quantity while logged in - should return 200 Update successful.
//   it("it should update the quantity of an existing cart item", done => {
//     chai
//       .request(server)
//       .post("/api/me/cart")
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
//   //POST to cart to update an item quantity while not logged in - should return 403 Not authorized. User must login to update cart.
//   it("should return 403", done => {
//     chai
//       .request(server)
//       .post("/api/me/cart")
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//   });
//   //POST to cart to update an item quantity while logged in, but invalid productId or quantity - should return 400 Invalid product id or quantity.
//   it("should return 400", done => {
//     chai
//       .request(server)
//       .post("/api/me/cart")
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
// });

// describe("/DELETE /me/cart/{productId}", () => {
//   //DELETE item from cart successfully - should return 200 Successful operation
//   it("it should delete the item from the user's cart", done => {
//     chai
//       .request(server)
//       .delete("/api/me/cart/{productId}")
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
//   //DELETE item from cart - user not logged in - should return 401 Not authorized. User must login to update cart.
//   it("should return 401", done => {
//     chai
//       .request(server)
//       .delete("/api/me/cart/{productId}")
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
//   //DELETE item from cart - invalid productId - should return 400 productId invalid or not found in cart.
//   it("should return 400", done => {
//     chai
//       .request(server)
//       .delete("/api/me/cart/{productId}")
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
// });

// describe("/POST /me/cart/{productId}", () => {
//   //POST item to cart by productId successfully - should return 200 Successful operation.
//   it("it should post an item to the users cart by productId", done => {
//     chai
//       .request(server)
//       .post("/api/me/cart/{productId}")
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
//   //POST item to cart by productId - user not logged in - should return 401 - Not authorized. User must login to update cart.
//   it("should return 401", done => {
//     chai
//       .request(server)
//       .post("/api/me/cart/{productId}")
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
//   //POST item to cart by productId - invalid productId or doesn't exist in db - should return 400 productId is invalid or doesn't exist.
//   it("should return 400", done => {
//     chai
//       .request(server)
//       .post("/api/me/cart/{productId}")
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
// });

// describe("/POST login", () => {
//   //POST user login with email/password - success - should return 200 Successful operation.
//   it("it should successfully log the user in", done => {
//     chai
//       .request(server)
//       .post("/api/login")
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
//   //POST user login with email/password - fail - should return 401 Invalid username or password.
//   it("should return 401", done => {
//     chai
//       .request(server)
//       .post("/api/login")
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
// });
