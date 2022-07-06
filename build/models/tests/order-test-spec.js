"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_1 = require("../orders");
var user_1 = require("../user");
var product_1 = require("../product");
var database_1 = __importDefault(require("../../database"));
var orderStore = new orders_1.OrderStore();
var productStore = new product_1.ProdectStore();
var userStore = new user_1.UserStore();
describe("Orders Functions", function () {
    it("get order by userid", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(orderStore.index).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it("get order by id", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(orderStore.show).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it("create way", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(orderStore.create).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it(" addedprodect way", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(orderStore.addedprodect).toBeDefined();
            return [2 /*return*/];
        });
    }); });
});
//=============================================
describe("Test Create Order Function", function () {
    var order = {
        userid: "-1",
        status: "order test"
    };
    var user = {
        firstName: "mohab",
        lastName: "salah",
        password: "category1",
    };
    var product = {
        name: "product test",
        price: 111,
        category: "category1",
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUser, createProduct, createOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create(user)];
                case 1:
                    createUser = _a.sent();
                    user.id = createUser.id;
                    order.userid = createUser.id.toString();
                    return [4 /*yield*/, productStore.create(product)];
                case 2:
                    createProduct = _a.sent();
                    product.id = createProduct.id;
                    return [4 /*yield*/, orderStore.create(order)];
                case 3:
                    createOrder = _a.sent();
                    order.id = createOrder.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query('DELETE FROM order_products')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, conn.query('DELETE FROM orders')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, conn.query('DELETE FROM products')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, conn.query('DELETE FROM users')];
                case 5:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it(" should return all orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var ordersList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.index(user.id)];
                case 1:
                    ordersList = _a.sent();
                    expect(order.id).toBeGreaterThanOrEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it(" should create a new order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var testOrder, createOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testOrder = {
                        userid: user.id.toString(),
                        status: "active"
                    };
                    return [4 /*yield*/, orderStore.create(testOrder)];
                case 1:
                    createOrder = _a.sent();
                    expect(createOrder.id).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return a specific order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var testOrder, createOrder, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testOrder = {
                        userid: user.id.toString(),
                        status: "active"
                    };
                    return [4 /*yield*/, orderStore.create(testOrder)];
                case 1:
                    createOrder = _a.sent();
                    return [4 /*yield*/, orderStore.show(createOrder.id.toString())];
                case 2:
                    order = _a.sent();
                    expect(createOrder.id).toEqual(order.id);
                    return [2 /*return*/];
            }
        });
    }); });
});
