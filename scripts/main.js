"use strict";
function objectToPlainOldFormat(a) {
    var b = {};
    b.name = a.name;
    for (var c = 0; c < a.sources.length; c++)
        for (var d = 0; d < a.sources[c].metrics.length; d++) {
            var e = a.sources[c].metrics[d];
            b[e.name] = e.value;
        }
    return b;
}
function dataToPlainOldFormat(a) {
    for (var b = [], c = 0; c < a.length; c++) b[c] = objectToPlainOldFormat(a[c]);
    return b;
}
function recalculateScore(a, b) {
    for (var c = jQuery.extend(!0, [], a), d = dataToPlainOldFormat(a), e = _.pluck(d, "name"), f = [], g = 0; g < d.length; g++) f[g] = 0;
    var h = _.keys(d[0]),
        i = function (a) {
            var c = ["name", "rnd", "family", "subfamily", "sectors", "color", "colorover"].concat(b);
            return -1 == c.indexOf(a);
        };
    h = h.filter(i);
    for (var j = 0; j < h.length; j++) {
        d = _.sortBy(d, h[j]);
        var k = d[Math.round(d.length / 2)][h[j]];
        d = _.sortBy(d, function (a) {
            return h[j] in a ? a[h[j]] : k;
        });
        for (var g = 0; g < d.length; g++) f[g] += _.findIndex(d, { name: e[g] }) + 1;
    }
    for (var g = 0; g < a.length; g++) {
        if (h.length > 0)
            var l = (100 * f[g]) / (a.length * h.length),
                m = l.toFixed(1);
        else var m = 0;
        c[g].score = parseFloat(m);
    }
    return c;
}
angular.module("testProjectApp", ["ngCookies", "ngResource", "ngRoute", "ngSanitize", "ngTouch", "MassAutoComplete", "ngStorage", "ui.bootstrap", "ui-rangeSlider"]).config([
    "$routeProvider",
    function (a) {
        a.when("/", { templateUrl: "views/log-in.html", controller: "LogCtrl" }).when("/main", { templateUrl: "views/main.html", controller: "MainCtrl" }).otherwise({ redirectTo: "main" });
    },
]),
    (function () {
        function a(b, d) {
            function e(a, b) {
                return function () {
                    return a.apply(b, arguments);
                };
            }
            var f;
            if (
                ((d = d || {}),
                (this.trackingClick = !1),
                (this.trackingClickStart = 0),
                (this.targetElement = null),
                (this.touchStartX = 0),
                (this.touchStartY = 0),
                (this.lastTouchIdentifier = 0),
                (this.touchBoundary = d.touchBoundary || 10),
                (this.layer = b),
                (this.tapDelay = d.tapDelay || 200),
                (this.tapTimeout = d.tapTimeout || 700),
                !a.notNeeded(b))
            ) {
                for (var g = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], h = this, i = 0, j = g.length; j > i; i++) h[g[i]] = e(h[g[i]], h);
                c && (b.addEventListener("mouseover", this.onMouse, !0), b.addEventListener("mousedown", this.onMouse, !0), b.addEventListener("mouseup", this.onMouse, !0)),
                    b.addEventListener("click", this.onClick, !0),
                    b.addEventListener("touchstart", this.onTouchStart, !1),
                    b.addEventListener("touchmove", this.onTouchMove, !1),
                    b.addEventListener("touchend", this.onTouchEnd, !1),
                    b.addEventListener("touchcancel", this.onTouchCancel, !1),
                    Event.prototype.stopImmediatePropagation ||
                        ((b.removeEventListener = function (a, c, d) {
                            var e = Node.prototype.removeEventListener;
                            "click" === a ? e.call(b, a, c.hijacked || c, d) : e.call(b, a, c, d);
                        }),
                        (b.addEventListener = function (a, c, d) {
                            var e = Node.prototype.addEventListener;
                            "click" === a
                                ? e.call(
                                      b,
                                      a,
                                      c.hijacked ||
                                          (c.hijacked = function (a) {
                                              a.propagationStopped || c(a);
                                          }),
                                      d
                                  )
                                : e.call(b, a, c, d);
                        })),
                    "function" == typeof b.onclick &&
                        ((f = b.onclick),
                        b.addEventListener(
                            "click",
                            function (a) {
                                f(a);
                            },
                            !1
                        ),
                        (b.onclick = null));
            }
        }
        var b = navigator.userAgent.indexOf("Windows Phone") >= 0,
            c = navigator.userAgent.indexOf("Android") > 0 && !b,
            d = /iP(ad|hone|od)/.test(navigator.userAgent) && !b,
            e = d && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            f = d && /OS [6-7]_\d/.test(navigator.userAgent),
            g = navigator.userAgent.indexOf("BB10") > 0;
        (a.prototype.needsClick = function (a) {
            switch (a.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (a.disabled) return !0;
                    break;
                case "input":
                    if ((d && "file" === a.type) || a.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0;
            }
            return /\bneedsclick\b/.test(a.className);
        }),
            (a.prototype.needsFocus = function (a) {
                switch (a.nodeName.toLowerCase()) {
                    case "textarea":
                        return !0;
                    case "select":
                        return !c;
                    case "input":
                        switch (a.type) {
                            case "button":
                            case "checkbox":
                            case "file":
                            case "image":
                            case "radio":
                            case "submit":
                                return !1;
                        }
                        return !a.disabled && !a.readOnly;
                    default:
                        return /\bneedsfocus\b/.test(a.className);
                }
            }),
            (a.prototype.sendClick = function (a, b) {
                var c, d;
                document.activeElement && document.activeElement !== a && document.activeElement.blur(),
                    (d = b.changedTouches[0]),
                    (c = document.createEvent("MouseEvents")),
                    c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null),
                    (c.forwardedTouchEvent = !0),
                    a.dispatchEvent(c);
            }),
            (a.prototype.determineEventType = function (a) {
                return c && "select" === a.tagName.toLowerCase() ? "mousedown" : "click";
            }),
            (a.prototype.focus = function (a) {
                var b;
                d && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type && "month" !== a.type ? ((b = a.value.length), a.setSelectionRange(b, b)) : a.focus();
            }),
            (a.prototype.updateScrollParent = function (a) {
                var b, c;
                if (((b = a.fastClickScrollParent), !b || !b.contains(a))) {
                    c = a;
                    do {
                        if (c.scrollHeight > c.offsetHeight) {
                            (b = c), (a.fastClickScrollParent = c);
                            break;
                        }
                        c = c.parentElement;
                    } while (c);
                }
                b && (b.fastClickLastScrollTop = b.scrollTop);
            }),
            (a.prototype.getTargetElementFromEventTarget = function (a) {
                return a.nodeType === Node.TEXT_NODE ? a.parentNode : a;
            }),
            (a.prototype.onTouchStart = function (a) {
                var b, c, f;
                if (a.targetTouches.length > 1) return !0;
                if (((b = this.getTargetElementFromEventTarget(a.target)), (c = a.targetTouches[0]), d)) {
                    if (((f = window.getSelection()), f.rangeCount && !f.isCollapsed)) return !0;
                    if (!e) {
                        if (c.identifier && c.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1;
                        (this.lastTouchIdentifier = c.identifier), this.updateScrollParent(b);
                    }
                }
                return (
                    (this.trackingClick = !0),
                    (this.trackingClickStart = a.timeStamp),
                    (this.targetElement = b),
                    (this.touchStartX = c.pageX),
                    (this.touchStartY = c.pageY),
                    a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault(),
                    !0
                );
            }),
            (a.prototype.touchHasMoved = function (a) {
                var b = a.changedTouches[0],
                    c = this.touchBoundary;
                return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1;
            }),
            (a.prototype.onTouchMove = function (a) {
                return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && ((this.trackingClick = !1), (this.targetElement = null)), !0) : !0;
            }),
            (a.prototype.findControl = function (a) {
                return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
            }),
            (a.prototype.onTouchEnd = function (a) {
                var b,
                    g,
                    h,
                    i,
                    j,
                    k = this.targetElement;
                if (!this.trackingClick) return !0;
                if (a.timeStamp - this.lastClickTime < this.tapDelay) return (this.cancelNextClick = !0), !0;
                if (a.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
                if (
                    ((this.cancelNextClick = !1),
                    (this.lastClickTime = a.timeStamp),
                    (g = this.trackingClickStart),
                    (this.trackingClick = !1),
                    (this.trackingClickStart = 0),
                    f && ((j = a.changedTouches[0]), (k = document.elementFromPoint(j.pageX - window.pageXOffset, j.pageY - window.pageYOffset) || k), (k.fastClickScrollParent = this.targetElement.fastClickScrollParent)),
                    (h = k.tagName.toLowerCase()),
                    "label" === h)
                ) {
                    if ((b = this.findControl(k))) {
                        if ((this.focus(k), c)) return !1;
                        k = b;
                    }
                } else if (this.needsFocus(k))
                    return a.timeStamp - g > 100 || (d && window.top !== window && "input" === h)
                        ? ((this.targetElement = null), !1)
                        : (this.focus(k), this.sendClick(k, a), (d && "select" === h) || ((this.targetElement = null), a.preventDefault()), !1);
                return d && !e && ((i = k.fastClickScrollParent), i && i.fastClickLastScrollTop !== i.scrollTop) ? !0 : (this.needsClick(k) || (a.preventDefault(), this.sendClick(k, a)), !1);
            }),
            (a.prototype.onTouchCancel = function () {
                (this.trackingClick = !1), (this.targetElement = null);
            }),
            (a.prototype.onMouse = function (a) {
                return this.targetElement
                    ? a.forwardedTouchEvent
                        ? !0
                        : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick)
                        ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : (a.propagationStopped = !0), a.stopPropagation(), a.preventDefault(), !1)
                        : !0
                    : !0;
            }),
            (a.prototype.onClick = function (a) {
                var b;
                return this.trackingClick ? ((this.targetElement = null), (this.trackingClick = !1), !0) : "submit" === a.target.type && 0 === a.detail ? !0 : ((b = this.onMouse(a)), b || (this.targetElement = null), b);
            }),
            (a.prototype.destroy = function () {
                var a = this.layer;
                c && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)),
                    a.removeEventListener("click", this.onClick, !0),
                    a.removeEventListener("touchstart", this.onTouchStart, !1),
                    a.removeEventListener("touchmove", this.onTouchMove, !1),
                    a.removeEventListener("touchend", this.onTouchEnd, !1),
                    a.removeEventListener("touchcancel", this.onTouchCancel, !1);
            }),
            (a.notNeeded = function (a) {
                var b, d, e, f;
                if ("undefined" == typeof window.ontouchstart) return !0;
                if ((d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1])) {
                    if (!c) return !0;
                    if ((b = document.querySelector("meta[name=viewport]"))) {
                        if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
                        if (d > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0;
                    }
                }
                if (g && ((e = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/)), e[1] >= 10 && e[2] >= 3 && (b = document.querySelector("meta[name=viewport]")))) {
                    if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
                    if (document.documentElement.scrollWidth <= window.outerWidth) return !0;
                }
                return "none" === a.style.msTouchAction || "manipulation" === a.style.touchAction
                    ? !0
                    : ((f = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]),
                      f >= 27 && ((b = document.querySelector("meta[name=viewport]")), b && (-1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth))
                          ? !0
                          : "none" === a.style.touchAction || "manipulation" === a.style.touchAction
                          ? !0
                          : !1);
            }),
            (a.attach = function (b, c) {
                return new a(b, c);
            }),
            "function" == typeof define && "object" == typeof define.amd && define.amd
                ? define(function () {
                      return a;
                  })
                : "undefined" != typeof module && module.exports
                ? ((module.exports = a.attach), (module.exports.FastClick = a))
                : (window.FastClick = a);
    })(),
    angular
        .module("testProjectApp")
        .directive("radarInteractive", [
            "dataFactory",
            "$localStorage",
            "CalculatorService",
            function (a, b, c) {
                return {
                    restrict: "EA",
                    scope: !1,
                    link: function (a) {
                        function d(c, d) {
                            if (A) var g = 5;
                            else var g = 8;
                            for (var h = c.rnd, i = d.length, j = 0; i > j; j++) {
                                if ("tech" == b.typeOfClasification && c.family == d[j]) var k = j;
                                if ("lic" == b.typeOfClasification && c.license.name == d[j]) var k = j;
                            }
                            var l = ((2 * Math.PI) / i) * k,
                                m = Math.cos(l + h),
                                n = Math.sin(l + h),
                                q = { x: Math.abs(u - w * c.score) * m, y: Math.abs(u - w * c.score) * n };
                            B.append("svg:circle")
                                .attr("class", "draggableCircle")
                                .attr("cx", q.x)
                                .attr("cy", q.y)
                                .attr("r", g)
                                .attr("nombre", c.name)
                                .attr("angle", h)
                                .attr("family", c.family)
                                .attr("family", c.family)
                                .attr("color", c.colorsubfamily)
                                .attr("colorover", c.colorsubfamily)
                                .attr("originalcx", q.x)
                                .attr("originalcy", q.y)
                                .attr("id", c.name)
                                .text(c.name)
                                .style("fill", c.colorsubfamily)
                                .style("fill-opacity", function () {
                                    return c.trend < 0 ? 0.1 : c.trend > 0 ? 1 : 0.5;
                                })
                                .style("stroke", c.colorsubfamily)
                                .style("stroke-opacity", 1)
                                .on("mouseover", function () {
                                    s && d3.select(this).transition().style("fill", $(this).attr("colorover")).style("stroke", $(this).attr("colorover")).attr("r", 8),
                                        $("#" + $(this).attr("id"))
                                            .removeClass("nodeElement")
                                            .addClass("nodeElementOver"),
                                        (o.nodeActive = !1),
                                        p
                                            .attr("x", parseInt($(this).attr("cx")) + 15)
                                            .attr("y", $(this).attr("cy"))
                                            .attr("font-weight", "bold")
                                            .attr("fill", "white")
                                            .text($(this).attr("nombre"))
                                            .transition(200)
                                            .style("opacity", 1);
                                })
                                .on("mouseout", function () {
                                    -1 == $.inArray($(this).attr("id"), o.nodesActives) &&
                                        $("#" + $(this).attr("id"))
                                            .removeClass("nodeElementOver")
                                            .addClass("nodeElement"),
                                        o.nodeActive || (s && d3.select(this).transition().style("fill", $(this).attr("color")).style("stroke", $(this).attr("color")).attr("r", 9));
                                })
                                .on("click", function () {
                                    console.log("view ;", "detail ;", $(this).attr("id")), ga("send", "event", "view", "detail", $(this).attr("id"));
                                    var c = $(this).attr("id");
                                    a.$apply(function () {
                                        (b.nodeDatasBubbles = c), (b.activeDetails = !0);
                                    }),
                                        null == d3.select("#" + $(this).attr("id") + "comparativeTech")[0][0] && e($(this).attr("id"), a.clasificacion, !0),
                                        p
                                            .attr("x", parseInt($(this).attr("cx")) + 15)
                                            .attr("y", $(this).attr("cy"))
                                            .attr("font-weight", "bold")
                                            .attr("fill", "white")
                                            .text($(this).attr("nombre"))
                                            .transition(200)
                                            .style("opacity", 1);
                                })
                                .on("dblclick", function () {
                                    console.log("view ;", "detail ;", $(this).attr("id")),
                                        ga("send", "event", "view", "detail", $(this).attr("id")),
                                        f($(this).attr("id")),
                                        e($(this).attr("id"), a.clasificacion, !1),
                                        p
                                            .attr("x", parseInt($(this).attr("cx")) + 15)
                                            .attr("y", $(this).attr("cy"))
                                            .attr("font-weight", "bold")
                                            .attr("fill", "white")
                                            .text($(this).attr("nombre"))
                                            .transition(200)
                                            .style("opacity", 1);
                                });
                        }
                        function e(d, e, f) {
                            var g, h, i, j;
                            if (f) {
                                for (
                                    var k = angular.copy(a.radardata),
                                        l = _.where(a.radardata, { name: d })[0],
                                        m = c.calculateNewScore(k, ["mentions", "conferences", "presentations", "funds/year(*)"]),
                                        n = _.where(m, { name: d })[0],
                                        o = c.calculateNewScore(k, ["committers", "stars", "stacks", "posts", "followers"]),
                                        p = _.where(o, { name: d })[0],
                                        s = e.length,
                                        t = l.rnd * (6 / e.length),
                                        v = 0;
                                    s > v;
                                    v++
                                ) {
                                    if ("tech" == b.typeOfClasification && l.family == e[v]) var x = v;
                                    if ("lic" == b.typeOfClasification && l.license.name == e[v]) var x = v;
                                    if ("sub" == b.typeOfClasification && l.subfamily == e[v]) var x = v;
                                }
                                var y = ((2 * Math.PI) / s) * x,
                                    z = Math.cos(y + t),
                                    A = Math.sin(y + t),
                                    C = { x: Math.abs(u - w * l.score) * z, y: Math.abs(u - w * l.score) * A },
                                    D = { x: Math.abs(u - w * parseFloat(n.score)) * z, y: Math.abs(u - w * parseFloat(n.score)) * A },
                                    E = { x: Math.abs(u - w * parseFloat(p.score)) * z, y: Math.abs(u - w * parseFloat(p.score)) * A };
                                B.insert("svg:circle", ":first-child")
                                    .attr("class", "comparativeCirclesTech")
                                    .attr("id", n.name + "comparativeTech")
                                    .attr("cx", C.x)
                                    .attr("cy", C.y)
                                    .attr("r", 9)
                                    .attr("nombre", n.name)
                                    .attr("angle", t)
                                    .attr("xmax", D.x)
                                    .attr("ymax", D.y)
                                    .style("fill", n.colorsubfamily)
                                    .style("fill-opacity", function () {
                                        return D.trend < 0 ? 0.1 : D.trend > 0 ? 1 : 0 == D.trend ? 0.5 : void 0;
                                    })
                                    .style("stroke", n.color)
                                    .style("stroke-opacity", 1),
                                    B.insert("svg:circle", ":first-child")
                                        .attr("class", "comparativeCirclesBuss")
                                        .attr("id", p.name + "comparativeBus")
                                        .attr("cx", C.x)
                                        .attr("cy", C.y)
                                        .attr("r", 9)
                                        .attr("nombre", p.name)
                                        .attr("angle", t)
                                        .attr("xmax", E.x)
                                        .attr("ymax", E.y)
                                        .style("fill", p.colorsubfamily)
                                        .style("fill-opacity", function () {
                                            return p.trend < 0 ? 0.1 : p.trend > 0 ? 1 : 0 == p.trend ? 0.5 : void 0;
                                        })
                                        .style("stroke", p.color)
                                        .style("stroke-opacity", 0.1),
                                    B.insert("line", ":first-child")
                                        .attr("class", "comparativeLines")
                                        .attr("id", l.name + "line")
                                        .attr("x1", C.x)
                                        .attr("y1", C.y)
                                        .attr("x2", C.x)
                                        .attr("y2", C.y)
                                        .attr("x1max", D.x)
                                        .attr("y1max", D.y)
                                        .attr("x2max", E.x)
                                        .attr("y2max", E.y)
                                        .attr("stroke-width", 2)
                                        .attr("stroke", l.colorsubfamily)
                                        .attr("stroke-opacity", 0.2);
                            }
                            d3
                                .select("#" + d + "comparativeTech")
                                .transition()
                                .attr("cx", function () {
                                    return (g = parseFloat($(this).attr("xmax")));
                                })
                                .attr("cy", function () {
                                    return (h = parseFloat($(this).attr("ymax")));
                                }),
                                q
                                    .attr("x", g + 5)
                                    .attr("y", h)
                                    .text("T")
                                    .transition(200)
                                    .style("opacity", 1),
                                d3
                                    .select("#" + d + "comparativeBus")
                                    .transition()
                                    .attr("cx", function () {
                                        return (i = parseFloat($(this).attr("xmax")));
                                    })
                                    .attr("cy", function () {
                                        return (j = parseFloat($(this).attr("ymax")));
                                    }),
                                r
                                    .attr("x", i + 5)
                                    .attr("y", j)
                                    .text("B")
                                    .transition(200)
                                    .style("opacity", 1),
                                d3
                                    .select("#" + d + "line")
                                    .transition()
                                    .attr("x1", function () {
                                        return parseFloat($(this).attr("x1max"));
                                    })
                                    .attr("y1", function () {
                                        return parseFloat($(this).attr("y1max"));
                                    })
                                    .attr("x2", function () {
                                        return parseFloat($(this).attr("x2max"));
                                    })
                                    .attr("y2", function () {
                                        return parseFloat($(this).attr("y2max"));
                                    });
                        }
                        function f(a) {
                            void 0 != p && (p.transition(200).style("opacity", 0), q.transition(200).style("opacity", 0)), void 0 != r && r.transition(200).style("opacity", 0);
                            var b = B.selectAll(".comparativeCirclesTech")[0];
                            _.each(b, function (b) {
                                $(b).attr("id") != a + "comparativeTech" && b.remove();
                            });
                            var c = B.selectAll(".comparativeCirclesBuss")[0];
                            _.each(c, function (b) {
                                $(b).attr("id") != a + "comparativeBus" && b.remove();
                            });
                            var d = B.selectAll(".comparativeLines")[0];
                            _.each(d, function (b) {
                                $(b).attr("id") != a + "line" && b.remove();
                            });
                        }
                        function g(a, c) {
                            f("none");
                            var d = B.selectAll(".draggableCircle")[0];
                            _.each(d, function (d, e) {
                                var f = parseFloat($(d).attr("angle")) * (6 / a.length),
                                    g = a.length;
                                if (void 0 != c[e]) {
                                    if ("tech" == b.typeOfClasification) {
                                        for (var h = 0; g > h; h++) if (c[e].family == a[h]) var i = h;
                                    } else if ("lic" == b.typeOfClasification) {
                                        for (var h = 0; g > h; h++) if (c[e].license.name == a[h]) var i = h;
                                    } else if ("sub" == b.typeOfClasification) for (var h = 0; g > h; h++) if (c[e].subfamily == a[h]) var i = h;
                                    if (void 0 != i)
                                        var j = ((2 * Math.PI) / g) * i,
                                            k = Math.cos(j + f),
                                            l = Math.sin(j + f),
                                            m = { x: Math.abs(u - w * c[e].score) * k, y: Math.abs(u - w * c[e].score) * l };
                                    else var m = { x: 0, y: 0 };
                                    d3.select(d)
                                        .transition()
                                        .duration(2e3)
                                        .attr("cx", m.x)
                                        .attr("cy", m.y)
                                        .style("fill-opacity", function () {
                                            return c[e].noFilter && void 0 != i ? (0 == c[e].trend ? 0.5 : c[e].trend < 0 ? 0.1 : c[e].trend > 0 ? 1 : void 0) : 0;
                                        })
                                        .style("stroke-opacity", function () {
                                            return c[e].noFilter && void 0 != i ? 1 : 0;
                                        });
                                } else d3.select(d).transition().duration(2e3).style("fill-opacity", 0).style("stroke-opacity", 0);
                            });
                        }
                        function h(a) {
                            var b = a,
                                c = B.selectAll(".sectorsLines")[0];
                            _.each(c, function (a, c) {
                                var d = ((2 * Math.PI) / b) * c,
                                    e = Math.cos(d),
                                    f = Math.sin(d),
                                    g = { x: u * e, y: u * f };
                                d3.select(a)
                                    .transition()
                                    .duration(500)
                                    .attr("x2", g.x + 0)
                                    .attr("y2", g.y + 0);
                            });
                        }
                        function i(a, b, c) {
                            B.append("svg:circle").attr({ cx: 0, cy: 0, r: (u / c) * b, class: "serctorCircles", fill: "transparent", stroke: d3.rgb(90, 90, 90) }),
                                B.append("svg:circle").attr("class", "circleCenterFixed").attr("cx", 0).attr("cy", 0).attr("r", 7).style("cursor", "pointer").style("fill", d3.rgb(90, 90, 90));
                            for (var d = 0; 10 > d; d++) {
                                var e = 0,
                                    f = Math.cos(e),
                                    g = Math.sin(e),
                                    h = { x: u * f, y: u * g };
                                B.append("line")
                                    .attr("class", "sectorsLines")
                                    .attr("x1", 0)
                                    .attr("y1", 0)
                                    .attr("x2", h.x + 0)
                                    .attr("y2", h.y + 0)
                                    .attr("stroke-width", 2)
                                    .attr("stroke", d3.rgb(90, 90, 90));
                            }
                        }
                        function j(c, d) {
                            function e() {
                                d3.selectAll(".arc2").remove(), d3.selectAll(".arctext2").remove();
                                var c = d3.svg
                                        .arc()
                                        .innerRadius(u + p)
                                        .outerRadius(u + p + j),
                                    d = d3.selectAll(".arcpath1")[0];
                                _.each(d, function (a) {
                                    $(a).attr("id") !== b.idForClasif.replace(/\s+/g, "") + "sub"
                                        ? d3.select(a).transition().duration(500).attr("d", c).style("opacity", 0.1)
                                        : d3.select(a).transition().duration(500).attr("d", c).style("opacity", 1);
                                }),
                                    d3
                                        .select("#boxGroup")
                                        .transition()
                                        .attr("transform", "translate(" + (u + 40) + "," + (u + 40) + ") scale(" + z / 1.2 + "," + z / 1.2 + ")"),
                                    a.$apply(function () {
                                        b.changeRadarLevels = !1;
                                    });
                            }
                            function f() {
                                d3.selectAll(".arc2").remove(), d3.selectAll(".arctext2").remove();
                                var a = d3.svg
                                    .arc()
                                    .innerRadius(u)
                                    .outerRadius(u + j);
                                d3.selectAll(".arcpath1").transition().attr("d", a).style("opacity", 1),
                                    d3
                                        .select("#boxGroup")
                                        .transition()
                                        .attr("transform", "translate(" + (u + 40) + "," + (u + 40) + ") scale(" + z + "," + z + ")");
                            }
                            function g() {
                                d3.selectAll(".arc2").transition().duration(200).style("opacity", 0).remove(),
                                    d3.selectAll(".arctext2").transition().duration(200).style("opacity", 0).remove(),
                                    d3.selectAll(".arc1").transition().duration(200).style("opacity", 0).remove(),
                                    d3.selectAll(".arctext1").transition().duration(200).style("opacity", 0).remove();
                            }
                            function i() {
                                if (("between" == b.changeRadarLevels && e(), "return" == b.changeRadarLevels && f(), "tech" == b.typeOfClasification || void 0 == b.typeOfClasification)) {
                                    var d = _.uniq(_.pluck(a.bubblesConfig, "family")),
                                        g = _.uniq(_.pluck(a.bubblesConfig, "colorfamily"));
                                    (m = 1), (l = []);
                                } else if ("lic" == b.typeOfClasification || void 0 == b.typeOfClasification) {
                                    var h = _.uniq(_.pluck(a.bubblesConfig, "license")),
                                        d = _.uniq(_.pluck(h, "name")),
                                        g = ["#00BC96", "#33B59B", "#5FAE9E", "#73AB9F", "#80ADA0", "#D7BC96", "#E7BC86"];
                                    l = [];
                                } else if ("sub" == b.typeOfClasification) {
                                    var d = b.clasificationForGraphs,
                                        i = _.where(a.radardata, { family: b.idForClasif }),
                                        g = _.uniq(_.pluck(i, "colorsubfamily"));
                                    (m = 2), (l = []);
                                }
                                for (var k = 0; c > k; k++) l.push(100 / c);
                                var p = d3.svg
                                        .arc()
                                        .innerRadius(u)
                                        .outerRadius(u + j),
                                    q = d3.layout.pie().value(function (a) {
                                        return a;
                                    });
                                B.selectAll(".arc" + m)
                                    .data(q(l))
                                    .enter()
                                    .insert("g", ":first-child")
                                    .attr("id", function (a, b) {
                                        return d[b].replace(/\s+/g, "");
                                    })
                                    .attr("class", "arc" + m)
                                    .attr("transform", "rotate(90)")
                                    .append("svg:path")
                                    .style("cursor", "pointer")
                                    .attr("class", "arcpath" + m)
                                    .attr("id", function (a, b) {
                                        return d[b].replace(/\s+/g, "") + "sub";
                                    })
                                    .attr("d", p)
                                    .attr("fill", function (a, b) {
                                        return g[b];
                                    })
                                    .attr("original", function (a, b) {
                                        return g[b];
                                    })
                                    .attr("idforclasif", function (a, b) {
                                        return d[b];
                                    })
                                    .on("click", function () {
                                        if (b.idForClasif == $(this).attr("idforclasif") && "arcpath1" == $(this).attr("class") && "lic" != b.typeOfClasification)
                                            console.log("view", "select group ;", "all"),
                                                ga("send", "event", "view", "select group", "all"),
                                                a.$apply(function () {
                                                    (b.typeOfClasification = "tech"), (b.clasificationForGraphs = _.uniq(_.pluck(a.bubblesConfig, "family"))), (b.idForClasif = "none"), f();
                                                });
                                        else if ("arcpath1" == $(this).attr("class") && "lic" != b.typeOfClasification) {
                                            console.log("view", "select group ;", $(this).attr("idforclasif")), ga("send", "event", "view", "select group", $(this).attr("idforclasif"));
                                            var c = [];
                                            (n = $(this).attr("idforclasif")),
                                                (b.idForClasif = n),
                                                _.find(a.bubblesConfig, function (a) {
                                                    a.family == n && c.push(a.subfamily);
                                                }),
                                                (c = _.uniq(c)),
                                                e(),
                                                a.$apply(function () {
                                                    (b.typeOfClasification = "sub"), (b.clasificationForGraphs = c);
                                                });
                                        }
                                    }),
                                    B.selectAll(".arctext" + m)
                                        .data(q(l))
                                        .enter()
                                        .insert("text", ".serctorCircles")
                                        .style("cursor", "pointer")
                                        .style("font-size", 12)
                                        .style("fill", "#333")
                                        .attr("transform", "rotate(90)")
                                        .attr("class", "arctext" + m)
                                        .attr("dy", o)
                                        .append("textPath")
                                        .style("text-anchor", "middle")
                                        .attr("xlink:href", function (a, b) {
                                            return "#" + d[b].replace(/\s+/g, "") + "sub";
                                        })
                                        .attr("startOffset", "25%")
                                        .attr("class", "arctextInside" + m)
                                        .attr("id", function (a, b) {
                                            return d[b].replace(/\s+/g, "");
                                        })
                                        .attr("idforclasif", function (a, b) {
                                            return d[b];
                                        })
                                        .text(function (a, b) {
                                            return d[b];
                                        })
                                        .on("click", function () {
                                            if (b.idForClasif == $(this).attr("idforclasif") && "arctextInside1" == $(this).attr("class") && "lic" != b.typeOfClasification)
                                                console.log("view ;", "select group ;", "all"),
                                                    ga("send", "event", "view", "select group", "all"),
                                                    a.$apply(function () {
                                                        (b.typeOfClasification = "tech"), (b.clasificationForGraphs = _.uniq(_.pluck(a.bubblesConfig, "family"))), (b.idForClasif = "none"), f();
                                                    });
                                            else if ("arctextInside1" == $(this).attr("class") && "lic" != b.typeOfClasification) {
                                                console.log("view ;", "select group ;", $(this).attr("idforclasif")), ga("send", "event", "view", "select group", $(this).attr("idforclasif"));
                                                var c = [];
                                                (n = $(this).attr("idforclasif")),
                                                    (b.idForClasif = n),
                                                    _.find(a.bubblesConfig, function (a) {
                                                        a.family == n && c.push(a.subfamily);
                                                    }),
                                                    (c = _.uniq(c)),
                                                    e(),
                                                    a.$apply(function () {
                                                        (b.typeOfClasification = "sub"), (b.clasificationForGraphs = c);
                                                    });
                                            }
                                        });
                            }
                            if (A)
                                var j = 16,
                                    o = 14,
                                    p = 25;
                            else
                                var j = 25,
                                    o = 19,
                                    p = 30;
                            k && B.append("svg:circle").attr("cx", 0).attr("cy", 0).attr("r", u).style("fill", "transparent"), "lic" == b.changeRadarLevels && g(), h(c), setTimeout(i, 400);
                        }
                        var k = !0,
                            l = [],
                            m = 1,
                            n = "sub";
                        void 0 == a.width && (a.width = window.innerWidth), void 0 == a.height && (a.height = window.innerHeight), void 0 == a.levels && (a.levels = ["Hold", "Assess", "Trial", "Adopt"]);
                        var o = { boxWidth: a.width / 1.6, boxHeight: a.height / 1.6, tooltip: "", nodeActive: !1, radar_arcs: a.levels, new_positions: [], nodesActives: [] };
                        a.clasificacion = [];
                        var p,
                            q,
                            r,
                            s = !0,
                            t = o.boxHeight,
                            u = t / 1.7,
                            v = o.radar_arcs.length,
                            w = u / 100,
                            x = !1,
                            y = {},
                            z = window.innerHeight / a.height,
                            A = !1;
                        (document.getElementById("chart").style.height = window.innerHeight + "px"),
                            (document.getElementById("chart").style.width = window.innerWidth + "px"),
                            $(document).on("keyup keydown", function (a) {
                                x = a.ctrlKey;
                            }),
                            window.DeviceOrientationEvent && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (A = !0);
                        var B = d3
                            .select("#chart")
                            .append("svg")
                            .attr("class", "box")
                            .attr("width", t + 80)
                            .attr("height", t + 80)
                            .attr("transform", "scale(" + z + "," + z + ")")
                            .append("g")
                            .attr("id", "boxGroup")
                            .attr("transform", "translate(" + (u + 40) + "," + (u + 40) + ") scale(" + z + "," + z + ")");
                        a.$watch("radardata", function (c, e) {
                            (a.bubblesConfig = c),
                                (a.clasificacion = b.clasificationForGraphs),
                                c.length > 0 &&
                                    e.length > 0 &&
                                    c != e &&
                                    k &&
                                    (j(a.clasificacion.length, !0),
                                    _.each(a.bubblesConfig, function (b) {
                                        (y[b.name] = b),
                                            d(b, a.clasificacion),
                                            (p = B.append("text").style("opacity", 1).style("font-family", "sans-serif").style("font-size", "13px").style("cursor", "default")),
                                            (q = B.append("text").style("opacity", 1).style("font-family", "sans-serif").style("font-size", "15").attr("font-weight", "bold").attr("fill", "grey").style("cursor", "default")),
                                            (r = B.append("text").style("opacity", 1).style("font-family", "sans-serif").style("font-size", "15px").attr("font-weight", "bold").attr("fill", "grey").style("cursor", "default"));
                                    }),
                                    (k = !1)),
                                k || g(a.clasificacion, a.bubblesConfig),
                                B.append("svg:circle").attr("class", "circleCenterFixed2").attr("cx", 0).attr("cy", 0).attr("r", 10).style("fill", d3.rgb(90, 90, 90)).style("opacity", 0);
                        }),
                            _.each(o.radar_arcs, function (a, b) {
                                i(a, b, v);
                            }),
                            $(window).resize(function () {
                                a.$apply(function () {
                                    (z = window.innerHeight / a.height),
                                        (document.getElementById("chart").style.height = window.innerHeight + "px"),
                                        (document.getElementById("chart").style.width = window.innerWidth + "px"),
                                        d3
                                            .select("#boxGroup")
                                            .transition()
                                            .attr("transform", "translate(" + (u + 40) + "," + (u + 40) + ") scale(" + z + "," + z + ")");
                                });
                            }),
                            a.$watch(
                                function () {
                                    return b.clasificationForGraphs;
                                },
                                function (c, d) {
                                    (a.clasificacion = b.clasificationForGraphs), c != d && void 0 != c && (g(a.clasificacion, a.bubblesConfig), h(a.clasificacion), j(a.clasificacion.length, !1));
                                },
                                !0
                            );
                    },
                };
            },
        ])
        .directive("backImg", function () {
            return function (a, b, c) {
                var d = c.backImg,
                    e = window.innerHeight,
                    f = window.innerWidth;
                b.css({ "background-image": "url(images/" + d + ")", "background-size": "cover", width: f, height: e });
            };
        })
        .directive("divideChart", [
            "dataFactory",
            "$localStorage",
            function (a, b) {
                return {
                    restrict: "EA",
                    scope: !1,
                    link: function (a) {
                        function c() {
                            function c(a) {
                                return function (b) {
                                    (b.y += (b.cy - b.y) * a), (b.x += (b.cx - b.x) * a);
                                };
                            }
                            function d(a) {
                                y.each(c(0.08 * a.alpha))
                                    .each(n(0.6))
                                    .attr("cx", function (a) {
                                        return a.x;
                                    })
                                    .attr("cy", function (a) {
                                        return a.y;
                                    });
                            }
                            function e(c) {
                                h.selectAll(".label").remove(),
                                    h
                                        .selectAll(".label")
                                        .data(_.toArray(c))
                                        .enter()
                                        .append("text")
                                        .attr("id", function (a) {
                                            return a.nombre;
                                        })
                                        .attr("class", "label")
                                        .attr("style", "cursor:default")
                                        .attr("style", "font-weight: normal")
                                        .style("font-size", function (a) {
                                            return k / 40;
                                        })
                                        .style("cursor", "pointer")
                                        .attr("fill", "white")
                                        .text(function (a) {
                                            return a.nombre;
                                        })
                                        .attr("transform", function (a) {
                                            return "translate(" + (a.px - 3 * a.nombre.length) + "," + a.py + ")";
                                        })
                                        .on("click", function (c) {
                                            if ("tech" == b.typeOfClasification) {
                                                var d = [],
                                                    e = c.nombre;
                                                _.find(a.bubblesConfig, function (a) {
                                                    a.family == e && d.push(a.subfamily);
                                                }),
                                                    (d = _.uniq(d)),
                                                    a.$apply(function () {
                                                        (b.typeOfClasification = "sub"), (b.clasificationForGraphs = d), (b.idForClasif = c.nombre), (b.changeRadarLevels = "between");
                                                    }),
                                                    console.log("view; ", "select group; ", c.nombre),
                                                    ga("send", "event", "view", "select group", c.nombre);
                                            }
                                        });
                            }
                            function n(a) {
                                var b = d3.geom.quadtree(l);
                                return function (c) {
                                    var d = c.radius + t.domain()[1] + s,
                                        e = c.x - d,
                                        f = c.x + d,
                                        g = c.y - d,
                                        h = c.y + d;
                                    b.visit(function (b, d, i, j, k) {
                                        if (b.point && b.point !== c) {
                                            var l = c.x - b.point.x,
                                                m = c.y - b.point.y,
                                                n = Math.sqrt(l * l + m * m),
                                                o = c.radius + b.point.radius + (c.color !== b.point.color) * s;
                                            o > n && ((n = ((n - o) / n) * a), (c.x -= l *= n), (c.y -= m *= n), (b.point.x += l), (b.point.y += m));
                                        }
                                        return d > f || e > j || i > h || g > k;
                                    });
                                };
                            }
                            function o(a, b) {
                                (a = String(a).replace(/[^0-9a-f]/gi, "")), a.length < 6 && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), (b = b || 0);
                                var c,
                                    d,
                                    e = "#";
                                for (d = 0; 3 > d; d++) (c = parseInt(a.substr(2 * d, 2), 16)), (c = Math.round(Math.min(Math.max(0, c + c * b), 255)).toString(16)), (e += ("00" + c).substr(c.length));
                                return e;
                            }
                            function p(c) {
                                if (((m = []), f)) var g = 0.4;
                                else var g = 0.45;
                                var h = c,
                                    i = h.length;
                                if (i > 2)
                                    var n = 4,
                                        o = 1.8;
                                else
                                    var n = 7,
                                        o = 1.7;
                                _.each(a.datas, function (a, c) {
                                    if ("tech" == b.typeOfClasification) for (var d = 0; i > d; d++) if (a.family == h[d]) var e = d;
                                    if ("lic" == b.typeOfClasification) for (var d = 0; i > d; d++) if (a.license.name == h[d]) var e = d;
                                    if ("sub" == b.typeOfClasification) for (var d = 0; i > d; d++) if (a.subfamily == h[d]) var e = d;
                                    if (void 0 != e) {
                                        var f = ((2 * Math.PI) / i) * e,
                                            p = Math.cos(f),
                                            q = Math.sin(f),
                                            r = { x: (j / n) * p + j / o, y: (k / 4) * q + k * g };
                                        (l[c].cx = r.x - 50), (l[c].cy = r.y);
                                    } else {
                                        var r = { x: -200, y: -200 };
                                        (l[c].cx = -200), (l[c].cy = -200);
                                    }
                                    if ("tech" == b.typeOfClasification) {
                                        var s = _.find(m, function (b) {
                                            return b.nombre == a.family;
                                        });
                                        void 0 == s && m.push({ nombre: a.family, px: r.x - 50, py: r.y - 60 });
                                    }
                                    if ("lic" == b.typeOfClasification) {
                                        var s = _.find(m, function (b) {
                                            return b.nombre == a.license.name;
                                        });
                                        void 0 == s && m.push({ nombre: a.license.name, px: r.x - 50, py: r.y - 60 });
                                    }
                                    if ("sub" == b.typeOfClasification) {
                                        var s = _.find(m, function (b) {
                                            return b.nombre == a.subfamily;
                                        });
                                        void 0 == s && m.push({ nombre: a.subfamily, px: r.x - 50, py: r.y - 60 });
                                    }
                                });
                                var p = d3.layout.force().nodes(l).size([j, k]).gravity(0).charge(0).on("tick", d).start();
                                e(m), p.start();
                            }
                            var q = _.uniq(_.pluck(a.datas, "family")),
                                r = q.length,
                                s = 6,
                                t = d3.scale.sqrt().range([3, 12]);
                            if (f) var u = 0.4;
                            else var u = 0.45;
                            if (r > 2)
                                var v = 4,
                                    w = 1.8;
                            else
                                var v = 7,
                                    w = 1.7;
                            _.each(a.datas, function (a) {
                                for (var b = 0; r > b; b++) if (a.family == q[b]) var c = b;
                                if (0 == a.trend) var d = 0.5;
                                if (a.trend < 0) var d = 0.1;
                                if (a.trend > 0) var d = 1;
                                var e = ((2 * Math.PI) / r) * c,
                                    f = Math.cos(e),
                                    g = Math.sin(e),
                                    h = { x: (j / v) * f + j / w, y: (k / 4) * g + k * u };
                                l.push({ datos: a, tipo: a.family, license: a.license.name, id: a.name, radius: a.score * (k / 1500), radiusplus: a.score * (k / 1500) + 10, color: a.colorsubfamily, opacity: d, cx: h.x - 50, cy: h.y });
                                var i = _.find(m, function (b) {
                                    return b.nombre == a.family;
                                });
                                void 0 == i && m.push({ nombre: a.family, px: h.x - 50, py: h.y - 60 });
                            });
                            var x = d3.layout.force().nodes(l).size([j, k]).gravity(0).charge(0).on("tick", d).start();
                            (h = d3
                                .select("#chartBubble")
                                .append("svg")
                                .attr("id", "graficaBubbles")
                                .attr("class", "bubbles")
                                .append("g")
                                .attr("id", "grupoBubbles")
                                .attr("transform", "translate(" + i.left + "," + i.top + ") scale(" + g + "," + g + ")")),
                                (document.getElementById("graficaBubbles").style.height = window.innerHeight + "px"),
                                (document.getElementById("graficaBubbles").style.width = window.innerWidth + "px");
                            var y = h
                                .selectAll("circle")
                                .data(l)
                                .enter()
                                .append("circle")
                                .attr("id", function (a) {
                                    return a.id;
                                })
                                .attr("family", function (a) {
                                    return a.tipo;
                                })
                                .attr("license", function (a) {
                                    return a.license;
                                })
                                .attr("class", "node")
                                .attr("r", function (a) {
                                    return a.radius;
                                })
                                .attr("rplus", function (a) {
                                    return a.radiusplus;
                                })
                                .attr("rnormal", function (a) {
                                    return a.radius;
                                })
                                .style("fill", function (a) {
                                    return a.color;
                                })
                                .style("stroke", function (a) {
                                    return o(a.color, 0.3);
                                })
                                .style("stroke-width", 0)
                                .style("fill-opacity", function (a) {
                                    return a.opacity;
                                })
                                .style("cursor", "pointer")
                                .on("mouseover", function (a) {
                                    f &&
                                        z
                                            .attr("x", a.x + 30)
                                            .attr("y", a.y)
                                            .attr("font-weight", "bold")
                                            .text(a.id)
                                            .transition(200)
                                            .style("opacity", 1);
                                })
                                .on("mouseout", function (a) {
                                    f && z.transition(200).style("opacity", 0);
                                })
                                .on("click", function (c) {
                                    console.log("view ;", "detail ;", c.id),
                                        ga("send", "event", "view", "detail", c.id),
                                        d3.selectAll(".node").transition().duration(500).style("stroke-width", 0),
                                        d3.select(this).transition().duration(500).style("stroke-width", 6),
                                        $("#infoToolTipInfoParameters").css({ opacity: 1 }),
                                        $("#infoToolTipInfoExtend").css({ opacity: 1 }),
                                        z
                                            .attr("x", c.x + 30)
                                            .attr("y", c.y)
                                            .attr("font-weight", "bold")
                                            .text(c.id)
                                            .transition(200)
                                            .style("opacity", 1),
                                        a.$apply(function () {
                                            (b.nodeDatasBubbles = c.id), (b.activeDetails = !0);
                                        });
                                })
                                .call(x.drag);
                            e(m);
                            var z = h.append("text").style("opacity", 1).style("font-family", "sans-serif").style("fill", "white").style("cursor", "default").style("font-size", "16px");
                            a.$watch(
                                function () {
                                    return b.clasificationForGraphs;
                                },
                                function (c, d) {
                                    (a.clasificacion = b.clasificationForGraphs), c != d && void 0 != c && p(a.clasificacion);
                                },
                                !0
                            );
                        }
                        function d(a) {
                            var b = h.selectAll(".node")[0];
                            _.each(b, function (b, c) {
                                void 0 != a[c]
                                    ? d3
                                          .select(b)
                                          .transition()
                                          .duration(2e3)
                                          .attr("r", function () {
                                              return a[c].noFilter ? (void 0 == a[c] ? 0 : a[c].score * (k / 1500)) : 0;
                                          })
                                          .attr("rplus", function () {
                                              return void 0 == a[c] ? 0 : a[c].score * (k / 1500) + 10;
                                          })
                                          .attr("rnormal", function () {
                                              return void 0 == a[c] ? 0 : a[c].score * (k / 1500);
                                          })
                                          .style("fill-opacity", function () {
                                              return a[c].noFilter ? (void 0 == a[c] || 0 == a[c].trend ? 0.5 : a[c].trend < 0 ? 0.1 : a[c].trend > 0 ? 1 : void 0) : 0;
                                          })
                                    : d3
                                          .select(b)
                                          .transition()
                                          .duration(2e3)
                                          .attr("r", 0)
                                          .style("fill-opacity", function () {
                                              return 0;
                                          });
                            });
                        }
                        var e = !0;
                        a.height = window.innerHeight;
                        var f = !0,
                            g = window.innerHeight / a.height;
                        window.DeviceOrientationEvent && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (f = !1);
                        var h,
                            i = { top: 0, right: 0, bottom: 0, left: 0 },
                            j = window.innerWidth - i.left - i.right,
                            k = window.innerHeight - i.top - i.bottom,
                            l = [],
                            m = [];
                        a.$watch("radardata", function (b, f) {
                            e || d(b), b.length > 0 && f.length > 0 && b != f && e && ((a.datas = b), c(), (e = !1));
                        }),
                            $("#graficaBusqueda").each(function () {
                                $(this).remove();
                            }),
                            $(window).resize(function () {
                                a.$apply(function () {
                                    (g = window.innerHeight / a.height),
                                        (document.getElementById("graficaBubbles").style.height = window.innerHeight + "px"),
                                        (document.getElementById("graficaBubbles").style.width = window.innerWidth + "px"),
                                        d3
                                            .select("#grupoBubbles")
                                            .transition()
                                            .attr("transform", "translate(" + i.left + "," + i.top + ") scale(" + g + "," + g + ")");
                                });
                            });
                    },
                };
            },
        ])
        .directive("ionslider", function () {
            return { restrict: "EA", scope: { from: "=", to: "=" }, template: "<div></div>", replace: !0, link: function (a, b) {} };
        }),
    angular
        .module("testProjectApp")
        .factory("dataFactory", [
            "$http",
            function (a) {
                return {
                    getDatas: function (b) {
                        var c = { response: "ok", responseDatas: [], ckeck: !0 },
                            d = a.get("data/" + b + ".json").then(
                                function (a) {
                                    return (c.responseDatas = recalculateScore(a.data, [])), c;
                                },
                                function (a) {
                                    var b = { response: "ok", responseDatas: [], ckeck: !1 };
                                    return b;
                                }
                            );
                        return d;
                    },
                };
            },
        ])
        .service("CalculatorService", function () {
            this.calculateNewScore = function (a, b) {
                return recalculateScore(a, b);
            };
        }),
    angular.module("testProjectApp").controller("MainCtrl", [
        "$scope",
        "$localStorage",
        "CalculatorService",
        "dataFactory",
        "$filter",
        "$location",
        function (a, b, c, d, e, f) {
            if (
                ((a.userLogin = b.user),
                (a.logOut = function () {
                    f.path("/"), (b.chk = !1);
                }),
                b.chk)
            ) {
                var g = new Date(),
                    h = g.getMilliseconds();
                ga("set", "&uid", a.userLogin), ga("set", "dimension1", a.userLogin + "-" + g), ga("set", "dimension2", a.userLogin), ga("set", "dimension4", h), ga("create", "UA-66336260-2", { userId: a.userLogin });
            } else a.logOut();
            "addEventListener" in document &&
                document.addEventListener(
                    "DOMContentLoaded",
                    function () {
                        FastClick.attach(document.body);
                    },
                    !1
                ),
                (a.slideFirst = 31),
                (a.slideLast = 2);
            var i = 31,
                j = 2;
            (a.from = 2), (a.to = 31);
            var k = !0;
            (a.radardata = []),
                (a.radardataBefore = []),
                (a.bubbleLegend = { first: !1, last: !1 }),
                (a.radarLegend = { first: !1, last: !1 }),
                (a.filtersValues = {}),
                (a.filterStatus = b.filterStatus = b.activeDetails = !1),
                (a.infoActive = !0),
                (a.detailsDatas = []),
                (a.visualization = "bubbles"),
                (a.InfoType = "tendences"),
                (a.changeTableOrder = "-score"),
                (a.filterActivation = {}),
                (a.filtersArray = []),
                (a.controlSliderStatus = !0),
                (a.userSelect = !1),
                (a.userProfile = "General"),
                (a.idForClasif = "none"),
                (b.userProfileModeOptions = ["github", "stackshare", "Tech blogs", "Analyst blogs", "crunchbase", "lanyrd", "AngelList", "twitter"]),
                (b.nodeDatasBubbles = {}),
                (b.typeOfClasification = "tech"),
                (b.idForClasif = "none"),
                (a.getDatas = function (e, f) {
                    d.getDatas(e).then(function (e) {
                        console.log(e),
                            e.ckeck
                                ? d.getDatas(f).then(function (d) {
                                      (a.radardata = c.calculateNewScore(e.responseDatas, a.filtersArray)),
                                          (a.radardataBefore = c.calculateNewScore(d.responseDatas, a.filtersArray)),
                                          k && a.changeOrganization(b.typeOfClasification),
                                          _.each(a.radardata, function (b, c) {
                                              var d;
                                              a.radardataBefore[c]
                                                  ? ((d = a.radardataBefore[c].score), (a.radardata[c].trend = a.radardata[c].score - d), (a.radardata[c].trendNormalice = 3 * (a.radardata[c].trend + 0.15)))
                                                  : ((a.radardata[c].trend = 0), (a.radardata[c].trendNormalice = 0)),
                                                  (a.radardata[c].noFilter = !0);
                                          }),
                                          _.each(a.radardata[0].sources, function (c) {
                                              (a.filtersValues[c.name] = {}),
                                                  -1 != $.inArray(c.name, b.userProfileModeOptions) ? (c.profileActivation = !0) : (c.profileActivation = !1),
                                                  k &&
                                                      _.each(c.metrics, function (b) {
                                                          a.filtersValues[c.name][b.name], (a.filterActivation[b.name + c.name] = !0);
                                                      });
                                          }),
                                          k && ((a.filtersValuesCopy = angular.copy(a.filtersValues)), (a.filterActivation.all = !0)),
                                          (k = !1),
                                          a.filterBySource();
                                  })
                                : ((a.to = a.to - 1), console.log("no hay datos", a.to), a.dataSelectionDate(a.from, a.to)),
                            $(".detailList").css("height", 0.47 * window.innerHeight),
                            $(".accordionList").css("height", 0.7 * window.innerHeight);
                    });
                }),
                (a.dataSelectionDate = function (b, c) {
                    var d = new Date().getDay();
                    if (d >= 4) var f = d - 4;
                    else var f = d + 3;
                    console.log("b y c: ",b, c);
                    console.log("slidefirst", a.slideFirst);
                    var g = 7 * Math.abs(b - a.slideFirst) + f,
                        h = 7 * Math.abs(c - a.slideFirst) + f;
                    (a.date1 = e("date")(new Date("2016-05-27").setDate(new Date("2016-05-27").getDate() - g), "yyyy-MM-dd")),
                        (a.date2 = e("date")(new Date("2016-05-27").setDate(new Date("2016-05-27").getDate() - h), "yyyy-MM-dd")),
                        console.log("fechas: ", a.date2, a.date1),
                        b != j && (a.sendInfoGA("slider", "select last date", a.date1), (j = b)),
                        c != i && (a.sendInfoGA("slider", "select first date", a.date2), (i = c)),
                        a.getDatas(a.date2, a.date1);
                }),
                (a.sendInfoGA = function (a, b, c) {
                    var d = new Date(),
                        e = d.getMilliseconds();
                    if (1 == b) var f = "true";
                    else if (0 == b) var f = "false";
                    else var f = b;
                    console.log(a + ";", f + ";", c), ga("set", "dimension3", e), ga("send", "event", a, f, c);
                }),
                a.dataSelectionDate(a.slideLast, a.slideFirst),
                (a.controlSliderOpenClose = function () {
                    a.controlSliderStatus = !a.controlSliderStatus;
                }),
                (a.showUser = function () {
                    a.userSelect = !a.userSelect;
                }),
                (a.changeUser = function (c) {
                    (a.userProfile = c),
                        a.showUser(),
                        "Technical" == c && (b.userProfileModeOptions = ["github", "stackshare", "Tech blogs", "twitter"]),
                        "Business" == c && (b.userProfileModeOptions = ["Analyst blogs", "crunchbase", "lanyrd", "AngelList"]),
                        "General" == c && (b.userProfileModeOptions = ["github", "stackshare", "Tech blogs", "Analyst blogs", "crunchbase", "lanyrd", "AngelList", "twitter"]);
                }),
                (a.profileConfig = function (b) {
                    var d = [];
                    _.each(a.radardata[0].sources, function (a) {
                        -1 != $.inArray(a.name, b)
                            ? (a.profileActivation = !0)
                            : (_.each(a.metrics, function (a) {
                                  -1 === $.inArray(a.name, d) && d.push(a.name);
                              }),
                              (a.profileActivation = !1));
                    }),
                        (a.filtersArray = d),
                        (a.radardata = c.calculateNewScore(a.radardata, a.filtersArray)),
                        (a.radardataBefore = c.calculateNewScore(a.radardataBefore, a.filtersArray)),
                        _.each(a.radardata, function (b, c) {
                            var d;
                            a.radardataBefore[c]
                                ? ((d = a.radardataBefore[c].score), (a.radardata[c].trend = a.radardata[c].score - d), (a.radardata[c].trendNormalice = 3 * (a.radardata[c].trend + 0.15)))
                                : ((a.radardata[c].trend = 0), (a.radardata[c].trendNormalice = 0));
                        });
                }),
                (a.changeOrganization = function (c, d) {
                    if ((void 0 == d && (d = b.idForClasif), "tech" == c)) {
                        var e = _.uniq(_.pluck(a.radardata, "family"));
                        b.typeOfClasification = "tech";
                    } else if ("lic" == c) {
                        var f = _.uniq(_.pluck(a.radardata, "license")),
                            e = _.uniq(_.pluck(f, "name"));
                        (b.typeOfClasification = "lic"), (b.changeRadarLevels = "lic");
                    } else if ("sub" == c)
                        if (void 0 != d)
                            if (b.idForClasif != d) {
                                (b.idForClasif = d), (b.changeRadarLevels = "between");
                                var f = _.where(a.radardata, { family: b.idForClasif }),
                                    e = _.uniq(_.pluck(f, "subfamily"));
                                b.typeOfClasification = "sub";
                            } else {
                                b.changeRadarLevels = "return";
                                var e = _.uniq(_.pluck(a.radardata, "family"));
                                (b.idForClasif = "none"), (b.typeOfClasification = "tech");
                            }
                        else {
                            var f = _.where(a.radardata, { family: b.idForClasif }),
                                e = _.uniq(_.pluck(f, "subfamily"));
                            b.typeOfClasification = "sub";
                        }
                    b.clasificationForGraphs = e;
                }),
                (a.CambiarVis = function (b) {
                    (a.visualization = b),
                        "radar" == b
                            ? ((a.radarLegend = { first: !0, last: !1 }), (a.bubbleLegend = { first: !1, last: !1 }))
                            : "bubbles" == b
                            ? ((a.bubbleLegend = { first: !0, last: !1 }), (a.radarLegend = { first: !1, last: !1 }))
                            : "table" == b && ((a.bubbleLegend = { first: !1, last: !1 }), (a.radarLegend = { first: !1, last: !1 })),
                        a.goToDetails();
                }),
                (a.closeLegend = function (b) {
                    "radar" == b ? (a.radarLegend = { first: !0, last: !1 }) : (a.bubbleLegend = { first: !0, last: !1 });
                }),
                (a.openLegend = function (b) {
                    "radar" == b ? ((a.radarLegend = { first: !0, last: !0 }), (a.bubbleLegend = { first: !1, last: !1 })) : ((a.bubbleLegend = { first: !0, last: !0 }), (a.radarLegend = { first: !1, last: !1 }));
                }),
                (a.activeFiltersFunction = function () {
                    b.filterStatus = !b.filterStatus;
                }),
                (a.closeInfo = function () {
                    a.infoActive = b.openTendences = !1;
                }),
                (a.changeStatusFilter = function (d, e) {
                    (a.detailsDatas = _.findWhere(a.radardata, { name: b.nodeDatasBubbles })),
                        "all" == d && a.filterActivation.all
                            ? ((a.filtersArray = []),
                              _.each(a.radardata[0].sources, function (b) {
                                  _.each(b.metrics, function (b) {
                                      a.filtersArray.push(b.name);
                                  });
                              }),
                              _.each(a.filterActivation, function (b, c) {
                                  a.filterActivation[c] = !1;
                              }))
                            : "all" != d || a.filterActivation.all
                            ? a.filterActivation[e]
                                ? (a.filtersArray.push(d), (a.filterActivation[e] = !a.filterActivation[e]))
                                : ((a.filtersArray = _.reject(a.filtersArray, function (a) {
                                      return a === d;
                                  })),
                                  (a.filterActivation[e] = !a.filterActivation[e]))
                            : (a.profileConfig(b.userProfileModeOptions),
                              _.each(a.filterActivation, function (b, c) {
                                  a.filterActivation[c] = !0;
                              })),
                        (a.radardata = c.calculateNewScore(a.radardata, a.filtersArray)),
                        (a.radardataBefore = c.calculateNewScore(a.radardataBefore, a.filtersArray)),
                        _.each(a.radardata, function (b, c) {
                            var d;
                            a.radardataBefore[c]
                                ? ((d = a.radardataBefore[c].score), (a.radardata[c].trend = a.radardata[c].score - d), (a.radardata[c].trendNormalice = 3 * (a.radardata[c].trend + 0.15)))
                                : ((a.radardata[c].trend = 0), (a.radardata[c].trendNormalice = 0));
                        });
                }),
                (a.changeOrderTable = function (b) {
                    a.changeTableOrder == "-" + b ? (a.changeTableOrder = b) : (a.changeTableOrder = "-" + b);
                }),
                (a.goToDetails = function (c) {
                    void 0 == c ? ((b.nodeDatasBubbles = void 0), (a.InfoType = "tendences")) : (b.nodeDatasBubbles = c);
                }),
                (a.filterBySource = function (b) {
                    _.each(a.radardata, function (b, c) {
                        var d = 0;
                        _.each(b.sources, function (b) {
                            _.each(b.metrics, function (e) {
                                a.filtersValuesCopy[b.name][e.name] > e.value && ((a.radardata[c].noFilter = !1), (d += 1)),
                                    (a.filtersValuesCopy[b.name][e.name] <= e.value || null == a.filtersValuesCopy[b.name][e.name]) && 0 == d && (a.radardata[c].noFilter = !0);
                            });
                        });
                    }),
                        (a.radardata = c.calculateNewScore(a.radardata, a.filtersArray));
                }),
                $("#range").ionRangeSlider({
                    type: "double",
                    from: a.slideLast,
                    from_min: a.slideLast,
                    from_max: a.slideFirst - 1,
                    from_shadow: !0,
                    to: a.slideFirst,
                    to_min: a.slideLast + 1,
                    to_max: a.slideFirst,
                    to_shadow: !0,
                    grid: !0,
                    hide_min_max: !0,
                    values: [
                        "AUG",
                        "07/08",
                        "14/08",
                        "21/08",
                        "SEP",
                        "07/09",
                        "14/09",
                        "21/09",
                        "OCT",
                        "07/10",
                        "14/10",
                        "21/10",
                        "NOV",
                        "07/11",
                        "14/11",
                        "21/11",
                        "DEC",
                        "07/12",
                        "14/12",
                        "21/12",
                        "JAN",
                        "07/01",
                        "14/01",
                        "21/01",
                        "FEB",
                        "07/02",
                        "14/02",
                        "21/02",
                        "MAR",
                        "07/03",
                        "14/03",
                        "21/03",
                        "APR",
                        "07/04",
                        "14/04",
                        "21/04",
                        "MAY",
                        "07/05",
                        "14/05",
                        "21/05",
                    ],
                    onStart: function () {
                        console.log("onStart");
                    },
                    onChange: function () {
                        console.log("onChange");
                    },
                    onFinish: function (b) {
                        console.log("data from - to: ", b.from, b.to), (a.from = b.from), (a.to = b.to), a.dataSelectionDate(a.from, a.to);
                    },
                    onUpdate: function () {
                        console.log("onUpdate");
                    },
                }),
                a.$watch(
                    function () {
                        return b.filterStatus;
                    },
                    function (b, c) {
                        a.filterStatus = b;
                    },
                    !0
                ),
                a.$watch(
                    function () {
                        return b.idForClasif;
                    },
                    function (b) {
                        a.idForClasif = b;
                    },
                    !0
                ),
                a.$watch(
                    function () {
                        return b.userProfileModeOptions;
                    },
                    function (c, d) {
                        c != d && void 0 != c && void 0 != d && a.profileConfig(b.userProfileModeOptions);
                    },
                    !0
                ),
                a.$watch(
                    function () {
                        return b.openTendences;
                    },
                    function () {
                        "tendences" == a.InfoType ? (a.infoActive = b.openTendences) : (a.InfoType = "tendences");
                    },
                    !0
                ),
                a.$watch(
                    function () {
                        return b.nodeDatasBubbles;
                    },
                    function (c, d) {
                        c != d && void 0 != c && ((a.detailsDatas = _.findWhere(a.radardata, { name: b.nodeDatasBubbles })), (a.infoActive = !0), (a.InfoType = "details"));
                    },
                    !0
                ),
                a.$watchGroup(["slideFirst", "slideLast"], function (b) {
                    a.dataSelectionDate(a.slideLast, a.slideFirst);
                });
        },
    ]),
    angular.module("testProjectApp").controller("navCtrl", [
        "$scope",
        "$localStorage",
        function (a, b) {
            (b.openTendences = !1),
                (b.filterStatus = !1),
                (a.userSelect = !1),
                (a.Tendences = !0),
                (a.config = !1),
                (a.showUser = function () {
                    a.userSelect = !a.userSelect;
                });
            var c = $("#fullScreen"),
                d = $(document.body);
            "standalone" in window.navigator &&
                !window.navigator.standalone &&
                (c.show(),
                d.bind("touchstart.appModeNote touchmove.appModeNote", function (a) {
                    a.preventDefault(), d.unbind("touchstart.appModeNote touchmove.appModeNote"), c.fadeOut(500);
                })),
                (a.fsState = !1),
                (a.fullScreen = function () {
                    function b(a) {
                        a.requestFullScreen ? a.requestFullScreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullScreen && a.webkitRequestFullScreen();
                    }
                    function c() {
                        document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen();
                    }
                    0 == a.fsState ? b(document.documentElement) : c(), (a.fsState = !a.fsState);
                }),
                (a.openTendences = function () {
                    b.openTendences = !b.openTendences;
                }),
                (a.activeFiltersFunction = function () {
                    (a.config = !a.config), (b.filterStatus = !b.filterStatus);
                }),
                a.$watch(
                    function () {
                        return b.openTendences;
                    },
                    function (b, c) {
                        b != c && void 0 != b && (a.Tendences = c);
                    },
                    !0
                );
        },
    ]),
    angular.module("testProjectApp").controller("LogCtrl", [
        "$scope",
        "$localStorage",
        "$location",
        "$timeout",
        function (a, b, c, d) {
            (a.inputValues = { nm: "", pss: "" }),
                (a.loginChk = !1),
                1 == b.chk && c.path("main"),
                (a.login = function () {
                    (b.chk = !0), (b.user = a.inputValues.nm), c.path("main");
                });
        },
    ]);
