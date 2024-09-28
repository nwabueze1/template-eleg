var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useCreateCart } from "./useCreateCart";
import { createApolloClient, useRecordAddToCart } from "../helper";
import { CREATE_CART_ITEM } from "./dql";
import { useUpdateCartCount } from "./useUpdateCartCount";
import { notify } from "../helper/notify";
import block10 from "../mappings/block10";
var BLOCK_UUID = block10.uuid;
export var useAddToCart = function () {
    var _a = useSelector(function (store) { return store; }), restaurant = _a.restaurant, gatewayUrl = _a.gatewayUrl;
    var menu = restaurant === null || restaurant === void 0 ? void 0 : restaurant.menu;
    var cookies = new Cookies();
    var createCart = useCreateCart();
    var client = createApolloClient(gatewayUrl !== null && gatewayUrl !== void 0 ? gatewayUrl : "");
    var updateCartCount = useUpdateCartCount();
    var dispatch = useDispatch();
    var recordAddToCart = useRecordAddToCart();
    return function (variables) { return __awaiter(void 0, void 0, void 0, function () {
        var cartCookie, siteUuid, cartUuid, _a, data, errors, error, error_1;
        var _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    dispatch({ type: "SET_LOADING", payload: true });
                    cartCookie = cookies.get("cart");
                    siteUuid = (_g = (_f = (_e = (_d = (_c = (_b = menu === null || menu === void 0 ? void 0 : menu.menuItems) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.menu) === null || _d === void 0 ? void 0 : _d.restaurant) === null || _e === void 0 ? void 0 : _e.site) === null || _f === void 0 ? void 0 : _f.uuid) !== null && _g !== void 0 ? _g : "";
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 6, , 7]);
                    dispatch({ type: "SET_LOADING", payload: true });
                    if (!(!cartCookie || !cartCookie[siteUuid])) return [3 /*break*/, 3];
                    return [4 /*yield*/, createCart()];
                case 2:
                    cartUuid = _h.sent();
                    return [3 /*break*/, 4];
                case 3:
                    cartUuid = cartCookie[siteUuid];
                    _h.label = 4;
                case 4: return [4 /*yield*/, client.mutate({
                        mutation: CREATE_CART_ITEM,
                        variables: __assign(__assign({}, variables), { cart_uuid: cartUuid }),
                    })];
                case 5:
                    _a = _h.sent(), data = _a.data, errors = _a.errors;
                    if (!data || errors) {
                        error = new Error("We could not complete that operation");
                        throw error;
                    }
                    recordAddToCart(variables.menu_item_uuid, BLOCK_UUID);
                    dispatch({ type: "SET_LOADING", payload: false });
                    updateCartCount();
                    return [2 /*return*/, data];
                case 6:
                    error_1 = _h.sent();
                    //TODO: log this sentry
                    notify("error", "There was a problem adding to cart");
                    dispatch({ type: "SET_LOADING", payload: false });
                    return [2 /*return*/, undefined];
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
