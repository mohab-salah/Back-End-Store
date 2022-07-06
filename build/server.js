"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var product_handler_spec_1 = __importDefault(require("./handler/product-handler-spec"));
var order_handler_spec_1 = __importDefault(require("./handler/order-handler-spec"));
var user_handler_spec_1 = __importDefault(require("./handler/user-handler-spec"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var address = "127.0.0.1:3000";
var corsoptions = { origin: "http://mohabdomin.com", successStatus: 200 };
app.use((0, cors_1.default)(corsoptions));
app.use(body_parser_1.default.json());
app.use("/", product_handler_spec_1.default);
app.use("/", user_handler_spec_1.default);
app.use("/", order_handler_spec_1.default);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
