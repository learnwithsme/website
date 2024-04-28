This folder is where the courses and lessons are stored.

All lessons are stored as Markdown files. These are just plain text files, no need for a dedicated program to access them.

## Folder structure
```
├── SUBJECT1
│   ├── index.mdx
│   ├── lesson1.mdx
│   └── lesson2.mdx
|   ...
├── SUBJECT2
│   ├── index.mdx
│   ├── lesson1.mdx
│   └── lesson2.mdx
|   ...
...
```

Each subject has its own folder. The folder name should be the subject ID, all caps.

Each subject must have a `index.mdx`. This is shown at the subject's main page. Add information about the subject here. The file can be empty.

## Lessons
Lessons are placed as `.mdx` files. The filename represents the URL path of the lesson. Examle: "lesson1.mdx" in "SUBJECT1" will have the URL "learnwithsme.github.io/SUBJECT1/lesson1".

Each `.mdx` file MUST have these at the very top (called *frontmatter*):
```
---
title: TITLE
datePublished: YYYY-MM-DD
dateUpdated: 
category: CATEGORY
author: YYYY-MM-DD
  - AUTHOR 1
  - AUTHOR 2
checker: 
  - CHECKER 1
  - CHECKER 2
---
```

| Key | Description |
| --- | --- |
| title | The title of the lesson. |
| datePublished | Date published. YYYY-MM-DD format. |
| dateUpdated | *(Optional, leave blank if so)* Date updated. YYYY-MM-DD format. |
| category | *(Optional, leave blank if so)* The category of the lesson. If left blank, it will get categorized in the "Additional" category.
| author | The author(s) of the lesson.
| checker | The person(s) who checked the lesson before publishing.


## Markdown quick reference 
These are the supported formatting options for use on the `.mdx` files.

| Syntax | Output | Notes
| --- | --- | --- |
| `_italics_`<br/>`*italics*` | _italics_ |
| `__bold__`<br/>`**bold**` | **bold** |
| `## Heading 2`<br/>`### Heading 3`<br/>`#### Heading 4`<br/>`##### Heading 5`<br/>`###### Heading 6`<br/> | <h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><h5>Heading 5</h5><h6>Heading 6</h6> |
| `~~strikethrough~~` | ~~strikethrough~~ |
| `> Quote` | <blockquote> Quote</blockquote> |
| `[link](www.example.com)` | [link](www.example.com) | To insert images, put the URL of the image. |
| <pre>* list 1 <br/>  * nested<br/>* list 2<br/>* list 3</pre> | <ul><li>list 1</li><ul><li>nested</li></ul></li><li>list 2</li><li>list 3</li></ul> |
| <pre>1. list 1 <br/>2. list 2<br/>3. list 3</pre> | <ol><li>list 1</li><li>list 2</li><li>list 3</li></ol> |
| <pre>\| A \| B \| C \|<br/>\| -- \| -- \| -- \|<br/>\| 1 \| 2 \| 3 \|<br/>\| 4 \| 5 \| 6 \| </pre> | <table><tr><th>A</th><th>B</th><th>C</th></tr><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>5</td><td>6</td></tr></table> |
| \`text\` | `text` |
| Area of circle is $ \frac{bh}{2} $. <br/><br/>Integral of sine: <br/> $$ \int \sin u \space du=-\cos u+C $$ | Area of circle is  $` \pi r^2 `$.<br/><br/>  Integral of sine: <br/> $$\int \sin u \space du=-\cos u+C$$| Uses LaTeX syntax.<br/> List of supported functions [here.](https://katex.org/docs/supported.html) <br/> Test your syntax [here.](https://katex.org/#demo) |q
| `---` | <hr/> |
| <pre>\`video:https://www.youtube.com/watch?v=dQw4w9WgXcQ\`</pre> | *actual video here* | The actual video will be embedded. Supports YouTube, Vimeo, Twitch.
| <pre>\<!-- comment --></pre> | | Comments will not be displayed.
| <pre>- [x] Task 1<br/>- [ ] Task 2<br/>- [ ] Task 3</pre> | *task list* | A task with unselectable checkboxes. 
| <pre>\`\`\`<br/>print("helloworld");<br/>var bestOrg = "SME";<br/>\`\`\`</pre> | <pre>print("helloworld");<br/>var bestOrg = "SME";</pre>

Embedding other webpages is also possible. Just paste the code from whatever website supports embedding (eg. Google Docs, GeoGebra, Facebook, Twitter, etc.).

Advanced scripting stuff are also possible. (TODO: add more docs about this)