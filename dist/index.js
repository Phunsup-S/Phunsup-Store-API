"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("./model/product"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const cors_1 = __importDefault(require("cors"));
const line = __importStar(require("@line/bot-sdk"));
(0, db_1.default)();
const MessagingApiClient = line.messagingApi.MessagingApiClient;
const lineConfig = {
    channelAccessToken: "fTLQpURatpFHiI500kevYWlI9WhuuTmzRiuA93JjzraCWZleWQsrAqpJ1zGeLznCbB0TW75jSej4cLanrGUa+K3AsxaWCtLd/NqUWPKUWsmu7CQ5Y5vCAjREi44jUZtHASeELCW6eNvyKRCDfT8DrwdB04t89/1O/w1cDnyilFU=",
    channelSecret: "e95ea9a7045d25ff53c553c038a05053", // ใส่ channelSecret ที่ถูกต้องของคุณ
};
const config = {
    channelAccessToken: 'fTLQpURatpFHiI500kevYWlI9WhuuTmzRiuA93JjzraCWZleWQsrAqpJ1zGeLznCbB0TW75jSej4cLanrGUa+K3AsxaWCtLd/NqUWPKUWsmu7CQ5Y5vCAjREi44jUZtHASeELCW6eNvyKRCDfT8DrwdB04t89/1O/w1cDnyilFU=', // ต้องแทนที่ด้วย Channel Access Token ที่ถูกต้อง
};
const client = new MessagingApiClient({
    channelAccessToken: "fTLQpURatpFHiI500kevYWlI9WhuuTmzRiuA93JjzraCWZleWQsrAqpJ1zGeLznCbB0TW75jSej4cLanrGUa+K3AsxaWCtLd/NqUWPKUWsmu7CQ5Y5vCAjREi44jUZtHASeELCW6eNvyKRCDfT8DrwdB04t89/1O/w1cDnyilFU=",
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (_req, res) => {
    res.status(201).json({ message: "Welcome to Auth ts" });
});
app.get("/ping", (_req, res) => {
    res.status(200).json({ message: "Welcome Ping" });
});
app.get("/products", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_1.default.find({});
    res.status(200).json(data);
}));
app.get('/products/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    product_1.default.findById(req.params.id)
        .then(post => {
        res.json(post);
    })
        .catch(err => {
        next(err);
    });
}));
app.post('/products', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    product_1.default.create(req.body)
        .then((post) => {
        res.json(post);
    })
        .catch((err) => {
        next(err);
    });
}));
app.post('/products', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    product_1.default.create(req.body)
        .then((post) => {
        res.json(post);
    })
        .catch((err) => {
        next(err);
    });
}));
app.put('/products/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    product_1.default.findByIdAndUpdate(req.params.id, req.body)
        .then((post) => {
        res.json(post);
    })
        .catch((err) => {
        next(err);
    });
}));
app.delete('/products/:id', (req, res, next) => {
    product_1.default.findByIdAndDelete(req.params.id)
        .then((post) => {
        res.json(post);
    })
        .catch((err) => {
        next(err);
    });
});
app.post("/send-message/:id", (req, res) => {
    //console.log("userId : ", req.body.userId)
    //console.log("sadsdasdasds")
    const userId = req.params.id;
    client.pushMessage({
        to: userId,
        messages: flexMessage
    });
    return res.sendStatus(200).end();
});
app.post("/send-message", (req, res) => {
    //console.log("userId : ", req.body.userId)
    //console.log("sadsdasdasds")
    console.log(req.body);
    const { id, name, img, price, date, youtube, spotify, weburl } = req.body;
    const formattedDate = new Date(parseInt(date)).toLocaleString();
    if (!id || !name || !img || !price || !date || !youtube || !spotify) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const flexMessage = [
        {
            "type": 'flex',
            "altText": 'This is receipt',
            "contents": {
                "type": "bubble",
                "header": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "ใบเสร็จรับเงิน",
                            "align": "center"
                        }
                    ],
                    "backgroundColor": "#9e958a",
                    "margin": "none"
                },
                "hero": {
                    "type": "image",
                    "url": img,
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "ชื่อสินค้า:" + name,
                            "color": "#9e958a"
                        },
                        {
                            "type": "text",
                            "text": "ราคา: " + price.toString(),
                            "color": "#9e958a"
                        },
                        {
                            "type": "text",
                            "text": "วันเวลาที่สั่ง: " + formattedDate,
                            "color": "#9e958a",
                            "size": "xs"
                        },
                        {
                            "type": "button",
                            "action": {
                                "type": "uri",
                                "uri": weburl,
                                "label": "รายละเอียดสินค้า"
                            },
                            "color": "#9e958a",
                            "style": "link",
                            "margin": "sm"
                        },
                        {
                            "type": "button",
                            "action": {
                                "type": "uri",
                                "label": "Youtube",
                                "uri": youtube
                            },
                            "color": "#FF0000",
                            "style": "primary",
                            "margin": "sm"
                        },
                        {
                            "type": "button",
                            "action": {
                                "type": "uri",
                                "label": "Spotify",
                                "uri": spotify
                            },
                            "style": "primary",
                            "margin": "sm",
                            "color": "#008000"
                        }
                    ],
                    "backgroundColor": "#000000"
                },
                "styles": {
                    "hero": {
                        "backgroundColor": "#000000"
                    }
                }
            }
        },
    ];
    client.pushMessage({
        to: id,
        messages: flexMessage
    });
    return res.sendStatus(200).end();
});
app.post("/webhook", (req, res) => {
    var _a;
    const event = (_a = req.body.events[0]) !== null && _a !== void 0 ? _a : undefined;
    if (!event)
        return res.sendStatus(200).end();
    console.log("event=>", event);
    if (event.type === 'message') {
        const message = event.message;
        if (message.type === 'text') {
            if (message.text === 'รายละเอียด') {
                client.replyMessage({
                    replyToken: event.replyToken,
                    messages: [{
                            type: 'text',
                            text: 'เว็ปของเราขายแผ่นเสียงอัลบั้มเพลง สามารถเลือกซื้อที่เว็ปไซต์ของเรา หลังทำการสั่งซื้อทางเราจะส่งใบเสร็จมาให้ที่ห้องแชทนี้',
                        }]
                });
            }
            else if (message.text === 'โปรโมชั่น') {
                client.replyMessage({
                    replyToken: event.replyToken,
                    messages: [{
                            type: 'text',
                            text: 'ขณะนี้ยังไม่มีโปรโมชั่น',
                        }]
                });
            }
        }
    }
    return res.sendStatus(200).end();
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
const flexMessage = [
    {
        "type": 'flex',
        "altText": 'This is receipt',
        "contents": {
            "type": "bubble",
            "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": "ใบเสร็จรับเงิน",
                        "align": "center"
                    }
                ],
                "backgroundColor": "#9e958a",
                "margin": "none"
            },
            "hero": {
                "type": "image",
                "url": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f4f02ab3-f211-4f94-a56a-bedff443c1f5/dfzab1y-4c432d01-94e6-4b5e-a175-549ba77c4b73.png/v1/fill/w_894,h_894,q_70,strp/speak_now_taylors_version_album_cover_by_justintheswift_dfzab1y-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2Y0ZjAyYWIzLWYyMTEtNGY5NC1hNTZhLWJlZGZmNDQzYzFmNVwvZGZ6YWIxeS00YzQzMmQwMS05NGU2LTRiNWUtYTE3NS01NDliYTc3YzRiNzMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.xUsrraJwXFlqn_vFyqaJUQ4NfL_TEjLzrCfiiEO1GFs",
                "margin": "xl"
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": "ชื่อสินค้า:" + "Speak Now (Taylor's Version)",
                        "color": "#9e958a"
                    },
                    {
                        "type": "text",
                        "text": "ราคา: 1500",
                        "color": "#9e958a"
                    },
                    {
                        "type": "text",
                        "text": "วันเวลาที่สั่ง: ",
                        "color": "#9e958a",
                        "size": "xs"
                    },
                    {
                        "type": "button",
                        "action": {
                            "type": "uri",
                            "uri": "http://linecorp.com/",
                            "label": "รายละเอียดสินค้า"
                        },
                        "color": "#9e958a",
                        "style": "link",
                        "margin": "sm"
                    },
                    {
                        "type": "button",
                        "action": {
                            "type": "uri",
                            "label": "Youtube",
                            "uri": "https://www.youtube.com/playlist?list=PLINj2JJM1jxNeeZ9lih8SNd_NJEkA22u0"
                        },
                        "color": "#FF0000",
                        "style": "primary",
                        "margin": "sm"
                    },
                    {
                        "type": "button",
                        "action": {
                            "type": "uri",
                            "label": "Spotify",
                            "uri": "https://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH?si=d6ABPuPnRcK5k4pYd0Y0IQ"
                        },
                        "style": "primary",
                        "margin": "sm",
                        "color": "#008000"
                    }
                ],
                "backgroundColor": "#000000"
            },
            "styles": {
                "hero": {
                    "backgroundColor": "#000000"
                }
            }
        }
    },
];
