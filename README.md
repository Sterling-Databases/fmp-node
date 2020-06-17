# fmp-node
FileMaker Data API class for node.js

containers, globals, and scripts not done yet - 2020-06-13 - JM

FMP Data API Docs: https://fmhelp.filemaker.com/docs/18/en/dataapi/


create a .env file with these paramaters (change the values to yours):

    FMP_USERNAME='john.morris'
    FMP_PASSWORD='myP@$$w0rd'
    FMP_HOST='https://domainname.com'
    FMP_DATABASE='MyFileMakerDatabaseName'

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
-  EXAMPLES:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Add record (full example):

    const {FmpDataApi} = require('fmp-node');

    const fmp =  new FmpDataApi();

    await fmp.login();

    fmp.setLayout('contacts');

    const data = {
        fieldData:{
            'firstName':'John',
            'lastName':'Morris'
        }
    };

    const resultAdd = await fmp.addRecord(data);

    await fmp.logout();
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Database Login:

    await fmp.login();
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Database Logout:

    const fmpToken = '1b0028dbdd25f42c810e4a8ed314ab1066fca82fdf337f59c51c';
    await fmp.logout(fmpToken);
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Set/Change layout:

    fmp.setLayout('Layout Name');
    
    This can also be chained:
    await fmp.setLayout('products').findAllRecords();

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Get record by internal id:

    const fmpId = '3';
    await fmp.getRecord(fmpId);
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Find all records:

    await fmp.findAllRecords();

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Finds:

    const findReqObj = {
        query:[{firstName:'=="John"'}]
    };
    await fmp.findRecords(findReqObj);
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Duplicate record by internal id:

    const fmpId = '3';
    await fmp.duplicateRecord(fmpId)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Edit record by internal id:

    const fmpId = '3';
    const recordData = {
        fieldData:{
            'firstName':'John',
            'lastName':'Morris'
        }
    };
    await fmp.editRecord(fmpId, recordData);
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Delete record by internal id:

    await fmp.deleteRecord(fmpId);
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Get data api info:

    await fmp.productInfo();
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Get Database names:

    await fmp.databaseNames();
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Get layout names

    await fmp.layoutNames();
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Get script names

    await fmp.scriptNames();
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Get layout details (ie: value lists)

    await fmp.layoutDetails();
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


