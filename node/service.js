/**
 * Created on 2017/07/27
 * Created by linSir
 * description 用来处理一些业务上的逻辑
 */

var mysql = require('mysql');


exports.select_all_api = function(){

    return new Promise(function(resolve,reject){

        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            port: '3306',
            database: 'db_easy_note_and_mock_api'
        });

        connection.query("select * from api",
            function selectDB(err,results){
                if(err){
                    return;
                }

                
                resolve(results);
        })

    }).then(function(results){

        
        return results;
        
    });


};