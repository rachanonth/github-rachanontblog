---
external: false
draft: true
title: Getting Started with Astro
description: how to set up my blog using Astro
date: 2023-09-08
---

หลังจากลองเขียน blog ที่ medium มาเกือบ 1 ปี ปรากฎว่าแทบไม่ค่อยได้เขียนอะไรเลย แต่ที่เลือกใช้เพราะดีตรงที่เราไม่ต้องบริหารจัดการอะไรต่างกับใช้ wordpress บน server ของตัวเอง ซึ่งก่อนหน้านี้ก็ได้ไปลองใช้ Static Site Generators อย่าง Gatsby กับ Jekyll มาบ้างแต่ก็ยังไม่ถูกใจเหมือนกัน

ประจวบเหมาะได้รู้จักกับ [Astro] (https://astro.build/) Static Site Generators ที่คนใช้กันเยอะพอดู[ผ่านโพสนี้ของคุณเม่น](https://www.facebook.com/chakkrisn/posts/pfbid0GReVT8BYY8GgqfRuKj8WqTVdpp73JoxpELVaAZfJjS8C5zYChi9LaDLc3X9HhrNol) เลยไปลองศึกษาดู ก็พบว่าเร็วแบบสุดๆ มีจังหวะโหลดเวลาเปลี่ยนหน้าแค่แวบเดียว แถมติดตั้งไม่ยาก โดยผมใช้ท่านี้

1. fork [example blog](https://github.com/withastro/astro/tree/latest/examples/blog?on=github) บน github
2. สร้าง workspace ใหม่บน [gitpod](https://gitpod.io/new) แล้วก็เลือก repo ที่ fork มา
3. ลอง run ดูว่าหน้าบล็อกขึ้นมาเรียบร้อย ได้ลองตั้งค่า ได้เขียนบล็อกหน่อยนึง ปรากฎว่าหน้าตาไม่ถูกใจ เลยต้องหา theme ใหม่
4. ผมเลือก theme [Bubblegum](https://github.com/flexdinesh/blogster/tree/main/templates/bubblegum) ซึ่งติดตั้งโดยรันคำสั่ง 
    npx create-blogster@latest --theme bubblegum

5. จากนั้นก็แก้ไฟล์หน้าแรกที่ src>components>Intro.astro

