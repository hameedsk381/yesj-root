const Minio = require('minio');

// Initialize the MinIO client with your credentials
const minioClient = new Minio.Client({
  endPoint: 'minio.yesj.in',
  port: 9000, // or the port your MinIO server is running on
  useSSL: false, // set to true if using HTTPS
  accessKey: 'yesj',
  secretKey: 'amdgfeb@19'
});

// Example to upload a file to the MinIO bucket
minioClient.fPutObject('yesj-website', 'object-name', 'local-file-path', (err, etag) => {
  if (err) {
    console.log(err);
  } else {
    console.log('File uploaded successfully', etag);
  }
});
