# Session01

  

## python 3.10.0 >=

پایتون رو نصب کنید تا از ابزاری که براتون نوشتم بتونید استفاده کنید

  

## Ejs 3.1.10 >=

یک تولید کننده اچ تی ام ال هست که کار مارو راحت تر میکنه مخصوصا برای مواردی مثل هدر و فوتر که باید همه جا یکسان باشن ، و از کپی پیست کردن مارو نجات میده .

  

`npm install -g ejs`

  
  

## Ejs Language Support extension for vscode

این افزونه رو تو وی اس کد نصب کنید

  
  

# تنظیم ابزاری که براتون ساختم

  

برید توی فایل Run.py و فایل رو که باز کنید اولش اینا رو میبینید :

  

```python

# Tailwind configurations

Tail_input_file = "./src/styles/index.css"

Tail_output_file = "./build/styles/index.css"

  

# TypeScript configurations

TSC_input_file = "./src/ts/index.ts"

TSC_output_directory = "./build/js"

  

# Ejs configurations

Ejs_input_directory = "./src/pages"

Ejs_input_file = "./src/pages/index.ejs"

Ejs_output_file = "./build/index.html"

Ejs_interval = 0.1

```

  

#### جوری که باید تنظیمش کنید

  

متغیر Tail_input_file : توی این متغیر بین اینا "" باید آدرس فایل ورودی سی اس اس تیلویند رو بدید .

  

متغیر Tail_output_file : توی این متغیر هم مثل بالایی باید آدرس فایی که قراره به وجود بیاد رو بدید .

  

متغیر TSC_input_file : آدرس فایل ورودی تایپ اسکریپت یا همون فایلی که در حال حاضر داریم روش کار میکنیم .

  

متغیر TSC_output_directory : اینجا دقت کنید باید ***آدرس پوشه*** ایی که میخواین فایل تایپ اسکریپت تولید

شه رو بدید ، آدرس فایل اگه بدید خطا میده .

  

متغیر Ejs_input_directory : آدرس پوشه فایل های EJSمون که داریم روش کار میکنیم ، همه فایل های EJS توش رو نظارت میکنه ، و هرکدوم که تغییر کرد دوباره فایل اصلی EJSمون رو رندر میگیره .

  

متغیر Ejs_input_file : آدرس فایل ورودی EJSمون که داریم روش کار میکنیم ، توی این جلسه میشه index.ejs .

  

متغیر Ejs_output_file : آدرس فایل خروجی که به صورت HTML باید از فایل EJSمون تولید شه .

  

متغیر Ejs_interval : این رو زیاد دستکاری نکنید ، این یک عدد اعشاری یا عدد صحیح باید باشه و مال تیکه کدیه که نوشتم ، مدت زمانیه که هی باید فایل EJS مارو چک بکنه تا ببینه تغییر کرده یا نه تا HTML تولید کنه برامون.

  

# راه اندازی پروژه با یک خط :)

  

با این ابزاری که براتون ساختم فقط کافیه پوشه ی پروژه رو با وی اس کد باز کنید و یک ترمینال باز کنید و بنویسید :

  

```terminal

python Run.py

```

  
  

این یک خط کد همه کار هارو براتون خودکار انجام میده :) .

  

# تنظیم وی اس کد برای این پروژه

  

یک پوشه توی پروژتون بسازید جوری که کنار پوشه ی src باشه . اسمشم این باید باشه

```
.vscode
```

توش هم ی فایل بسازید به نام 

```
settings.json
```

محتوای این پوشه رو این بزارید

```json
{

    "files.associations": {

        "*.css": "tail windcss"

    },

    "liveServer.settings.root": "/build",

    "path-autocomplete.pathMappings": {

        "/": "${workdir}\\build"

    },

    "path-intellisense.mappings": {

        "/": "${workdir}\\build"

    }

}
```

به جای workdir باید آدرس کامل پوشه ی پروژتون باشه ، یعنی اون رو برمیدارید و به جاش ی همچین چیزی میزارید :

```
"D:/your folder/project/build"
```

