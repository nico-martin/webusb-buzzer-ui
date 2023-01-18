System.register([], function (exports_1, context_1) {
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
