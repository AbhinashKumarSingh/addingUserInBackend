const express=require("express");
const db=require("../db/conn.js");
//const popup=require("popups")

const router=express.Router();
router.get("/",(req,res)=>{
        res.send("hy");
})
router.post("/add",(req,res)=>{
        const {fname,mname,lname,dob,gender,basicSalary,allowance,deduction}=req.body;
    
         if(!fname || !mname || !lname || !dob || !gender || !basicSalary || !allowance || !deduction)
       {
            res.status(401).send({
            message:"Plz afill all fields"
            });
       }
        else{
            const curr=new Date();
            const date=new Date(dob)

            const yy=curr.getFullYear()-date.getFullYear();
            const mm=curr.getMonth()-date.getMonth();
            const dd=curr.getDate()-date.getDate()

            if(yy<18 ||(yy===18 && mm<0) || (yy===18 && mm===0 && dd<0))
          {
             
          res.send("You are underage")
          }
            else{
    
              const basicSalary1 = parseInt(basicSalary, 10)
                const  allowance1=parseInt(allowance, 10);
                  const deduction1=parseInt(deduction, 10)
                const netSalary=basicSalary1+allowance1-deduction1;
               console.log(netSalary)
                  const config=`INSERT INTO emp (fname,mname,lname,dob,gender,basicSalary,allowance,deduction,netSalary) VALUES ('${fname}','${mname}','${lname}','${dob}','${gender}','${basicSalary}','${allowance}','${deduction}','${netSalary}')`;
                 db.query(config,(error,result)=>{
                   if(error) throw error;
                      res.send(result);
                   console.log("1 data inserted")
             })
            }
              }

   
             })


            router.post("/update",(req,res)=>{

               const {id,fname,mname,lname,dob,gender,basicSalary,allowance,deduction}=req.body;
    //console.log(id,fname,mname,lname,dob,gender,basicSalary,allowance,deduction)
                 if(!id ||!fname || !mname || !lname || !dob || !gender || !basicSalary || !allowance || !deduction)
             {
                res.status(401).send({
                  message:"Plz afill all fields"
              });
             }
                else{
                  const curr=new Date();
                  const date=new Date(dob)

                 const yy=curr.getFullYear()-date.getFullYear();
                 const mm=curr.getMonth()-date.getMonth();
                     const dd=curr.getDate()-date.getDate()

                if(yy<18 ||(yy===18 && mm<0) || (yy===18 && mm===0 && dd<0))
                 {
  
         res.send({
                   message:"You are underage"
                 })
              }
           else{
  
      
    
             const basicSalary1 = parseInt(basicSalary, 10)
             const  allowance1=parseInt(allowance, 10);
               const deduction1=parseInt(deduction, 10)
              const netSalary=basicSalary1+allowance1-deduction1;
                console.log(netSalary)
                 const config=`UPDATE emp SET fname=?,mname=?,lname=?,dob=?,gender=?,basicSalary=?,allowance=?,deduction=?,netSalary=? WHERE EmpId=?`
            db.query(config,[fname,mname,lname,dob,gender,basicSalary,allowance,deduction,netSalary,id],(error,result)=>{
               if(error) throw error;
                     res.send(result);
                console.log("1 row updated")
                })
        
              }
             }

    
                   })

    



             router.post("/delete",(req,res)=>{
                         const id=req.body.id;
                         const config=`DELETE FROM emp WHERE EmpId=?`
                       db.query(config,[id],(error,result)=>{
                         if(error) throw error;
                          res.send(result);
                        console.log("1 row deleted")
                      })
                           })
module.exports =router;