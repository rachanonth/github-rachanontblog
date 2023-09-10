---
external: false
draft: false
title: Getting Started with Astro
description: how to set up my blog using Astro
date: 2023-09-10
---

หลังจากลองเขียน blog ที่ medium มาเกือบ 1 ปี ปรากฎว่าแทบไม่ค่อยได้เขียนอะไรเลย เพราะมันช้า กับหน้าตาไม่ถูกใจ แต่ที่เลือกใช้เพราะดีตรงที่เราไม่ต้องบริหารจัดการมากเหมือนกับ wordpress ที่ต้องคอยอัพเดตตลอด

โดยก่อนหน้านี้ก็ได้ไปลองใช้ Static Site Generators อย่าง [Gatsby](https://www.gatsbyjs.com/) กับ [Jekyll](https://jekyllrb.com/) มาบ้างแต่ก็ยังไม่ถูกใจอยู่ดี แต่ไม่กี่วันมานี้ได้รู้จักกับ [Astro](https://astro.build/) Static Site Generators ที่คนใช้กันเยอะพอดู[ผ่านโพสนี้ของคุณเม่น](https://www.facebook.com/chakkrisn/posts/pfbid0GReVT8BYY8GgqfRuKj8WqTVdpp73JoxpELVaAZfJjS8C5zYChi9LaDLc3X9HhrNol) เลยไปลองศึกษาดู ก็พบว่าเร็วแบบสุดๆ มีจังหวะโหลดเวลาเปลี่ยนหน้าแค่แวบเดียว แถมติดตั้งไม่ยาก โดยผมใช้ท่านี้

1. fork [example blog](https://github.com/withastro/astro/tree/latest/examples/blog?on=github) บน github
2. สร้าง workspace ใหม่บน [gitpod](https://gitpod.io/new) แล้วก็เลือก repo ที่ fork มา
3. ลอง run ดูว่าหน้าบล็อกขึ้นมาเรียบร้อย ได้ลองตั้งค่า ได้เขียนบล็อกหน่อยนึง ปรากฎว่าหน้าตาไม่ถูกใจ เลยต้องหา theme ใหม่
4. ผมเลือก theme [Bubblegum](https://github.com/flexdinesh/blogster/tree/main/templates/bubblegum) ซึ่งติดตั้งโดยรันคำสั่ง 
```
npx create-blogster@latest --theme bubblegum
```
5. จากนั้นก็แก้ไฟล์หน้าแรกที่ src>components>Intro.astro
6. เริ่มบล็อกโดยวางไฟล์บล็อกที่เขียนเป็นไฟล์ markdown (.md) ที่ folder content/blog กับลิ้งค์ project ที่ content/project
7. พอรันดูว่าบล็อกขึ้นได้ถูกต้องก็ commit project ไปที่ GitHub
8. add new project ที่ vercel เลือก import repo ที่สร้างไว้ เลือก build เป็น Astro รอสักครู่ vercel จะ build blog ขึ้น subdomain ให้เรียบร้อยเลย จากนี้ไปเราแค่ commit update ไปที่ GitHub vercel จะ build ให้เราแทบจะทันที
9. add domain name รอสักพักนึง โดเมนก็จะชี้มาที่บล็อกใหม่ เป็นอันเรียบร้อย

พอ config เข้าที่แล้ว เวลาเขียนบล็อกผมก็ใช้ [typora](https://typora.io/) เขียนบล็อก แล้วก็ commit เป็นอันเรียบร้อย gitpod เอาไว้ใช้เวลาจะแก้โค้ดพอ
