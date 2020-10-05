var cacheUser = {
  user: 'userXYZ',
  pwd: 'cacheDataIsNotPrivate',
  roles: [{ role: 'readWrite', db: 'webscrapecache' }],
};
db.createUser(cacheUser);
