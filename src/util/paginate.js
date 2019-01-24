export const paginate = async (firebase, nextPage = false, limit = 100) => {
  const db = firebase.firestore();

  const baseQuery = db
    .collection("scans")
    .where("data.runtimeError.code", "==", "NO_ERROR")
    .orderBy("updatedAt", "desc");

  const query = nextPage ? nextPage : baseQuery.limit(limit);

  // [START paginate]
  const first = query;
  const snapshot = await first.get();
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  const next = baseQuery.startAfter(lastVisible).limit(limit);
  return { snapshot, next };
  // [END paginate]
};
