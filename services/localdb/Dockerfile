FROM mongo:3.6.3

ENV MONGO_INITDB_ROOT_USERNAME=adminXYZ
ENV MONGO_INITDB_ROOT_PASSWORD=NotReallyImportantData
ENV MONGO_INITDB_DATABASE=webscrapecache

COPY initWebScrapeCacheUser.js /docker-entrypoint-initdb.d/