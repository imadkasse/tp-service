const express = require('express')

const app = express()

// زيد هنا أو شوف شات جيبيتي باش يضيفلك أمثلة 
// هذي خاصة ب Rest 
app.post("/", (req, res) => {
  res.status(200).json({
    msg: "good",
  });
});

app.get('/',(req,res)=>{
    res.status(200).json({
        msg:"good"
    })
})

app.listen('3000',()=>{
    console.log('server running in port 3000')
})

// متنساش باش تهبط و تنسطالي Node js 
// باتشغل مشروع rest دير => npm run start:rest 
