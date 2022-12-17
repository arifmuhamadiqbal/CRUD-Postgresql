# CRUD-Postgresql

Created by Group 7 Manajemen Basis Data A

Member :
- Arif Muhamad Iqbal
- Alif Pandanhi Febrio
- Dani Ali Kinan

## Introduction

Web ini adalah web untuk mengelola data siswa seperti menambah, memperbarui, dan menghapus data siswa

Language :
- EJS & Bootstrap (frontend)
- NodeJS express (backend)
- Postgresql (database)

## Let's Started

Required Software :
- Docker (Container Configuration)
- Visual Studio Code (Text editor)
- pgAdmin (Database Configuration)
- Google Chrome (Preview Web)

### Setup Docker

Pull Postgresql image di docker hub
```
docker pull postgres
```
Buat container di docker
```
docker run --name (nama container) -e POSTGRES_USER=(username) -e POSTGRES_PASSWORD=(password) -p (port untuk dipakai diluar docker):5432 -d postgres
```
Contoh :
```
docker run --name postgresql-tes -e POSTGRES_USER=iniadmin -e POSTGRES_PASSWORD=inipassword -p 5000:5432 -d postgres
```

### Setup Database Use pgAdmin

Buka pgAdmin kemudian buat koneksi dengan cara klik Add New Server

![image](https://user-images.githubusercontent.com/114379198/208257392-7fae7929-d907-4ad1-93cc-6326553e3f42.png)

Kemudian isi nama server

![image](https://user-images.githubusercontent.com/114379198/208257455-17589643-314e-4210-8a25-3f1851fd0334.png)

Setelah itu klik bagian connection lalu isi bagian bagian "Hostname/address", "Port", "Username", dan "Password" sesuai dengan konfigurasi postgres yang sudah dibuat sebelumnya di docker

![image](https://user-images.githubusercontent.com/114379198/208257917-18db157f-3506-4bdf-9fcc-14ee09613bd6.png)

Selanjutnya buatlah Schema dan Table di dalam database sesuai dengan kebutuhan

![image](https://user-images.githubusercontent.com/114379198/208258242-49d515cd-8238-45f2-86e3-8f2c67978a1c.png)

### How to Connect to Database

Required npm :
- express
- cors
- ejs
- pg
- body-parser
- json

Install all manual :
```js
npm i express cors ejs pg body-parser json 
```

Auto install all when you pull this project :
```js
npm i
```

Create connection :
```js
const express = require("express);
const cors = require("cors");
const Pool = require("pg").Pool;
const app = express();
const { json } = require("express")

app.use(express.json());
app.use(cors());

const pool = new Pool({
host: "(Your postgres host)",
port: "(Your postgres port)",
user: "(Your postgres username)",
password: "(Your postgres password)",
database: "(Your postgres database)",
});

app.listen(3000);
```

Jika program berjalan maka artinya database sudah terkoneksi dengan backend, jika belum maka periksalah errornya

## References & Links :

https://hub.docker.com/_/postgres

https://www.postgresqltutorial.com/postgresql-tutorial

https://www.pgadmin.org



