# Photos

Put Anshika's photos in this folder, then point to them in `lib/birthday-content.ts`.

1. Copy your photos here, e.g. `photo-01.jpg`, `photo-02.jpg` ...
   (the default names are `photo-01.jpg` to `photo-06.jpg`, so if you use those names you change nothing else).
2. Open `lib/birthday-content.ts` and find `scrapbook.memories`.
3. For each memory set `image`, `caption`, `date` (optional), `description` (optional) and `alt` (a short description of the photo).
4. To add a sixth photo, copy one memory block and give it a new `id`.

If a file is missing, the site automatically shows a pastel "Our photo goes here" placeholder.

Tips: use JPG or WebP, around 1200 px on the long side, under about 400 KB each so the page stays fast on phones.
