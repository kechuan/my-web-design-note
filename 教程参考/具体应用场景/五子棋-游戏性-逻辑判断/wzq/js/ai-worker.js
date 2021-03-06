function mapPoint(t, e) {
    this.r = t,
    this.c = e,
    this.set = !1,
    this.score = 0,
    this.valid = !1,
    this.info = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
}
function bufToString() {
    return String.fromCharCode.apply(null, boardBufArr)
}
self.addEventListener("message",
function(t) {
    switch (t.data.type) {
    case "ini":
        ai.ini(t.data.mode, t.data.color);
        break;
    case "watch":
        ai.watch(t.data.r, t.data.c, t.data.color);
        break;
    case "compute":
        ai.move();
        break;
    case "show_me":
        postMessage(ai.map)
    }
}),
mc = 0,
ai = {},
ai.sum = 0,
ai.setNum = 0,
ai.scoreMap = [],
ai.scorequeue = [],
ai.map = [];
for (var i = 0; 15 > i; i++) {
    for (var tmp = [], j = 0; 15 > j; j++) {
        var a = new mapPoint(i, j);
        tmp.push(a),
        ai.scorequeue.push(a)
    }
    ai.map.push(tmp)
}
boardBuf = new ArrayBuffer(255),
boardBufArr = new Uint8Array(boardBuf),
ai.ini = function(t, e) {
    switch (this.color = e, this.otc = "black" == e ? "white": "black", t) {
    case "test":
        this.move = function() {
            postMessage({
                type: "decision",
                r: this.scorequeue[0].r,
                c: this.scorequeue[0].c
            })
        };
    case "novice":
        this.depth = 3,
        this.totry = [30, 30];
        break;
    case "medium":
        this.depth = 5,
        this.totry = [12, 8];
        break;
    case "expert":
        this.depth = 7,
        this.totry = [10, 10];
        break;
    default:
        postMessage({
            type:
            "ini_error",
            reason: t + " not supported"
        })
    }
    postMessage({
        type: "ini_complete"
    })
},
ai.watch = function(t, e, a) {
    this.updateMap(t, e, a),
    "remove" == a ? this.setNum--:this.setNum++,
    this.scorequeue.sort(this.sortMove),
    postMessage({
        type: "watch_complete"
    })
},
ai.updateMap = function(t, e, a) {
    var o, i = !1;
    return a == this.color ? o = 1 : a == this.otc ? o = 0 : (i = !0, o = this.map[t][e].set - 1),
    this._updateMap(t, e, o, i)
},
ai.moves = [[ - 1, -1], [ - 1, 0], [0, -1], [ - 1, 1]],
ai.coe = [ - 2, 1],
ai.scores = [0, 1, 10, 2e3, 4e3, 1e11],
ai._updateMap = function(t, e, a, o) {
    var i, n, r, s, c, h, u, l, m, f = this.moves,
    p = this.coe,
    d = this.scores,
    g = 4,
    v = 0;
    if (o) for (boardBufArr[15 * t + e] = 0, this.map[t][e].set = !1; g--;) for (i = t, n = e, r = 5; r--&&i >= 0 && n >= 0 && 15 > n;) if (c = i - 4 * f[g][0], h = n - 4 * f[g][1], c >= 15 || 0 > h || h >= 15) i += f[g][0],
    n += f[g][1];
    else {
        u = this.map[i][n].info[g];
        var w = 0;
        if (u[a]--, u[2] > 0) {
            for (s = 5, c = i, h = n, l = d[u[2]], v -= l * u[3]; s--;) this.map[c][h].score -= l,
            c -= f[g][0],
            h -= f[g][1];
            u[2]--,
            u[a] > 0 && (w = 1)
        } else u[1 - a] > 0 && !u[a] && (w = -1);
        if (1 === w) for (s = 5, l = d[u[2]], c = i, h = n, v += l * u[3]; s--;) this.map[c][h].score += l,
        c -= f[g][0],
        h -= f[g][1];
        else if ( - 1 === w) for (u[2] = u[1 - a], s = 5, l = d[u[2]], u[3] = p[1 - a], c = i, h = n, v += l * u[3]; s--;) this.map[c][h].score += l,
        c -= f[g][0],
        h -= f[g][1];
        i += f[g][0],
        n += f[g][1]
    } else for (boardBufArr[15 * t + e] = a + 2, this.map[t][e].set = a + 1; g--;) for (i = t, n = e, r = 5; r--&&i >= 0 && n >= 0 && 15 > n;) if (c = i - 4 * f[g][0], h = n - 4 * f[g][1], c >= 15 || 0 > h || h >= 15) i += f[g][0],
    n += f[g][1];
    else {
        if (u = this.map[i][n].info[g], u[2] > 0) for (s = 5, c = i, h = n, l = d[u[2]], v -= l * u[3]; s--;) this.map[c][h].score -= l,
        c -= f[g][0],
        h -= f[g][1];
        if (u[a]++, u[1 - a] > 0) u[2] = 0;
        else for (u[2] = u[a], m = p[a], u[3] = m, l = d[u[2]], s = 5, c = i, h = n, v += l * u[3]; s--;) this.map[c][h].score += l,
        c -= f[g][0],
        h -= f[g][1];
        i += f[g][0],
        n += f[g][1]
    }
    this.sum += v
},
ai.simulate = function(t, e, a) {
    this.setNum++,
    this._updateMap(t, e, a, !1)
},
ai.desimulate = function(t, e, a) {
    this._updateMap(t, e, a, !0),
    this.setNum--
},
ai.sortMove = function(t, e) {
    return t.set ? 1 : e.set ? -1 : t.score < e.score ? 1 : -1
},
ai.cache = {},
ai.nega = function(t, e, a, o, i) {
    var n = (this.map[t][e].info, 4),
    r = a % 2;
    this.simulate(t, e, r);
    var s = bufToString();
    if (this.cache[s]) return this.cache[s];
    if (Math.abs(this.sum) >= 1e7) return - 1 / 0;
    if (225 === this.setNum) return 0;
    if (0 === a) return this.sum;
    this.scorequeue.sort(this.sortMove);
    for (var c, n = this.totry[r], h = [], u = i; n--;) c = this.scorequeue[n],
    c.set || (h.push(c.c), h.push(c.r));
    a -= 1,
    n = h.length - 1,
    t = h[n],
    e = h[--n];
    var l = -this.nega(t, e, a, -u, -o);
    if (this.desimulate(t, e, a % 2), l > o && (s = bufToString(), this.cache[s] = l, o = l), o >= i) return s = bufToString(),
    this.cache[s] = i,
    o;
    for (u = o + 1; n--;) {
        if (t = h[n], e = h[--n], l = -this.nega(t, e, a, -u, -o), this.desimulate(t, e, a % 2), l > o && i > l && (l = -this.nega(t, e, a, -i, -o), this.desimulate(t, e, a % 2)), l > o && (o = l), o >= i) return o;
        u = o + 1
    }
    return o
},
ai.move = function() {
    ai.cache = {},
    postMessage({
        type: "starting"
    });
    for (var t, e = -1 / 0,
    a = 1 / 0,
    o = [this.scorequeue[0].r, this.scorequeue[0].c], i = 20, n = [], r = this.depth; i--;) t = this.scorequeue[i],
    t.score.set || (n.push(t.c), n.push(t.r));
    i = n.length - 1;
    var s, c, h = a;
    s = n[i],
    c = n[--i];
    var u = -this.nega(s, c, r, -h, -e);
    for (this.desimulate(s, c, r % 2), u > e && (e = u, o = [s, c]), h = e + 1; i--;) s = n[i],
    c = n[--i],
    u = -this.nega(s, c, r, -h, -e),
    this.desimulate(s, c, r % 2),
    u > e && a > u && (u = -this.nega(s, c, r, -a, -e), this.desimulate(s, c, r % 2)),
    u > e && (e = u, o = [s, c]),
    h = e + 1;
    postMessage({
        type: "decision",
        r: o[0],
        c: o[1]
    })
};