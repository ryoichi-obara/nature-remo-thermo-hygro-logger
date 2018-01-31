
# Nature Remo Thermo-Hygro Logger

Thermo-Hygro logger with Nature Remo.

## Prepare

```
git clone
npm install
export NATURE_REMO_THERMO_HYGRO_LOGGER_TOKEN=${YOUR_NATURE_REMO_ACCESS_TOKEN_HERE}
export NATURE_REMO_THERMO_HYGRO_LOGGER_DYNAMO=${YOUR_DYNAMO_DB_TABLE_NAME_HERE}
export NATURE_REMO_THERMO_HYGRO_LOGGER_DYNAMO_REGION=${YOUR_DYNAMO_DB_REGION_HERE}
```

## Make & Deploy

```
npm run make
```

You'll get build/payload.zip.  
(ex. for upload S3.)  

```Sample
aws s3 cp ./build/payload.zip s3://your-s3-bucket-here/
```

## Nature Remo

* Buy Nature Remo  
  https://nature-jp.myshopify.com/  

* About Nature Remo  
  http://nature.global/  

* Nature Remo Official API Docs  
  http://swagger.nature.global/  
