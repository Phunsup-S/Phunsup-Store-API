
import express, { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import Product from "./model/product";
import connectDB from "./config/db";
const app = express();
const port = process.env.PORT || 8080;
import cors from 'cors';
import * as line from '@line/bot-sdk';
import { request } from "http";

connectDB()

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
app.use(express.json());
app.use(cors());
app.get("/", (_req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Auth ts" });
});

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome Ping" });
});

app.get("/products", async (_req: Request, res: Response) => {
  const data = await Product.find({})
  res.status(200).json(data);
});

app.get('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  Product.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/products', async (req: Request, res: Response, next: NextFunction) => {
  Product.create(req.body)
    .then((post: any) => {
      res.json(post);
    })
    .catch((err: Error) => {
      next(err);
    });

});


app.post('/products', async (req: Request, res: Response, next: NextFunction) => {
  Product.create(req.body)
    .then((post: any) => {
      res.json(post);
    })
    .catch((err: Error) => {
      next(err);
    });

});

app.put('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then((post: any) => {
      res.json(post);
    })
    .catch((err: Error) => {
      next(err);
    });

});


app.delete('/products/:id', (req: Request, res: Response, next: NextFunction) => {
  Product.findByIdAndDelete(req.params.id)
    .then((post: any) => {
      res.json(post);
    })
    .catch((err: Error) => {
      next(err);
    });

});

app.post("/send-message/:id", (req: Request, res: Response) => {
  //console.log("userId : ", req.body.userId)
  //console.log("sadsdasdasds")
  const userId = req.params.id;
  client.pushMessage({
    to: userId,
    messages: flexMessage
  });
  return res.sendStatus(200).end()

})


app.post("/send-message", (req: Request, res: Response) => {
  //console.log("userId : ", req.body.userId)
  //console.log("sadsdasdasds")
  console.log(req.body)
  const { id, name, img, price, date, youtube, spotify, weburl} = req.body;
  const formattedDate = new Date(parseInt(date)).toLocaleString();

  if (!id || !name || !img || !price || !date || !youtube || !spotify) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const flexMessage =  [
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
                        "text": "ราคา: "+price.toString(),
                        "color": "#9e958a"
                    },
                    {
                        "type": "text",
                        "text": "วันเวลาที่สั่ง: "+formattedDate,
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
                            "uri":  youtube
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
                            "uri":  spotify
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
  ]
  client.pushMessage({
    to: id,
    messages: flexMessage
  });
  return res.sendStatus(200).end()

})

app.post("/webhook", (req: Request, res: Response) => {
  const event = req.body.events[0] ?? undefined;
  if(!event)
  return res.sendStatus(200).end()
console.log("event=>",event)
  if (event.type === 'message') {
    const message = event.message;
    if (message.type === 'text' ) {
      if(message.text === 'รายละเอียด'){
        client.replyMessage({
        replyToken: event.replyToken,
        messages: [{
          type: 'text',
          text: 'เว็ปของเราขายแผ่นเสียงอัลบั้มเพลง สามารถเลือกซื้อที่เว็ปไซต์ของเรา หลังทำการสั่งซื้อทางเราจะส่งใบเสร็จมาให้ที่ห้องแชทนี้',
        }]
      });
      }else if(message.text === 'โปรโมชั่น'){
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
  return res.sendStatus(200).end()
})








app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});


const flexMessage =  [
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
                          "uri":  "https://www.youtube.com/playlist?list=PLINj2JJM1jxNeeZ9lih8SNd_NJEkA22u0"
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
                          "uri":  "https://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH?si=d6ABPuPnRcK5k4pYd0Y0IQ"
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
]