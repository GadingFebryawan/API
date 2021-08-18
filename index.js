//memanggil modul
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
//setting database
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sekolah'
});
//konek ke database
conn.connect((err) => {
    if(err) throw err;
    console.log('Berhasil Terkoneksi ke Database');
});

const app = express();
//agar tidak muncul error undefined
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//mendapatkan semua data
app.get('/file',(req, res) => {
    let sql = "SELECT * FROM data" ;
    let query = conn.query (sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});
//mendapatkan data by id
app.get('/filebyid/:murid_id',(req, res) =>{
    const id = req.params.murid_id;
    let sql = "SELECT * FROM data WHERE murid_id = "+ id;
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
      });
});
//memasukan data
app.post('/simpan',(req,res) => {
    let identitas = {murid_nama: req.body.murid_nama, murid_kelas: req.body.murid_kelas};
    let sql = 'INSERT INTO data SET ?'
    let query = conn.query (sql, identitas,(err, results) => {
        if(err) throw err;
        res.json(results);
    });
});
//mengedit data
app.put('/perbarui',(req,res) => {
    let sql = 'UPDATE data SET murid_nama="'+req.body.murid_nama+'", murid_kelas="'+req.body.murid_kelas+'"WHERE murid_id='+req.body.murid_id;
    let query = conn.query(sql, (err,results) => {
        if(err) throw err;
        res.json(results);
    });
});
//menghapus data
app.delete('/hapus',(req, res) => {
    let sql = 'DELETE FROM data WHERE murid_id='+req.body.murid_id;
    let query = conn.query(sql, (err,results) => {
        if(err) throw err;
        res.json(results);
    });
});
//portserver
app.listen(5000, () => {
    console.log('Langsung klik link http://localhost:5000')
});