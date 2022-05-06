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
System.register("DropArea", [], function (exports_1, context_1) {
    "use strict";
    var DropArea;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DropArea = /** @class */ (function () {
                function DropArea(element, callback) {
                    this.element = null;
                    this.element = element;
                    this.setEventListener(callback);
                    this.setupInput(callback);
                }
                DropArea.prototype.setEventListener = function (callback) {
                    this.element.addEventListener('dragenter', DropArea.onDragEnter);
                    this.element.addEventListener('dragleave', DropArea.onDragLeave);
                    this.element.addEventListener('dragover', DropArea.onDragOver);
                    this.element.addEventListener('drop', function (e) { return DropArea.onDrop(e, callback); });
                    this.element.setAttribute('data-focus', 'false');
                };
                DropArea.prototype.setupInput = function (callback) {
                    var input = document.createElement('input');
                    input.type = 'file';
                    input.style.display = 'none';
                    this.element.append(input);
                    this.element.addEventListener('click', function () { return input.click(); });
                    input.addEventListener('change', function (ev) {
                        return callback(ev.target.files[0]);
                    });
                };
                DropArea.onDragEnter = function (e) {
                    e.target.setAttribute('data-focus', 'true');
                };
                DropArea.onDragLeave = function (e) {
                    e.target.setAttribute('data-focus', 'false');
                };
                DropArea.onDragOver = function (e) {
                    e.preventDefault();
                };
                DropArea.onDrop = function (e, callback) {
                    e.preventDefault();
                    e.target.setAttribute('data-focus', 'false');
                    var dt = e.dataTransfer;
                    var files = dt.files;
                    callback(files[0]);
                };
                return DropArea;
            }());
            exports_1("default", DropArea);
        }
    };
});
System.register("WebUSBController", [], function (exports_2, context_2) {
    "use strict";
    var RECEIVE_EVENT_KEY, CONNECT_EVENT_KEY, INSTANCES, WebUSBController;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            RECEIVE_EVENT_KEY = 'nm-webusbreceive-emitter';
            CONNECT_EVENT_KEY = 'nm-connect-emitter';
            INSTANCES = 0;
            WebUSBController = /** @class */ (function () {
                function WebUSBController() {
                    var _this = this;
                    this.interfaceNumber = 0;
                    this.endpointIn = 0;
                    this.endpointOut = 0;
                    this.receiveEventKey = null;
                    this.connectEventKey = null;
                    this.readLoop = function () {
                        _this.device.transferIn(_this.endpointIn, 64).then(function (result) {
                            document.dispatchEvent(new CustomEvent(_this.receiveEventKey, {
                                detail: result.data,
                            }));
                            _this.readLoop();
                        }, function (error) { return console.log('onReceiveError', error); });
                    };
                    INSTANCES++;
                    this.receiveEventKey = RECEIVE_EVENT_KEY + '-' + INSTANCES;
                    this.connectEventKey = CONNECT_EVENT_KEY + '-' + INSTANCES;
                    this.device = null;
                    navigator.usb.addEventListener('disconnect', function (ev) {
                        if (_this.device === ev.device) {
                            _this.device = null;
                            document.dispatchEvent(new CustomEvent(_this.connectEventKey, {
                                detail: null,
                            }));
                        }
                    });
                    navigator.usb.addEventListener('connect', function (ev) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.connectDevice(ev.device)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    navigator.usb
                        .getDevices()
                        .then(function (devices) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = devices.length;
                                if (!_a) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.connectDevice(devices[0])];
                            case 1:
                                _a = (_b.sent());
                                _b.label = 2;
                            case 2: return [2 /*return*/, _a];
                        }
                    }); }); });
                }
                WebUSBController.prototype.connectDevice = function (device) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, device.open()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, device.selectConfiguration(1)];
                                case 2:
                                    _a.sent();
                                    device.configuration.interfaces.map(function (element) {
                                        return element.alternates.map(function (elementalt) {
                                            if (elementalt.interfaceClass == 0xff) {
                                                _this.interfaceNumber = element.interfaceNumber;
                                                elementalt.endpoints.map(function (elementendpoint) {
                                                    if (elementendpoint.direction == 'out') {
                                                        _this.endpointOut = elementendpoint.endpointNumber;
                                                    }
                                                    if (elementendpoint.direction == 'in') {
                                                        _this.endpointIn = elementendpoint.endpointNumber;
                                                    }
                                                });
                                            }
                                        });
                                    });
                                    return [4 /*yield*/, device.claimInterface(this.interfaceNumber)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, device.selectAlternateInterface(this.interfaceNumber, 0)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, device.claimInterface(this.interfaceNumber)];
                                case 5:
                                    _a.sent();
                                    device
                                        .controlTransferOut({
                                        requestType: 'class',
                                        recipient: 'interface',
                                        request: 0x22,
                                        value: 0x01,
                                        index: this.interfaceNumber,
                                    })
                                        .then(function () {
                                        _this.readLoop();
                                    });
                                    document.dispatchEvent(new CustomEvent(this.connectEventKey, {
                                        detail: this.device,
                                    }));
                                    document.dispatchEvent(new CustomEvent(this.connectEventKey, {
                                        detail: device,
                                    }));
                                    this.device = device;
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                WebUSBController.prototype.connect = function (options) {
                    return __awaiter(this, void 0, void 0, function () {
                        var device;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, navigator.usb.requestDevice(options)];
                                case 1:
                                    device = _a.sent();
                                    return [4 /*yield*/, this.connectDevice(device)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, device];
                            }
                        });
                    });
                };
                WebUSBController.prototype.disconnect = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.device.close()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                };
                WebUSBController.prototype.send = function (data) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this.device) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.device.transferOut(this.endpointOut, data)];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    console.error('ERROR: device not connected');
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                };
                WebUSBController.prototype.onReceive = function (callback) {
                    document.addEventListener(this.receiveEventKey, function (_a) {
                        var detail = _a.detail;
                        callback(detail);
                    });
                };
                WebUSBController.prototype.onDeviceConnect = function (callback) {
                    document.addEventListener(this.connectEventKey, function (_a) {
                        var detail = _a.detail;
                        callback(detail);
                    });
                };
                return WebUSBController;
            }());
            exports_2("default", WebUSBController);
        }
    };
});
System.register("index", ["WebUSBController"], function (exports_3, context_3) {
    "use strict";
    var WebUSBController_1;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (WebUSBController_1_1) {
                WebUSBController_1 = WebUSBController_1_1;
            }
        ],
        execute: function () {
            (function () {
                var _this = this;
                document.addEventListener('DOMContentLoaded', function (event) {
                    var Controller = new WebUSBController_1.default();
                    var textDecoder = new TextDecoder('utf-8');
                    var $connectArea = document.querySelector('#connect-area');
                    var $connectButton = document.querySelector('#connect');
                    var $connectButtonSkip = document.querySelector('#connect-skip');
                    var $status = document.querySelector('#status');
                    /**
                     * Methods
                     */
                    /**
                     * Setup
                     */
                    $connectButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Controller.connect({ filters: [{ vendorId: 0x2e8a }] })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    $connectButtonSkip.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            $connectArea.style.display = 'none';
                            return [2 /*return*/];
                        });
                    }); });
                    Controller.onReceive(function (data) {
                        if (data.byteLength === 1 && data.getInt8(0) === 1) {
                            $status.innerText = 'PRESSED';
                        }
                        else if (data.byteLength === 1) {
                            $status.innerText = 'NOT PRESSED';
                        }
                        else {
                            console.log('received', { data: data, decoded: data.getInt8(0) });
                        }
                    });
                    Controller.onDeviceConnect(function (device) {
                        console.log({ device: device });
                        if (device) {
                            $connectArea.style.display = 'none';
                        }
                        else {
                            $connectArea.style.display = 'flex';
                        }
                    });
                });
            })();
        }
    };
});
