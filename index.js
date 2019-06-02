const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(function(){

    

    db.run("CREATE TABLE Classroom (Building, Room_number, Capacity)");

    db.run("INSERT INTO Classroom VALUES('Packard', 101, 500)");
    db.run("INSERT INTO Classroom VALUES('Painter', 514, 10)");
    db.run("INSERT INTO Classroom VALUES('Taylor', 3128, 70)");
    db.run("INSERT INTO Classroom VALUES('Watson', 100, 30)");
    db.run("INSERT INTO Classroom VALUES('Watson', 120, 50)");



    
    db.run("CREATE TABLE Department (Dept_name, Building, Budget)");

    db.run("INSERT INTO Department VALUES('Biology', 'Watson', 90000)");
    db.run("INSERT INTO Department VALUES('Comp. Sci.', 'Taylor', 100000)");
    db.run("INSERT INTO Department VALUES('Elec. Eng.', 'Taylor', 85000)");
    db.run("INSERT INTO Department VALUES('Finance', 'Painter', 120000)");
    db.run("INSERT INTO Department VALUES('History', 'Painter', 50000)");
    db.run("INSERT INTO Department VALUES('Music', 'Packard', 80000)");
    db.run("INSERT INTO Department VALUES('Physics', 'Watson', 70000)");


    
    
    db.each("SELECT Room_number, Building FROM Classroom WHERE Capacity > 50",function(err,row){
        console.log(row);
    });

 
    db.all("SELECT Dept_name FROM Department WHERE Budget > 85000", [], function(err,rows) {
        
        rows.forEach(row => {
            console.log(row.Dept_name);
        })
        console.log("\n");
    });

   

    let totalCapacity = {};

    db.each("SELECT * FROM Department NATURAL JOIN Classroom",function(err,row){

        if (totalCapacity[row.Dept_name] == undefined)
            totalCapacity[row.Dept_name] = 0;
        totalCapacity[row.Dept_name] += row.Capacity;
    },function(err,row) {

        let keys = Object.keys(totalCapacity);
        for(let i=0; i !=keys.length; ++i){
            console.log(keys[i] + ":" + totalCapacity[keys[i]]);
        }
    });
});