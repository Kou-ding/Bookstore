const test = require('ava');
const http = require("http");
const got = require("got");
const app = require("../index.js");

// Start the server before running tests
test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({
        prefixUrl: `http://localhost:${port}`
    });
});

// Close the server after all tests are done
test.after.always((t) => {
    t.context.server.close();
});

test("GET /authors", async (t) => {
    const response = await t.context.got.get('authors');
    t.is(response.statusCode, 200, "Status code is 200");
});

test("POST /authors", async (t) => {
    const response = await t.context.got.post('authors', {
        json: {
            name: "John Doe"
        }
    });
    t.is(response.statusCode, 200, "Status code is 200");
});

test("GET /books", async (t) => {
    const response = await t.context.got.get('books');
    t.is(response.statusCode, 200, "Status code is 200");
});

test("POST /books", async (t) => {
    const response = await t.context.got.post('books', {
        json: {
            title: "The Great Gatsby",
            authorId: 1
        }
    });
    t.is(response.statusCode, 200, "Status code is 200");
}); 

test("GET /books/{bookId}", async (t) => {
    const response = await t.context.got.get('books/1');
    t.is(response.statusCode, 200, "Status code is 200");
});

test("PUT /books/{bookId}", async (t) => {
    const response = await t.context.got.put('books/1', {
        json: {
            title: "The Great Gatsby",
            authorId: 1
        }
    });
    t.is(response.statusCode, 200, "Status code is 200");
});

test("DELETE /books/{bookId}", async (t) => {
    const response = await t.context.got.delete('books/1');
    t.is(response.statusCode, 200, "Status code is 200");
});

test("GET /authors/{authorId}", async (t) => {
    const response = await t.context.got.get('authors/1');
    t.is(response.statusCode, 200, "Status code is 200");
});