//import uuid from 'uuid'

const uuid = require('uuid')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/test', (req, res) => res.render('pages/index'))
  .get('/', (req, res) =>{
    const boxSDK = require('box-node-sdk');  // Box SDK
    const fs = require('fs');                // File system for config
    const FILENAME = "config.json";
    // Fetch config file for instantiating SDK instance
    const configJSON = JSON.parse(fs.readFileSync(FILENAME));

    // Instantiate instance of SDK using generated JSON config
     const sdk = boxSDK.getPreconfiguredInstance(configJSON);

     var serviceAccountClient = sdk.getAppAuthClient('enterprise');

     // Set app user details
     const userName = 'APP USER '+ uuid.v4();
     const spaceAmount = 1073741824;
     let userId;

    // Create app user
    serviceAccountClient.enterprise.addAppUser(
       userName, 
     {
        space_amount: spaceAmount
      },
  callback
);

function callback(err, userres) {
  if (!err) 
  {  
     let folderId;
     userId = userres.id;
     console.log(`App user ${userres.id} is created successful`);

     var appUserClient = sdk.getAppAuthClient('user', userId);

     // Set folder values
    const folderName = 'FOLDER NAME 1'+ uuid.v4() ;
    //const folderId = uuid.v4();

     // Create folder
     appUserClient.folders.create('0', folderName, (err, folderres) => {
       folderId = folderres.id;
      console.log(`folder ${folderres.id} is created successful`);
      // HANDLE ERROR CASE AND RESPONSE
      // Set upload values
      const fileName = 'test.txt';

      // Create file upload stream
      const stream = fs.createReadStream(fileName);

       // Upload file
       appUserClient.files.uploadFile(
           folderId, 
          fileName, 
           stream, 
           callback);

function callback(err, response) {
  
  console.log(`upload file`);
  res.send('upload file successful');
}
     });

    /* serviceAccountClient.folders.create('0', folderName, (err, res) => {
      console.log(`create folder`);
     });*/
     
  }
}

/*let session = box.getPreconfiguredInstance(configFile);

// Don't be thrown off by the method name:
// This method works with Managed Users and App Users if you have the correct scopes on your application.
session.getAppUserTokens(userId)
    .then((userTokenObject) => {
        console.log(userTokenObject.accessToken);
    }); */
  })
  .get('/webhook', (req, res) =>{

    const boxSDK = require('box-node-sdk');  // Box SDK
    const fs = require('fs');                // File system for config
    const FILENAME = "config.json";
    // Fetch config file for instantiating SDK instance
    const configJSON = JSON.parse(fs.readFileSync(FILENAME));

    // Instantiate instance of SDK using generated JSON config
     const sdk = boxSDK.getPreconfiguredInstance(configJSON);

     var serviceAccountClient = sdk.getAppAuthClient('enterprise');

     // Set app user details
     const userName = 'APP USER '+ uuid.v4();
     const spaceAmount = 1073741824;
     let userId;

    // Create app user
    serviceAccountClient.enterprise.addAppUser(
       userName, 
     {
        space_amount: spaceAmount
      },
  callback
);

function callback(err, userres) {
  if (!err) 
  {  
     let folderId;
     userId = userres.id;
     console.log(`App user ${userres.id} is created successful`);

     var appUserClient = sdk.getAppAuthClient('user', userId);

     // Set folder values
    const folderName = 'FOLDER NAME 1'+ uuid.v4() ;
    //const folderId = uuid.v4();

     // Create folder
     appUserClient.folders.create('0', folderName, (err, folderres) => {
       folderId = folderres.id;
      console.log(`folder ${folderres.id} is created successful`);
       
      appUserClient.folders.create(folderId, folderName, (err, subfolderres) => {
       const notificationURL = 'https://localhost/NOTIFICATION';

       return appUserClient.webhooks.create(
           subfolderres.id,
           appUserClient.itemTypes.FOLDER,
           notificationURL,
           [
            appUserClient.webhooks.triggerTypes.FILE.DOWNLOADED
           ],
           (err, res)=> {
               console.log(`webhook`);
                });
      // HANDLE ERROR CASE AND RESPONSE
      // Set upload values
    /*  const fileName = 'test.txt';

      // Create file upload stream
      const stream = fs.createReadStream(fileName);

       // Upload file
       appUserClient.files.uploadFile(
           folderId, 
          fileName, 
           stream, 
           callback);

function callback(err, response) {
  if(!err){
  console.log(`upload file`);
  res.send('upload file successful');
  }
}*/
      });
     });

    /* serviceAccountClient.folders.create('0', folderName, (err, res) => {
      console.log(`create folder`);
     });*/
     
  }
}

    /* let folderId;

     const folderName = 'FOLDER'+ uuid.v4() ;

     serviceAccountClient.folders.create('0', folderName)
	.then(folder => {
    folderId = folder.id;
    // ...
   /* return serviceAccountClient.folders.get(folderId)
	.then(folder => {
    // ...
    console.log(`get folder ${folderId} successful`);
// Callback function
/*function callback(err, res) {
  console.log(`webhook`);
  // HANDLE ERROR CASE AND RESPONSE
} */
 /* })
  .catch((error) => {
    console.log(`get folder error ${error}`);
    //process.exit();
  }); */

 /* const notificationURL = 'https://localhost:5000/NOTIFICATION';

return serviceAccountClient.webhooks.create(
  folderId,
  serviceAccountClient.itemTypes.FOLDER,
  notificationURL,
  [
    serviceAccountClient.webhooks.triggerTypes.FILE.DOWNLOADED
  ],
  (err, res)=> {
    console.log(`webhook`);
  });
    console.log(`create folder`);
  })
  .catch((error) => {
    console.log(`create new folder error ${error}`);
    //process.exit();
  });

   // const folderId = '49844149848';
  /* serviceAccountClient.folders.get(folderId)
	.then(folder => {
    // ...
    console.log(`get folder`);
  })
  .catch((error) => {
    logger.error(`get folder error ${error}`);
    //process.exit();
  });*/
    // CREATE WEBHOOK
/* const notificationURL = 'https://localhost:5000/NOTIFICATION';

serviceAccountClient.webhooks.create(
  folderId,
  serviceAccountClient.itemTypes.FOLDER,
  notificationURL,
  [
    serviceAccountClient.webhooks.triggerTypes.FILE.DOWNLOADED
  ],
  callback
);

// Callback function
function callback(err, res) {
  console.log(`webhook`);
  // HANDLE ERROR CASE AND RESPONSE
} */
  })

  .get('/serveraccount', (req, res) =>{
    const boxSDK = require('box-node-sdk');  // Box SDK
    const fs = require('fs');                // File system for config
    const FILENAME = "config.json";
    // Fetch config file for instantiating SDK instance
    const configJSON = JSON.parse(fs.readFileSync(FILENAME));

    // Instantiate instance of SDK using generated JSON config
     const sdk = boxSDK.getPreconfiguredInstance(configJSON);

     var serviceAccountClient = sdk.getAppAuthClient('enterprise');

      // Set folder values
    const folderName = 'server account FOLDER NAME 1'+ uuid.v4() ;
    //const folderId = uuid.v4();

     // Create folder
     serviceAccountClient.folders.create('0', folderName, (err, folderres) => {
       folderId = folderres.id;
      console.log(`folder ${folderres.id} is created successful`);
      // HANDLE ERROR CASE AND RESPONSE
      // Set upload values
      const fileName = 'test.txt';

      // Create file upload stream
      const stream = fs.createReadStream(fileName);

       // Upload file
       serviceAccountClient.files.uploadFile(
           folderId, 
          fileName, 
           stream, 
           callback);

function callback(err, response) {
  
  console.log(`upload file`);
  res.send('upload file successful');
}
     });

  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
