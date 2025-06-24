---
title: 'Smooth Code, Failed Deploy: My Astro Update Story with Cursor AI
description: 'My Astro update with Cursor AI was a breeze... until the Vercel deploy failed. Discover the one simple setting I missed and how an AI pair-programmer saved the day.'
pubDate: '2025-06-24' # Use YYYY-MM-DD format
updatedDate: '' # Optional: for post updates
tags: ['astro', 'blogging', 'easy']
draft: false # Set to false when you are ready to publish
---

สวัสดีครับ! ได้เวลากลับมาปัดฝุ่นบล็อก rachanont.com ที่สร้างด้วย Astro กันอีกครั้ง เลยตั้งใจจะอัปเดตเวอร์ชันซะหน่อยครับ รอบนี้ขอไม่ทำแบบเดิมๆ แต่จะลองใช้ "Cursor AI" มาเป็นผู้ช่วยดู อยากรู้เหมือนกันว่าจะเจ๋งจริงสมคำร่ำลือไหม

ผมเปิดโปรเจกต์ขึ้นมาแล้วก็สั่ง Cursor ไปตรงๆ เลยว่า "migrate this astro blog to current version " เค้าก็แจ้งว่ามีอะไรต้องทำบ้าง แล้วให้เรายืนยันอีกทีว่าจะทำเลย มั้ย ก็จัดไปเลยสิ

พอกดรันคำสั่งไป ทุกอย่างก็ดูราบรื่นดีครับ ลองรันบนเครื่องตัวเองเว็บก็ขึ้นปกติไม่มีปัญหาอะไรเลย 

ด้วยความมั่นใจ ผมก็ push โค้ดขึ้น GitHub ทันที แล้วก็นั่งรอ Vercel ที่เชื่อมต่อไว้ deploy อัตโนมัติ แต่รอแล้วรอเล่า... build failed จ้า! ตอนแรกก็งงเลย เพราะบนเครื่องเรารันได้ปกติแท้ๆ

ผมเลยย้อนกลับมาที่ Cursor อีกรอบ คราวนี้ผมก๊อบปี้ log ที่ล่มจาก Vercel มาแปะในช่องแชททั้งหมด ให้เค้าดู

นี่แหละครับคือจุดพีค! Cursor วิเคราะห์ log แล้วบอกผมทันทีว่า "ดูเหมือนเวอร์ชันของ Astro ที่คุณอัปเดตมา ต้องการ Node.js v20 นะ แต่โปรเจกต์บน Vercel ของคุณยังตั้งค่าให้ใช้ v18 อยู่"

ใช่เลย! ผมลืมไปสนิทว่าต้องไปแก้เวอร์ชันของ Node.js ในหน้าตั้งค่าของ Vercel ด้วย Cursor ไม่ใช่แค่บอกปัญหา แต่ยังบอกวิธีแก้ที่ตรงจุดสุดๆ คือให้ไปที่ Project Settings > General แล้วเปลี่ยน Node.js Version

พอผมเข้าไปแก้ตามที่มันบอกแล้วกด deploy ใหม่อีกครั้ง... ผ่านฉลุย! เว็บของผมกลับมาออนไลน์บน Astro เวอร์ชันล่าสุดได้สำเร็จ

สรุปคือ Cursor AI ช่วยให้การอัปเดตโค้ดบนเครื่องผมเร็วขึ้นจริงๆ ครับ แต่มันโชว์ความเทพสุดๆ ตอนช่วยดีบั๊กปัญหาการ deploy ที่มองข้ามไปนี่แหละ มันเหมือนมีเพื่อนเก่งๆ มาช่วยชี้จุดที่เราพลาดไปจริงๆ