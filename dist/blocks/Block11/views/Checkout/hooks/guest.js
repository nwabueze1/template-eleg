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
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_GUEST } from "../graphql";
import Cookies from "universal-cookie";
import { createApolloClient, notify } from "../../../../../helper";
export var useUpdateGuest = function () {
    var _a = useSelector(function (state) { return state; }), restaurant = _a.restaurant, gatewayUrl = _a.gatewayUrl;
    var dispatch = useDispatch();
    var client = createApolloClient(gatewayUrl !== null && gatewayUrl !== void 0 ? gatewayUrl : "");
    var cart = restaurant === null || restaurant === void 0 ? void 0 : restaurant.cart;
    var cookies = new Cookies();
    var cartCookie = cookies.get("cart");
    return function (variables, isPickup, onSuccess) { return __awaiter(void 0, void 0, void 0, function () {
        var siteUuid, cartUuid, _a, data, errors, guest, error_1;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    siteUuid = (_c = (_b = cart === null || cart === void 0 ? void 0 : cart.restaurant) === null || _b === void 0 ? void 0 : _b.site) === null || _c === void 0 ? void 0 : _c.uuid;
                    cartUuid = cartCookie[siteUuid];
                    dispatch({ type: "SET_LOADING", payload: true });
                    dispatch({
                        type: "SET_NETWORK_OPERATION",
                        payload: isPickup ? "set.delivery.pickup" : "set.delivery.dispatch",
                    });
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.mutate({
                            mutation: UPDATE_GUEST,
                            variables: __assign(__assign({}, variables), { cart_uuid: cartUuid }),
                        })];
                case 2:
                    _a = _d.sent(), data = _a.data, errors = _a.errors;
                    if (!data || errors) {
                        throw new Error("We could not complete that operation");
                    }
                    guest = data.updateGuest;
                    guest === null || guest === void 0 ? true : delete guest.address;
                    if (isPickup) {
                        dispatch({ type: "SET_LOADING", payload: false });
                        dispatch({
                            type: "SET_NETWORK_OPERATION",
                            payload: "",
                        });
                        dispatch({ type: "UPDATE_GUEST", payload: guest });
                        notify("success", "Delivery option set as pickup");
                        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                    }
                    return [2 /*return*/, guest];
                case 3:
                    error_1 = _d.sent();
                    dispatch({ type: "SET_LOADING", payload: false });
                    dispatch({
                        type: "SET_NETWORK_OPERATION",
                        payload: "",
                    });
                    notify("error", "We could not complete that operation");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
