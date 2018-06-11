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

     let userId;
     serviceAccountClient.enterprise.getUsers()
	.then(users => {
    
    for (let i = 0; i < users.entries.length; i += 1) {
    if(users.entries[i].name === 'zhang yan yan'){
          userId = users.entries[i].id;
    }
    }
    serviceAccountClient.asUser(userId);
  
    // Set folder values
    const folderName = 'Normal AS User FOLDER NAME'+ uuid.v4() ;
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
    console.log(`get users`);
		// ...
	});

 

/*let session = box.getPreconfiguredInstance(configFile);

// Don't be thrown off by the method name:
// This method works with Managed Users and App Users if you have the correct scopes on your application.
session.getAppUserTokens(userId)
    .then((userTokenObject) => {
        console.log(userTokenObject.accessToken);
    }); */
  })
  .get('/edit', (req, res) =>{
    const boxSDK = require('box-node-sdk');  // Box SDK
    const fs = require('fs');                // File system for config
    const FILENAME = "config.json";
    // Fetch config file for instantiating SDK instance
    const configJSON = JSON.parse(fs.readFileSync(FILENAME));

    // Instantiate instance of SDK using generated JSON config
     const sdk = boxSDK.getPreconfiguredInstance(configJSON);

     var serviceAccountClient = sdk.getAppAuthClient('enterprise');

     let appUserId;
     let normalUserId;
     serviceAccountClient.enterprise.getUsers()
	.then(users => {
    
    
    if(users.entries.length !== 0){
      appUserId = users.entries[0].id;
    }

    for (let i = 0; i < users.entries.length; i += 1) {
      if(users.entries[i].name === 'zhang yan yan'){
        normalUserId = users.entries[i].id;
      }
      }
    serviceAccountClient.asUser(normalUserId);
  
    // Set folder values
    const folderName = 'Normal user AS User FOLDER NAME'+ uuid.v4() ;
    //const folderId = uuid.v4();
  
     // Create folder
     serviceAccountClient.folders.create('0', folderName, (err, folderres) => {
       folderId = folderres.id;
      console.log(`folder ${folderres.id} is created successful`);

      return serviceAccountClient.collaborations.createWithUserID(appUserId, folderId, serviceAccountClient.collaborationRoles.EDITOR)
      .then(collaboration => {
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

    serviceAccountClient.asUser(appUserId);
    var stream = fs.createReadStream('v2.txt');
    const fileId = response.entries[0].id;
   
    serviceAccountClient.files.uploadNewFileVersion(fileId, stream)
	.then(file => {
    console.log(`upload new version`);
		// ...
	});
  console.log(`upload file`);
  res.send('upload file successful');
  }

        console.log(`create collaboration`);
        // ...
      })
      .catch((error) => {
        console.log(`Test fails with error ${error}`);
      });
      
     }); 
    console.log(`get users`);
		// ...
	});

//	});

 

/*let session = box.getPreconfiguredInstance(configFile);

// Don't be thrown off by the method name:
// This method works with Managed Users and App Users if you have the correct scopes on your application.
session.getAppUserTokens(userId)
    .then((userTokenObject) => {
        console.log(userTokenObject.accessToken);
    }); */
  })
  .get('/serveraccountedit', (req, res) =>{
    const boxSDK = require('box-node-sdk');  // Box SDK
    const fs = require('fs');                // File system for config
    const FILENAME = "config.json";
    // Fetch config file for instantiating SDK instance
    const configJSON = JSON.parse(fs.readFileSync(FILENAME));

    // Instantiate instance of SDK using generated JSON config
     const sdk = boxSDK.getPreconfiguredInstance(configJSON);

     var serviceAccountClient = sdk.getAppAuthClient('enterprise');

     let appUserId;
     let normalUserId;
     serviceAccountClient.enterprise.getUsers()
	.then(users => {
    
    
    if(users.entries.length !== 0){
      appUserId = users.entries[0].id;
    }

    for (let i = 0; i < users.entries.length; i += 1) {
      if(users.entries[i].name === 'zhang yan yan'){
        normalUserId = users.entries[i].id;
      }
      }
    serviceAccountClient.asUser(normalUserId);
  
    // Set folder values
    const folderName = 'Normal user AS User FOLDER NAME'+ uuid.v4() ;
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

    serviceAccountClient.asSelf();
    var stream = fs.createReadStream('v2.txt');
    const fileId = response.entries[0].id;
   
    serviceAccountClient.files.uploadNewFileVersion(fileId, stream)
	.then(file => {
    console.log(`upload new version`);
		// ...
	});
  console.log(`upload file`);
  res.send('upload file successful');
  }

      
     }); 
    console.log(`get users`);
		// ...
	});

//	});

 

/*let session = box.getPreconfiguredInstance(configFile);

// Don't be thrown off by the method name:
// This method works with Managed Users and App Users if you have the correct scopes on your application.
session.getAppUserTokens(userId)
    .then((userTokenObject) => {
        console.log(userTokenObject.accessToken);
    }); */
  })
  .get('/update', (req, res) =>{
    const boxSDK = require('box-node-sdk');  // Box SDK
    const fs = require('fs');                // File system for config
    const FILENAME = "config.json";
    // Fetch config file for instantiating SDK instance
    const configJSON = JSON.parse(fs.readFileSync(FILENAME));

    // Instantiate instance of SDK using generated JSON config
     const sdk = boxSDK.getPreconfiguredInstance(configJSON);

     var serviceAccountClient = sdk.getAppAuthClient('enterprise');

     let appUserId;
     let normalUserId;
     serviceAccountClient.enterprise.getUsers()
	.then(users => {
    
    
    if(users.entries.length !== 0){
      appUserId = users.entries[0].id;
    }

    for (let i = 0; i < users.entries.length; i += 1) {
      if(users.entries[i].name === 'zhang yan yan'){
        normalUserId = users.entries[i].id;
      }
      }
    serviceAccountClient.asUser(appUserId);
  
    // Set folder values
    const folderName = 'AS User FOLDER NAME'+ uuid.v4() ;
    //const folderId = uuid.v4();
  
     // Create folder
     serviceAccountClient.folders.create('0', folderName, (err, folderres) => {
       folderId = folderres.id;
      console.log(`folder ${folderres.id} is created successful`);

      return serviceAccountClient.collaborations.createWithUserID(normalUserId, folderId, serviceAccountClient.collaborationRoles.EDITOR)
      .then(collaboration => {
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

    serviceAccountClient.asUser(normalUserId);
    var stream = fs.createReadStream('v2.txt');
    const fileId = response.entries[0].id;
   
    serviceAccountClient.files.uploadNewFileVersion(fileId, stream)
	.then(file => {
    console.log(`upload new version`);
		// ...
	});
  console.log(`upload file`);
  res.send('upload file successful');
  }

        console.log(`create collaboration`);
        // ...
      })
      .catch((error) => {
        console.log(`Test fails with error ${error}`);
      });
      
     }); 
    console.log(`get users`);
		// ...
	});


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

  .get('/user', (req, res) =>{
    const boxSDK = require('box-node-sdk');  // Box SDK
    const fs = require('fs');                // File system for config
    const FILENAME = "config.json";
    // Fetch config file for instantiating SDK instance
    const configJSON = JSON.parse(fs.readFileSync(FILENAME));

    // Instantiate instance of SDK using generated JSON config
     const sdk = boxSDK.getPreconfiguredInstance(configJSON);

     var serviceAccountClient = sdk.getAppAuthClient('enterprise');

     // Set app user details
     const userName = 'APP1 user '+ uuid.v4();
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
     userId = userres.id;
       
  }
}
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
