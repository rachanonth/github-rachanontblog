---
external: false
draft: false
title: Emojilist
description: how to create a webpage with emojis and a copy button
date: 2023-09-15
---

![ฺEmojiList](/images/emojilistss.png)

ด้วยความที่อยากได้อะไรมาเน้นโน้ตกับแต่งโน้ตเล็กน้อยบน goodnote ซึ่งก็หนีไม่พ้นการใช้ emoji มาแต่ง แต่ด้วยความที่ emoji keyboard ไม่ตอบโจทย์ตัวเอง กับการเปิดจากเว็บรวม emoji หน้าเว็บก็โหลดเยอะมาก โฆษณาเต็มไปหมด ก็เลยทำหน้ารวม emoji ไว้ใช้เอง พร้อมปุ่ม copy

โดยผมเขียนเป็น component บน react ส่วนหน้าตาก็ไม่ต้องแต่งอะไร เน้นใช้งาน เวลาใช้ก็เปิดเป็น slide over บน goodnote จากนั้นก็ copy paste ได้เลย ประหยัดเวลาไปเยอะ ส่วน code ก็ตามนี้ครับ

```jsx
import React, { useState } from 'react';

const EmojiList = () => {
  const emojis = [
    '❶ ',
    '❷',
    '❸',
    '❹',
    '❺',
    '❻',
    '❼',
    '❽',
    '❾',
    '⓿',
    '🏛️',
    '🚧',
    '⚠️',
    '⛔',
    '📕',
    '🌟',
    '✔️',
    '✅',
    '❌',
    '🎖️',
    '🔖',
    '📌',
    '📆',
  ];
  const [copiedEmoji, setCopiedEmoji] = useState('');

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
  };

  // Calculate the midpoint index to split emojis into two columns
  const midpoint = Math.ceil(emojis.length / 2);

  return (
    <div>
      <h1>Emoji List</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div>
          {emojis.slice(0, midpoint).map((emoji, index) => (
            <div key={index}>
              <span>{emoji}</span>
              <button onClick={() => copyEmoji(emoji)}>Copy</button>
            </div>
          ))}
        </div>
        <div>
          {emojis.slice(midpoint).map((emoji, index) => (
            <div key={index}>
              <span>{emoji}</span>
              <button onClick={() => copyEmoji(emoji)}>Copy</button>
            </div>
          ))}
        </div>
      </div>
      {copiedEmoji && <p>Copied: {copiedEmoji}</p>}
    </div>
  );
};

export default EmojiList;
```
