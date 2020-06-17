# fmp-node
FileMaker Data API class for node.js

containers, globals, and scripts not done yet - 2020-06-13 - JM

FMP Data API Docs: https://fmhelp.filemaker.com/docs/18/en/dataapi/


create a .env file with these paramaters:

    FMP_USERNAME='john.morris'
    FMP_PASSWORD='myP@$$w0rd'
    FMP_HOST='https://domainname.com'
    FMP_DATABASE='MyFileMakerDatabaseName'


   EXAMPLES:

    const {FmpDataApi} = require('fmp-node');

    const fmp =  new FmpDataApi();
    
    await fmp.login();

    fmp.setLayout('contacts')

    const data = {
        fieldData:{
            'firstName':'John',
            'lastName':'Morris'
        }
    }

    const resultAdd = await fmp.addRecord(data);

    await fmp.logout();

