import admin from "../firebase-admin-init";

export default class GenericDB {
  constructor(collectionPath) {
    this.collectionPath = collectionPath;
  }

  /**
   * Create a document in the collection
   * @param data
   * @param id
   */
  async create(data, id = null) {
    const collectionRef = await admin
      .firestore()
      .collection(this.collectionPath);
    const serverTimestamp = new Date();

    const dataToCreate = {
      ...data,
      createTimestamp: serverTimestamp,
      updateTimestamp: serverTimestamp,
    };

    const createPromise =
      id === null // Create doc with generated id
        ? collectionRef.add(dataToCreate).then((doc) => doc.id) // Create doc with custom id
        : collectionRef
            .doc(id)
            .set(dataToCreate)
            .then(() => id);

    const docId = await createPromise;

    return {
      id: docId,
      ...data,
      createTimestamp: new Date(),
    };
  }

  /**
   * Read a document in the collection
   * @param id
   */
  async read(id) {
    const result = await admin
      .firestore()
      .collection(this.collectionPath)
      .doc(id)
      .get();

    const data = result.exists ? result.data() : null;

    if (data) {
      return { id, ...data };
    } else {
      return null;
    }
  }
}
