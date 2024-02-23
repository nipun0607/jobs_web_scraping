const axios=require("axios");
const cheerio=require('cheerio');
const xlsx = require('xlsx');
let jobs=[];


const getDataForJob=async()=>{
    try{
        const response=await axios.get(
"https://www.quikr.com/jobs/job+zwqxj1519612219",
            {
                headers:{
                    'Content-Type':"text/html"
                }
            }
        );

    const data=response.data;
    const $ = cheerio.load(data);
    const jobContainer=$('.job-card.apply-block.adImpression-click-event.adImpression-event-class1')
    // console.log(jobContainer);
    $(jobContainer).each((i,e)=>{
        let jobTitle= $(e).find(".categories").text();
        let companyName=$(e).find(".attributeVal.cursor-default.light-gray").text();
        let city= $(e).find(".city").text();
        let jobType= $(e).find(".attributeVal").text();
        const postedBy=$(e).find(".sc-dxhf6u-0.eqAcoP.sc-11567zh-4.ftbJiO").text();
        // let experience= $(e).find(".inlineBlock.lineH.mlAuto.light-gray").text();
        // console.log(title);
        jobs.push({jobTitle,city,companyName,jobType,postedBy})
        // console.log(jobTitle);
        // console.log(companyName);  
        // console.log(city);
        // console.log(jobType);
        // console.log(postedBy);
    })

    console.log(jobs);


    const workbook=xlsx.utils.book_new();
    // add the data in the workbook 
    const sheetData = [
        ["JobTitle", "City","CompanyName","Salaray,JobType",],
        ...jobs.map((job) => [job.jobTitle,job.city,job.companyName,job.jobType]),
      ];

      const workSheet = xlsx.utils.aoa_to_sheet(sheetData);
      // append the data in the workbook 
      xlsx.utils.book_append_sheet(workbook, workSheet, 'Sheet1');

      xlsx.writeFile(workbook, 'output.xlsx');
      console.log('XLSX file created successfully!');
          
            
    }
    catch(err){
        console.log(err);
    }
}

getDataForJob()