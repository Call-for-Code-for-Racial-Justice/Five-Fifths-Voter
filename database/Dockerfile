FROM couchdb

WORKDIR /home/localdb/

ARG NODE_DB_USER=adminXYZ
ARG NODE_DB_PASSWORD=NotReallyImportantData
RUN echo "${NODE_DB_USER}=${NODE_DB_PASSWORD}" >> /opt/couchdb/etc/local.ini
# Debug
#RUN tail /opt/couchdb/etc/local.ini

# Copy source
COPY . .
RUN sed -i "s/@NODE_DB_USER@/${NODE_DB_USER}/g; s/@NODE_DB_PASSWORD@/${NODE_DB_PASSWORD}/g" firstrun.sh
#Debug
#RUN cat firstrun.sh

# Tell docker the port to use
EXPOSE 5984

CMD [ "bash", "./launchdb.sh" ]
