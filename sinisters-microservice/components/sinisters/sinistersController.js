const admin  = require('firebase-admin')
const serviceAccount = require('../../microservicios-douek-bugallo-firebase-adminsdk-9y0cg-7e8c4bff6a.json');
const stream = require('stream')
const crypto = require('crypto')


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://microservicios-douek-bugallo.appspot.com/',
});

const bucket = admin.storage().bucket()
const uuid = require('uuid-v4')

const { COLLECTIONS } = require('../../utils/constants');

const MongoLib = require('../../store/mongo');

const uploadImage = async ({image_url}) => {
  var fileID = crypto.randomBytes(10).toString("hex");
  var fileName = fileID + ".jpg";
  var file = bucket.file(fileName);
  let imageBuffer = Buffer.from(image_url, 'base64');
  await file.save(imageBuffer, {contentType: 'image/jpeg', public:true, resumable:false, validation: "md5"})
  await file.setMetadata({metadata:
      {
        firebaseStorageDownloadTokens: uuid(),
      },})
  return  process.env.STORAGE_BASE_URL + fileName;
}
class SinistersController {
  constructor() {
    this.collection = COLLECTIONS.sinisters;
    this.mongoDB = new MongoLib();
  }
  async getSinisters(query = {}) {
    const sinisters = await this.mongoDB.list(this.collection, query);
    return sinisters || [];
  }

  async getSinister({ id }) {
    const sinisters = await this.mongoDB.get(this.collection, id);
    return sinisters || [];
  }

  async createSinister({ body }) {
    body.image_url = await uploadImage({image_url: body.image_url})
    body.code = new Date().getTime();
    const sinisters = await this.mongoDB.create(this.collection, body);
    return sinisters || [];
  }

  async updateSinister({ id, body } = {}) {
    body.image_url = await uploadImage({image_url: body.image_url})
    const sinisters = await this.mongoDB.update(this.collection, id, body);
    return sinisters || [];
  }

  async deleteSinister({ id} = {}) {
    const receipts = await this.mongoDB.update(this.collection, id, { is_delete: true });
    return receipts || [];
  }
}
module.exports = SinistersController;
