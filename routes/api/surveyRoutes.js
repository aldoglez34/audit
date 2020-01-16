const router = require("express").Router();
const model = require("../../models");

// get answers
// matches with /api/survey/cci/:id
router.get("/cci/:id", function (req, res) {
    model.Cci.findOne({
        where: { auditId: req.params.id }
    })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.send(err);
        });
});

// post answers
// matches with /api/survey/cii/
router.put("/cci/", function (req, res) {
    model.Cci.update({
        a1: req.body.a1,
        a2: req.body.a2,
        a3: req.body.a3,
        a4: req.body.a4,
        a5: req.body.a5,
        a6: req.body.a6,
        a7: req.body.a7,
        a8: req.body.a8,
        a9: req.body.a9,
        a10: req.body.a10,
        a11: req.body.a11,
        a12: req.body.a12,
        a13: req.body.a13,
        a14: req.body.a14,
        a15: req.body.a15,
        a16: req.body.a16,
        a17: req.body.a17,
        a18: req.body.a18,
        a19: req.body.a19,
        a20: req.body.a20,
        a21: req.body.a21,
        a22: req.body.a22,
        a23: req.body.a23,
        a24: req.body.a24,
        a25: req.body.a25,
        a26: req.body.a26,
        a27: req.body.a27,
        a28: req.body.a28,
        a29: req.body.a29,
        a30: req.body.a30,
        a31: req.body.a31,
        a32: req.body.a32,
        a33: req.body.a33,
        a34: req.body.a34,
        a35: req.body.a35,
        a36: req.body.a36,
        a37: req.body.a37,
        a38: req.body.a38,
        a39: req.body.a39,
        a40: req.body.a40,
        a41: req.body.a41,
        a42: req.body.a42,
        a43: req.body.a43,
        a44: req.body.a44,
        a45: req.body.a45,
        a46: req.body.a46,
        a47: req.body.a47,
        a48: req.body.a48,
        a49: req.body.a49,
        a50: req.body.a50,
        a51: req.body.a51,
        a52: req.body.a52,
        a53: req.body.a53,
        a54: req.body.a54,
        a55: req.body.a55,
        a56: req.body.a56,
        a57: req.body.a57,
        a58: req.body.a58,
        a59: req.body.a59,
        a60: req.body.a60,
        a61: req.body.a61,
        a62: req.body.a62,
        a63: req.body.a63,
        a64: req.body.a64,
        a65: req.body.a65,
        a66: req.body.a66,
        a67: req.body.a67,
        a68: req.body.a68,
        a69: req.body.a69,
        a70: req.body.a70,
        a71: req.body.a71,
        a72: req.body.a72,
        a73: req.body.a73,
        a74: req.body.a74,
        a75: req.body.a75,
        a76: req.body.a76,
        a77: req.body.a77,
        a78: req.body.a78,
        a79: req.body.a79,
        a80: req.body.a80,
        a81: req.body.a81,
        a82: req.body.a82,
        a83: req.body.a83,
        a84: req.body.a84,
        a85: req.body.a85,
        a86: req.body.a86,
        a87: req.body.a87,
        a88: req.body.a88,
        a89: req.body.a89,
        a90: req.body.a90,
        a91: req.body.a91,
        a92: req.body.a92,
        a93: req.body.a93,
        a94: req.body.a94,
        a95: req.body.a95,
        a96: req.body.a96,
        a97: req.body.a97,
        a98: req.body.a98,
        a99: req.body.a99,
        a100: req.body.a100,
        a101: req.body.a101,
        a102: req.body.a102,
        a103: req.body.a103,
        a104: req.body.a104,
        a105: req.body.a105,
        a106: req.body.a106,
        a107: req.body.a107,
        a108: req.body.a108,
        a109: req.body.a109,
        a110: req.body.a110,
        a111: req.body.a111,
        a112: req.body.a112,
        a113: req.body.a113,
        a114: req.body.a114,
        a115: req.body.a115,
        a116: req.body.a116,
        a117: req.body.a117,
        a118: req.body.a118,
        a119: req.body.a119,
        a120: req.body.a120,
        a121: req.body.a121,
        a122: req.body.a122,
        a123: req.body.a123,
        a124: req.body.a124,
        a125: req.body.a125
    },
        {
            where: { auditId: req.body.auditId }
        })
        .then(function (res) {
            res.json(res);
        })
        .catch(function (err) {
            res.send(err);
        });
});

// get checkboxes
// matches with /api/survey/cefs/:id
router.get("/cefs/:id", function (req, res) {
    model.Cefs.findOne({
        where: { auditId: req.params.id }
    })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.send(err);
        });
});

// post checkboxes
// matches with /api/survey/cefs/
router.put("/cefs/", function (req, res) {
    model.Cefs.update({
        c1: req.body.c1,
        c2: req.body.c2,
        c3: req.body.c3,
        c4: req.body.c4,
        c5: req.body.c5,
        c6: req.body.c6,
        c7: req.body.c7,
        c8: req.body.c8,
        c9: req.body.c9,
        c10: req.body.c10,
        c11: req.body.c11,
        c12: req.body.c12,
        c13: req.body.c13,
        c14: req.body.c14,
        c15: req.body.c15,
        c16: req.body.c16,
        c17: req.body.c17,
        c18: req.body.c18,
        c19: req.body.c19,
        c20: req.body.c20
    },
        {
            where: { auditId: req.body.auditId }
        })
        .then(function (res) {
            res.json(res);
        })
        .catch(function (err) {
            res.send(err);
        });
});


module.exports = router;
